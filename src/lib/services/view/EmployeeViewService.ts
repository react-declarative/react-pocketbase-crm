import EmployeeDbService, { IEmployeeDto } from "../db/EmployeeDbService";

import HistoryViewService from "./HistoryViewService";
import LoggerService from "../base/LoggerService";
import Paginator from "../../types/Paginator";
import PocketbaseService from "../base/PocketbaseService";
import TYPES from "../../types";
import { inject } from "react-declarative";
import { makeObservable } from "mobx";

export class EmployeeViewService {
  private readonly pocketbaseService = inject<PocketbaseService>(
    TYPES.pocketbaseService
  );
  private readonly historyViewService = inject<HistoryViewService>(
    TYPES.historyViewService
  );
  private readonly employeeDbService = inject<EmployeeDbService>(
    TYPES.employeeDbService
  );
  private readonly loggerService = inject<LoggerService>(TYPES.loggerService);

  public readonly createSubject = this.employeeDbService.createSubject;
  public readonly reloadSubject = this.employeeDbService.reloadSubject;
  public readonly updateSubject = this.employeeDbService.updateSubject;

  constructor() {
    makeObservable(this, {});
  }

  findAll = async () => {
    this.loggerService.log(`employeeViewService findAll`);
    return await this.employeeDbService.findAll();
  };

  paginate: Paginator = async (...args) => {
    this.loggerService.log(`employeeViewService paginate`, { args });
    return await this.employeeDbService.paginate(...args);
  };

  create = async (dto: IEmployeeDto) => {
    this.loggerService.log("employeeViewService create", dto);
    const result = await this.employeeDbService.create(dto);
    this.historyViewService.create({
      employee_id: result.id,
      user_id: this.pocketbaseService.userId,
      type: "employee",
      comment: "Employee created",
    });
    return result;
  };

  toggleActive = async (id: string) => {
    this.loggerService.log("employeeViewService toggleActive", { id });
    this.historyViewService.create({
      employee_id: id,
      user_id: this.pocketbaseService.userId,
      type: "employee",
      comment: "Archive flag toggled",
    });
    return await this.employeeDbService.toggleActive(id);
  };

  update = async (id: string, dto: IEmployeeDto) => {
    this.loggerService.log("employeeViewService update", dto);
    this.historyViewService.create({
      employee_id: id,
      user_id: this.pocketbaseService.userId,
      type: "employee",
      comment: "Employee updated",
    });
    return await this.employeeDbService.update(id, dto);
  };

  remove = async (id: string) => {
    this.loggerService.log("employeeViewService remove", { id });
    return await this.employeeDbService.remove(id);
  };

  read = async (id: string) => {
    this.loggerService.log("employeeViewService read", { id });
    const result = await this.employeeDbService.read(id);
    return result;
  };
}

export default EmployeeViewService;
