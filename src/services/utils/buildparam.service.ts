import { Injectable } from "@angular/core";
import { ServiceProvider } from "../factory";

@Injectable()
export class BuildParamService {

  constructor(private factory: ServiceProvider) {

  }

  getBuildConfigParam(param: string) {
    return new Promise<string>((resolve, reject) => {
      this.factory.getDeviceService().getBuildConfigParam(param, (success) => {
        resolve(success);
      }, (error) => {
        reject(error);
      });
    });
  }

}