import { IUser } from "../Interfaces/IUser";
import Settings from "./Settings";

export class RouteGuard {
  static localStorageSaving(user: IUser, token: string) {
    localStorage.setItem(Settings.localStorageUserKey, JSON.stringify(user));
    localStorage.setItem(Settings.localStorageTokenKey, token);
  }

  static localStorageLoading() {
    let user: IUser | null;
    try {
      user = JSON.parse(localStorage.getItem(Settings.localStorageUserKey)!);
    } catch {
      user = null;
    }
    return {
      user,
      token: localStorage.getItem(Settings.localStorageTokenKey),
    };
  }

  static clearLocalStorage() {
    localStorage.clear();
  }

  static get haveLogined() {
    const { user, token } = RouteGuard.localStorageLoading();
    return user && token;
  }
}
