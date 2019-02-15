import { Injectable } from "@angular/core";


@Injectable()
export class QRScanner {
    startScanner(screenTitle: String, displayText: String, displayTextColor: String)
    {
        return new Promise((resolve,reject) => {
            (<any>window).qrScanner.startScanner(screenTitle, displayText, displayTextColor, (success) => {
                resolve(success);
            }, (error) => {
                reject(error);
            });
        })
    }

    stopScanner()
    {
        return new Promise((resolve,reject) => {
            (<any>window).qrScanner.stopScanner((success) => {
                resolve(success);
            }, (error) => {
                reject(error);
            });
        })
    }
}