import { Injectable } from "@angular/core";
import { ServiceProvider } from "../factory";

@Injectable()
export class SharedPreferences {

    constructor(private factory: ServiceProvider) {

    }

    async getString(key: string) {
        return new Promise<string>((resolve, reject) => {
            this.factory.getSharedPreference().getString(key, (success) => {
                resolve(success);
            }, (error) => {
                reject(error);
            });
        });
    }

    putString(key: string, value: string): void {
        this.factory.getSharedPreference().putString(key, value);
    }

}