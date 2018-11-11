import { Injectable } from "@angular/core";
import { ServiceProvider } from "../factory";
import { resolve } from "dns";


@Injectable()
export class DeviceInfoService {

    constructor(private factory: ServiceProvider) {

    }

    getDeviceID()
    {
      return new Promise((resolve,reject) => {
        this.factory.getDeviceService().getDeviceID((success) => {
          resolve(success);
        }, (error) => {
          reject(error);
        });
      })
    }

    // getDeviceID(successCallback: (response: string) => void,
    //     errorCallback: (error: string) => void) {
    //     try {
    //       this.factory.getDeviceService().getDeviceID(successCallback, errorCallback);
    //     } catch (error) {
    //       console.log(error);
    //     }
    // }

}