import { Injectable } from "@angular/core";
import { GenieResponse } from "./service.bean";


export class PermissionResponse {
	[index: string]: any 
}


@Injectable()
export class PermissionService {

    hasPermission(permission: Array<String>) {
		return new Promise((resolve,reject) => {
			(<any>window).GenieSDK.permission.hasPermission(JSON.stringify(permission), (success) => {
              resolve(success);
			}, (error) => {
              reject(error);
			});
		})
	}
	requestPermission(permission: Array<String>)
	{
		return new Promise((resolve,reject) => {
			(<any>window).GenieSDK.permission.requestPermission(JSON.stringify(permission), (success) => {
                resolve(success)
			}, (error) => {
				reject(error);
			});
		})
	}
}