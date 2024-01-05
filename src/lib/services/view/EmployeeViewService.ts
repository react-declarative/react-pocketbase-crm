import EmployeeDbService, { IEmployeeDto } from "../db/EmployeeDbService";

import LoggerService from "../base/LoggerService";
import Paginator from "../../types/Paginator";
import TYPES from "../../types";
import { inject } from "react-declarative";
import { makeObservable } from "mobx";

export class EmployeeViewService {
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
    return await this.employeeDbService.create(dto);
  };

  toggleActive = async (id: string) => {
    this.loggerService.log("employeeViewService toggleActive", { id });
    return await this.employeeDbService.toggleActive(id);
  };

  update = async (id: string, dto: IEmployeeDto) => {
    this.loggerService.log("employeeViewService update", dto);
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
