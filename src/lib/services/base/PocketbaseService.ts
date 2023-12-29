import { getErrorMessage, inject, reloadPage, singleshot } from "react-declarative";

import AlertService from "./AlertService";
import { CC_POCKETBASE_URL } from "../../../config/params";
import PocketBase from "pocketbase";
import TYPES from "../../types";

export class PocketbaseService {

  readonly alertService = inject<AlertService>(TYPES.alertService);

  private _pb = new PocketBase(CC_POCKETBASE_URL);

  get pb() {
    return this._pb;
  };

  get isAuthorized() {
    return this._pb.authStore.isValid;
  };

  get userId(): string {
    if (this.isAuthorized) {
        throw new Error('pockerbaseService userId not authorized')
    }
    return this._pb.authStore.model?.id;
  };

  public login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      await this.pb.collection('users').authWithPassword(email, password);
      reloadPage();
    } catch (e: any) {
      this.alertService.notify(getErrorMessage(e) || "Unknown error");
      return false;
    }
  };

  public logout = async () => {
    try {
      await this.pb.authStore.clear();
      reloadPage();
    } catch (e: any) {
      this.alertService.notify(getErrorMessage(e) || "Unknown error");
      return false;
    }
  };

  protected prefetch = singleshot(async () => {
    if (this.isAuthorized) {
        await this.pb.collection("users").authRefresh();
    }
  });

}

export default PocketbaseService;
