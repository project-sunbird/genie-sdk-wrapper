import { Injectable } from "@angular/core";
import { ServiceProvider } from "../factory";
import { resolve } from "q";

@Injectable()
export class ConnectionInfoService {

    constructor(private factory: ServiceProvider) {

    }

    isConnected()
    {
      return new Promise((resolve,reject) => {
        this.factory.getConnectionService().isConnected((success) => {
           resolve(success)
        }, (error) => {
          reject(error);
        });
      })
    }
    
    isConnectedOverWifi()
    {
      return new Promise((resolve,reject) => {
        this.factory.getConnectionService().isConnectedOverWifi((success) => {
          resolve(success);
        }, (error) => {
          reject(error);
        });
      })
    }
}