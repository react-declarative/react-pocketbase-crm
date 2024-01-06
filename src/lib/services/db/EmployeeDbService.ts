import {
  Subject,
  compareFulltext,
  first,
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
import writeTransform from "../../utils/writeTransform";

export interface IEmployeeDto {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  hire_date: string;
  is_active: boolean;
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

  public paginate: Paginator = async (
    filterData,
    { limit, offset },
    sort,
    chips,
    search,
    payload
  ) => {
    const pick = pickDocuments<IEmployeeRow>(limit, offset);
    for await (let rows of iterateDocuments<IEmployeeRow>({
      limit,
      createRequest: async ({ limit, page }) => {
        const { items } = await this.pocketbaseService.pb
          .collection("employee")
          .getList<IEmployeeRow>(page, limit);
        return listTransform(items);
      },
    })) {
      if (filterData.email) {
        rows = rows.filter((row) => {
          return compareFulltext(row, filterData.email, "email");
        });
      }

      if (filterData.first_name) {
        rows = rows.filter((row) => {
          return compareFulltext(row, filterData.first_name, "first_name");
        });
      }

      if (filterData.last_name) {
        rows = rows.filter((row) => {
          return compareFulltext(row, filterData.last_name, "last_name");
        });
      }

      if (filterData.phone) {
        rows = rows.filter((row) => {
          return compareFulltext(row, filterData.phone, "phone");
        });
      }

      if (filterData.hire_date) {
        rows = rows.filter((row) => {
          return row.hire_date === filterData.hire_date;
        });
      }

      {
        const status = first(filterData.status);
        if (status) {
          rows = rows.filter((row) => {
            return row.status?.includes(status);
          });
        }
      }

      if (search) {
        rows = rows.filter((row) => {
          return compareFulltext(
            row,
            search,
            "first_name",
            "last_name",
            "phone",
            "email",
            "id"
          );
        });
      }

      if (payload._active) {
        rows = rows.filter(({ is_active }) => is_active)
      }

      if (payload._inactive) {
        rows = rows.filter(({ is_active }) => !is_active)
      }

      if (pick(rows).done) {
        break;
      }
    }
    return listTransform(pick().rows);
  };

  public findAll = async () => {
    const rows = await this.pocketbaseService.pb
      .collection("employee")
      .getFullList<IEmployeeModel>({
        filter: 'is_active ?= true'
      });
    return listTransform(rows);
  };

  public create = async (dto: IEmployeeDto) => {
    const document = await this.pocketbaseService.pb
      .collection("employee")
      .create<IEmployeeModel>(writeTransform(dto));
    return readTransform(document);
  };

  public read = async (id: string) => {
    const document = await this.pocketbaseService.pb
      .collection("employee")
      .getOne<IEmployeeModel>(id);
    return readTransform(document);
  };

  public toggleActive = async (id: string) => {
    const data = await this.read(id);
    data.is_active = !data.is_active;
    return readTransform(await this.update(id, data));
  };

  public update = async (id: string, dto: IEmployeeDto) => {
    const document = await this.pocketbaseService.pb
      .collection("employee")
      .update<IEmployeeModel>(id, writeTransform(dto));
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
