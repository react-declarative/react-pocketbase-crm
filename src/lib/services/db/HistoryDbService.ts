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

export interface IHistoryDto {
  type: string;
  comment: string;
  employee_id: string;
  user_id: string;
}

export interface IHistoryModel extends RecordModel, IHistoryDto {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
}

export interface IHistoryRow extends IHistoryModel {}

export class HistoryDbService {
  public readonly reloadSubject = new Subject<void>();
  public readonly createSubject = new Subject<IHistoryRow>();
  public readonly updateSubject = new Subject<[string, IHistoryRow]>();
  public readonly deleteSubject = new Subject<string>();

  private readonly pocketbaseService = inject<PocketbaseService>(
    TYPES.pocketbaseService
  );

  constructor() {
    makeObservable(this, {});
  };

  public findAllByEmployeeId = async (employeeId: string) => {
    const rows = await this.pocketbaseService.pb
      .collection("history")
      .getFullList<IHistoryModel>({
        filter: `employee_id ?= "${employeeId}"`,
      });
    return listTransform(rows);
  };

  public create = async (dto: IHistoryDto) => {
    const document = await this.pocketbaseService.pb
      .collection("history")
      .create<IHistoryModel>(dto);
    return readTransform(document);
  };

  public read = async (id: string) => {
    const document = await this.pocketbaseService.pb
      .collection("history")
      .getOne<IHistoryModel>(id);
    return readTransform(document);
  };

  public update = async (id: string, dto: IHistoryDto) => {
    const document = await this.pocketbaseService.pb
      .collection("history")
      .update<IHistoryModel>(id, dto);
    return readTransform(document);
  };

  public remove = async (id: string) => {
    return await this.pocketbaseService.pb.collection("history").delete(id);
  };

  protected prefetch = singleshot(async () => {
    this.pocketbaseService.pb
      .collection("history")
      .subscribe<IHistoryModel>("*", ({ action, record }) => {
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

export default HistoryDbService;
