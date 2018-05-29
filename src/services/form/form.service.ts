import { Injectable } from "@angular/core";
import { ServiceProvider } from "../factory";
import { FormRequest } from "./bean";

@Injectable()
export class FormService {

  constructor(private factory: ServiceProvider) {
  }

  getForm(request: FormRequest,
    successCallback: (response: string) => void,
    errorCallback: (error: string) => void) {
    try {
      this.factory.getFormService().getForm(JSON.stringify(request), successCallback, errorCallback);
    } catch (error) {
      console.log(error);
    }
  }

}