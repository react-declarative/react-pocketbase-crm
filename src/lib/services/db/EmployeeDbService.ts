import {
  Subject,
  inject,
  iterateDocuments,
  pickDocuments,
  singleshot,
} from "react-declarative";

import Paginator from "../../types/Paginator";
import PocketbaseService from "../base/PocketbaseService";
import { RecordModel } from "pocketbase";
import TYPES from "../../types";
import listTransform from "../../utils/listTransform";
import { makeObservable } from "mobx";
import readTransform from "../../utils/readTransform";

export interface IEmployeeDto {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  hire_date: string;
  status: string;
}

export interface IEmployeeModel extends RecordModel, IEmployeeDto {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
}

export interface IEmployeeRow extends IEmployeeModel {}

export class EmployeeDbService {
  public readonly reloadSubject = new Subject<void>();
  public readonly createSubject = new Subject<IEmployeeRow>();
  public readonly updateSubject = new Subject<[string, IEmployeeRow]>();
  public readonly deleteSubject = new Subject<string>();

  private readonly pocketbaseService = inject<PocketbaseService>(
    TYPES.pocketbaseService
  );

  constructor() {
    makeObservable(this, {});
  }

  public paginate: Paginator = async (_, { limit, offset }) => {
    const pick = pickDocuments<IEmployeeRow>(limit, offset);
    for await (let rows of iterateDocuments<IEmployeeRow>({
      limit,
      createRequest: async ({ limit, page }) => {
        const { items } = await this.pocketbaseService.pb
          .collection("employee")
          .getList<IEmployeeRow>(page, limit);
        return items;
      },
    })) {
      /**
       * @see rows = rows.filter((v) => ...
       */
      if (pick(rows).done) {
        break;
      }
    }
    return listTransform(pick().rows);
  };

  public findAll = async () => {
    const rows = await this.pocketbaseService.pb
      .collection("employee")
      .getFullList<IEmployeeModel>();
    return listTransform(rows);
  };

  public create = async (dto: IEmployeeDto) => {
    const document = await this.pocketbaseService.pb
      .collection("employee")
      .create<IEmployeeModel>(dto);
    return readTransform(document);
  };

  public read = async (id: string) => {
    const document = await this.pocketbaseService.pb
      .collection("employee")
      .getOne<IEmployeeModel>(id);
    return readTransform(document);
  };

  public update = async (id: string, dto: IEmployeeDto) => {
    const document = await this.pocketbaseService.pb
      .collection("employee")
      .update<IEmployeeModel>(id, dto);
    return readTransform(document);
  };

  public remove = async (id: string) => {
    return await this.pocketbaseService.pb.collection("employee").delete(id);
  };

  protected prefetch = singleshot(async () => {
    this.pocketbaseService.pb
      .collection("employee")
      .subscribe<IEmployeeModel>("*", ({ action, record }) => {
        if (action === "create") {
          this.createSubject.next(readTransform(record));
        }
        if (action === "update") {
          this.updateSubject.next([record.id, readTransform(record)]);
        }
        if (action === "delete") {
          this.deleteSubject.next(record.id);
        }
        this.reloadSubject.next();
      });
  });
}

export default EmployeeDbService;
