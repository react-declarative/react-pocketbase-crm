import {
  MasterDetailMode,
  Subject,
  inject,
  queued,
  singleshot,
  sleep,
} from "react-declarative";

import PocketbaseService from "../base/PocketbaseService";
import { RecordModel } from "pocketbase";
import TYPES from "../../types";
import { makeObservable } from "mobx";
import readTransform from "../../utils/readTransform";

export interface ISettingsDto {
  features: string[] | null;
  visibility: string[] | null;
}

interface ISettingsDocument extends RecordModel, ISettingsDto {}

export const INITIAL_SETTINGS = {
  features: [],
  visibility: [],
} as unknown as ISettingsDocument;

export class SettingsDbService {
  private readonly pocketbaseService = inject<PocketbaseService>(
    TYPES.pocketbaseService
  );

  public readonly updateSubject = new Subject<ISettingsDocument>();

  constructor() {
    makeObservable(this, {});
  }

  create = async (dto: ISettingsDto = INITIAL_SETTINGS): Promise<ISettingsDocument> => {
    const result = await this.pocketbaseService.pb.collection<ISettingsDocument>("settings").create({
      ...INITIAL_SETTINGS,
      ...dto
    });
    this.read.clear();
    return readTransform(result);
  };

  read = singleshot(async (): Promise<ISettingsDocument> => {
    const { items: [ item = INITIAL_SETTINGS as never ] } = await this.pocketbaseService.pb.collection<ISettingsDocument>("settings").getList(0, 1);
    if (item === INITIAL_SETTINGS) {
      this.read.clear();
    }
    return readTransform(item);
  });

  update = queued(async (payload: ISettingsDto) => {
    let { items: [ item ] } = await this.pocketbaseService.pb.collection<ISettingsDocument>("settings").getList(0, 1);
    if (!item) {
      item = await this.create(payload);
    } else {
      item = readTransform(await this.pocketbaseService.pb.collection<ISettingsDocument>("settings").update(item.id, payload));
    }
    return item;
  });

  prefetch = singleshot(async () => {
    this.pocketbaseService.pb
      .collection("settings")
      .subscribe<ISettingsDocument>("*", ({ action, record }) => {
        if (action === "update") {
          this.updateSubject.next(readTransform(record));
        }
      });
  });
}

export default SettingsDbService;
