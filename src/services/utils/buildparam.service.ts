import { Injectable } from "@angular/core";
import { ServiceProvider } from "../factory";


@Injectable()
export class BuildParamService {

    constructor(private factory: ServiceProvider) {

    }


    getBuildConfigParam(param : string,successCallback: (response: string) => void,
        errorCallback: (error: string) => void) {
        try {
          this.factory.getDeviceService().getBuildConfigParam(param , successCallback, errorCallback);
        } catch (error) {
          console.log(error);
        }
    }
    
}