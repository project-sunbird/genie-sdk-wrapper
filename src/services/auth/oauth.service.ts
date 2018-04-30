import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
import { AuthService } from "./auth.service";

@Injectable()
export class OAuthService {

    redirect_url: string;

    logout_url: string;

    auth_url: string;

    constructor(private platform: Platform, private authService: AuthService) {
        var paramkeyArray=["auth_url","logout_url","auth_redirect_url"];
        (<any>window).CustomConfigParameters.get(configData => {
            this.auth_url = configData.auth_url;
            this.redirect_url = configData.auth_redirect_url;
            this.logout_url = configData.logout_url;
            this.auth_url = this.auth_url.replace("${CID}", this.platform.is("android")?"android":"ios");
        },
        
        err => {

        },
        
        paramkeyArray);
    }

    doOAuthStepOne(): Promise<any> {
        let that = this;
        return new Promise(function(resolve, reject) {

            let browserRef = (<any>window).cordova.InAppBrowser.open(that.auth_url);
            browserRef.addEventListener("loadstart", (event) => {
                if ((event.url).indexOf(that.redirect_url) === 0) {
                    browserRef.removeEventListener("exit", (event) => {});
                    browserRef.close();
                    let responseParameters = (((event.url).split("?")[1]).split("="))[1];
                    if (responseParameters !== undefined) {
                        resolve(responseParameters);
                    } else {
                        reject("Problem authenticating with Sunbird");
                    }
                }
            });
            browserRef.addEventListener("exit", function(event) {
                reject("The Sunbird sign in flow was canceled");
            });

            
        });
    }

    doOAuthStepTwo(token: string): Promise<any> {

        let that = this;

        return new Promise(function(resolve, reject) {
              that.authService.createSession(token,(response)=>{
                try {
                    let dataJson = JSON.parse(response);
                    let refreshToken = dataJson["refresh_token"];
                
                    let accessToken: string = dataJson["access_token"];

                    let value = accessToken.substring(accessToken.indexOf('.') + 1, accessToken.lastIndexOf('.'));
                    value = atob(value);
                    let json = JSON.parse(value);
                    let userToken = json["sub"];

                    that.authService.startSession(accessToken, refreshToken, userToken);

                    resolve();
                    
                } catch (error) {
                    reject(error);
                }
            },(error)=>{
                
            });
               
        });
    }

    doLogOut(): Promise<any> {
        let that = this;
        return new Promise(function (resolve, reject) {
            let browserRef = (<any>window).cordova.InAppBrowser.open(that.logout_url);
            browserRef.addEventListener("loadstart", (event) => {
                if ((event.url).indexOf(that.redirect_url) === 0) {
                    browserRef.removeEventListener("exit", (event) => {});
                    browserRef.close();
                    that.authService.endSession();
                    resolve();
                }
            });
        }) 
    }


}