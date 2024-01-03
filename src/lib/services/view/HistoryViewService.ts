import HistoryDbService, { IHistoryDto } from "../db/HistoryDbService";

import LoggerService from "../base/LoggerService";
import TYPES from "../../types";
import { inject } from "react-declarative";
import { makeObservable } from "mobx";

export class HistoryViewService {
  private readonly historyDbService = inject<HistoryDbService>(
    TYPES.historyDbService
  );
  private readonly loggerService = inject<LoggerService>(TYPES.loggerService);

  public readonly createSubject = this.historyDbService.createSubject;
  public readonly reloadSubject = this.historyDbService.reloadSubject;
  public readonly updateSubject = this.historyDbService.updateSubject;

  constructor() {
    makeObservable(this, {});
  }

  findAllByEmployeeId = async (employeeId: string) => {
    this.loggerService.log(`historyViewService findAllByEmployeeId`, {
      employeeId,
    });
    return await this.historyDbService.findAllByEmployeeId(employeeId);
  };

  create = async (dto: IHistoryDto) => {
    this.loggerService.log("historyViewService create", dto);
    return await this.historyDbService.create(dto);
  };

  update = async (id: string, dto: IHistoryDto) => {
    this.loggerService.log("historyViewService update", dto);
    return await this.historyDbService.update(id, dto);
  };

  remove = async (id: string) => {
    this.loggerService.log("historyViewService remove", { id });
    return await this.historyDbService.remove(id);
  };

  read = async (id: string) => {
    this.loggerService.log("historyViewService read", { id });
    const result = await this.historyDbService.read(id);
    return result;
  };
}

export default HistoryViewService;
