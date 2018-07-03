import { Injectable } from "@angular/core";
import { ServiceProvider } from "../factory";
import { DialCodeRequest } from "./bean";

@Injectable()
export class DialCodeService {

  constructor(private factory: ServiceProvider) {
  }

  getForm(request: DialCodeRequest,
    successCallback: (response: string) => void,
    errorCallback: (error: string) => void) {
    try {
      this.factory.getDialCodeService().getDialCode(JSON.stringify(request), successCallback, errorCallback);
    } catch (error) {
      console.log(error);
    }
  }

}