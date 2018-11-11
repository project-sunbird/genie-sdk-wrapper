import { Injectable } from "@angular/core";
import { ServiceProvider } from "../factory";


@Injectable()
export class LocationInfoService {

    constructor(private factory: ServiceProvider) {

    }
    
    getLocation()
    {
      return new Promise((resolve,reject) => {
        this.factory.getLocationService().getLocation((success) => {
          resolve(success);
        }, (error) => {
          reject(error);
        });
      })
    }
}