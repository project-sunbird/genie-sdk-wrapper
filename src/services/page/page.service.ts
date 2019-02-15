import { Injectable } from "@angular/core";
import { ServiceProvider } from "../factory";
import { PageAssembleCriteria } from "./bean";
import { resolve } from "path";

@Injectable()
export class PageAssembleService {

  constructor(private factory: ServiceProvider) {

  }

  getPageAssemble(criteria: PageAssembleCriteria) {
    return new Promise((resolve,reject) => {
      this.factory.getPageAssembleService().getPageAssemble(JSON.stringify(criteria), (success) => {
          resolve(success);
        }, (error) => {
          reject(error);
        });
    });
  }


}
