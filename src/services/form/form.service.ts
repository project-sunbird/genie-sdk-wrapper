import { Injectable } from "@angular/core";
import { ServiceProvider } from "../factory";
import { FormRequest } from "./bean";
import { reject } from "q";

@Injectable()
export class FormService {

  constructor(private factory: ServiceProvider) {
  }

  getForm(request: FormRequest)
  {
    return new Promise((resolve,reject) => {
      this.factory.getFormService().getForm(JSON.stringify(request), (success) => {
        resolve(success);
      }), (error) => {
        reject(error);
      }
    })
  }

}