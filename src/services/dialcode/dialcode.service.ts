import { Injectable } from "@angular/core";
import { ServiceProvider } from "../factory";
import { DialCodeRequest } from "./bean";

@Injectable()
export class DialCodeService {

  constructor(private factory: ServiceProvider) {
  }

  getForm(request: DialCodeRequest){
    return new Promise((resolve,reject) => {
      this.factory.getDialCodeService().getDialCode(JSON.stringify(request), (success) => {
        resolve(success);
      }) .catch((error) => {
        reject(error);
      });
    })
  }
  
}