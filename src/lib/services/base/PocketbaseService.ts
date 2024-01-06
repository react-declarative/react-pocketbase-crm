import {
  getErrorMessage,
  inject,
  reloadPage,
  singleshot,
} from "react-declarative";

import AlertService from "./AlertService";
import { CC_POCKETBASE_URL } from "../../../config/params";
import PocketBase from "pocketbase";
import TYPES from "../../types";

interface IUserModel {
  id: string;
  avatar: string;
  email: string;
  emailVisibility: boolean;
  username: string;
  user: string;
  verified: boolean;
}
export class PocketbaseService {
  readonly alertService = inject<AlertService>(TYPES.alertService);

  private _pb = new PocketBase(CC_POCKETBASE_URL);

  get pb() {
    return this._pb;
  }

  get isAuthorized() {
    return this._pb.authStore.isValid;
  }

  get userId(): string {
    if (!this.isAuthorized) {
      return null as never;
    }
    return this._pb.authStore.model?.id;
  }

  get authModel() {
    const model = this._pb.authStore.model! || {};
    return model as unknown as IUserModel;
  }

  public login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      await this.pb.collection("users").authWithPassword(email, password);
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
    try {
      if (this.isAuthorized) {
        await this.pb.collection("users").authRefresh();
      }
    } catch {
      await this.logout();
    }
  });
}

export default PocketbaseService;
