import { Injectable } from "@angular/core";
import {
    Http,
    Headers,
    RequestOptions,
    RequestMethod
} from "@angular/http";
import { Platform } from "ionic-angular";
import { AuthService } from "./auth.service";
import { BuildParamService } from "../utils/buildparam.service"
import { UserProfileService } from "../userprofile/userprofile.service";
import { UserProfileDetailsRequest } from "../userprofile/bean";

declare var customtabs: {
    isAvailable: (success: () => void, error: (error: string) => void) => void;
    launch: (url: string, success: (callbackUrl: string) => void, error: (error: string) => void) => void;
    launchInBrowser: (url: string, success: (callbackUrl: string) => void, error: (error: string) => void) => void;
    close: (success: () => void, error: (error: string) => void) => void;
};

@Injectable()
export class OAuthService {

    redirect_url?: string;

    logout_url?: string;

    auth_url?: string;

    base_url?: string;

    constructor(
        private platform: Platform,
        private authService: AuthService,
        private userProfileService: UserProfileService,
        private buildParamService: BuildParamService,
        private http: Http) {

        this.buildParamService.getBuildConfigParam('OAUTH_REDIRECT_URL')
            .then(url => {
                this.redirect_url = url;
                return this.buildParamService.getBuildConfigParam('BASE_URL');
            })
            .then(baseUrl => {

                this.base_url = baseUrl;
                // this.redirect_url = this.base_url + "/oauth2callback"
                this.auth_url = baseUrl + "/auth/realms/sunbird/protocol/openid-connect/auth?redirect_uri=" +
                    this.redirect_url + "&response_type=code&scope=offline_access&client_id=${CID}&version=1";
                this.auth_url = this.auth_url.replace("${CID}", this.platform.is("android") ? "android" : "ios");
                this.logout_url = baseUrl + "/auth/realms/sunbird/protocol/openid-connect/logout?redirect_uri=" +
                    this.redirect_url;
            })
            .catch(error => {
            });
    }

    private onOAuthCallback(url: string, resolve, reject) {
        let responseParameters;
        if (this.isGoogleSignup(url)) {
            responseParameters = ((url).split("?")[1]);
        }
        else {
            responseParameters = (((url).split("?")[1]).split("="))[1];
        }

        if (responseParameters !== undefined) {
            resolve(responseParameters);
        } else {
            reject("Problem authenticating with Sunbird");
        }
    }

    doOAuthStepOne(isRTL = false): Promise<any> {
        return new Promise((resolve, reject) => {
            customtabs.isAvailable(() => {
                //customtabs available
                customtabs.launch(this.auth_url!!, callbackUrl => {
                    this.onOAuthCallback(callbackUrl, resolve, reject);
                }, error => {
                    reject(error);
                });
            }, error => {
                customtabs.launchInBrowser(this.auth_url!!, callbackUrl => {
                    this.onOAuthCallback(callbackUrl, resolve, reject);
                }, error => {
                    reject(error);
                });
            });
        });
    }

    isGoogleSignup(token: string): boolean {
        return (token.indexOf('access_token') != -1 && token.indexOf('refresh_token') != -1);
    }

    getQueryParam(query: string, param: string): string {
        let paramsArray = query.split("&");
        let paramValue;
        paramsArray.forEach((item) => {
            let pair = item.split("=");
            if (pair[0] == param) {
                paramValue = pair[1];
            }
        });
        return paramValue;
    }

    doOAuthStepTwo(token: string): Promise<any> {
        let that = this;
        return new Promise(function (resolve, reject) {
            if (that.isGoogleSignup(token)) {
                that.createInAppSession(that.getQueryParam(token, 'refresh_token'), that.getQueryParam(token, 'access_token'), resolve, reject);
            } else {
                that.authService.createSession(token, (response) => {
                    try {
                        let dataJson = JSON.parse(response);
                        let refreshToken = dataJson["refresh_token"];
                        let accessToken: string = dataJson["access_token"];
                        that.createInAppSession(refreshToken, accessToken, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, (error) => {
                    reject(error);
                });
            }
        });
    }

    createInAppSession(refreshToken: string, accessToken: string, resolve, reject) {
        let that = this;
        // return new Promise((resolve, reject) => {
        let value = accessToken.substring(accessToken.indexOf('.') + 1, accessToken.lastIndexOf('.'));
        (<any>window).GenieSDK.
            genieSdkUtil.decode(value, 8, decoded => {
                let json = JSON.parse(decoded);
                let userToken = json["sub"];

                that.authService.startSession(accessToken, refreshToken, userToken);

                let userProfileRequest: UserProfileDetailsRequest = {
                    userId: userToken,
                    requiredFields: ['completeness', 'missingFields', 'lastLoginTime', 'topics']
                }

                that.userProfileService.getUserProfileDetails(userProfileRequest, success => {
                    //ignore response or error
                    that.updateLoginTime(accessToken, userToken);

                    resolve();
                }, error => {
                    that.updateLoginTime(accessToken, userToken);
                    resolve();
                });

            }, error => {
                reject();
            });
        // });
    }

    updateLoginTime(accessToken: string, userToken: string): Promise<any> {
        let that = this;
        return new Promise((resolve, reject) => {
            that.authService.getBearerToken(token => {
                let headers = new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Authenticated-User-Token': accessToken,
                    'Authorization': "Bearer " + token
                });
                let options = new RequestOptions({
                    headers: headers,
                    method: RequestMethod.Patch
                });
                let body = {
                    params: {},
                    request: {
                        userId: userToken
                    }
                }
                that.http.patch(that.base_url + "/api/user/v1/update/logintime", body, options)
                    .toPromise()
                    .then(response => {
                        resolve();
                    })
                    .catch(error => {
                        reject(error);
                    });
            }, error => {
                reject(error);
            });
        });
    }

    doLogOut(): Promise<any> {
        return new Promise((resolve, reject) => {
            customtabs.isAvailable(() => {
                customtabs.launch(this.logout_url!!, success => {
                    this.authService.endSession();
                    resolve();
                }, error => {
                    reject(error);
                });
            }, error => {
                customtabs.launchInBrowser(this.logout_url!!, callbackUrl => {
                    this.authService.endSession();
                    resolve();
                }, error => {
                    reject(error);
                });
            });
        });
    }

}
