import { Injectable } from "@angular/core";
import {
    Profile,
    ContentAccess,
    ProfileRequest,
    ProfileImportRequest,
    ProfileExportRequest,
    GetProfileRequest
} from "./bean";
import { ServiceProvider } from "../factory";
import { reject } from "q";
import { resolve } from "url";
import { resolveCname } from "dns";
import { error } from "util";

@Injectable()
export class ProfileService {

    constructor(private factory: ServiceProvider) {

    }

    /**
     * @param request This api is used to create a new user with specific {@link Profile}
     * @param onSuccess 
     * @param onError 
     */
    createProfile(request: Profile) {
        return new Promise((resolve, reject) => {
            this.factory.getProfileService().createProfile(JSON.stringify(request), (success) => {
                resolve(success);
            }), (error) => {
                reject(error);
            }
        })
    }

    /**
     * This api updates the specific profile that is passed to it.
     * @param request 
     * @param onSuccess 
     * @param onError 
     */
    updateProfile(request: Profile) {
        return new Promise((resolve, reject) => {
            this.factory.getProfileService().updateProfile(JSON.stringify(request), (success) => {
                resolve(success);
            }), (error) => {
                reject(error);
            }
        })
    }

    setCurrentUser(request: string) {
        return new Promise((resolve, reject) => {
            this.factory.getProfileService().setCurrentUser(request, (success) => {
                resolve(success);
            }, (error) => {
                reject(error);
            });
        })
    }

    /**
     * This api gets the current active user.
     * @param onSuccess 
     * @param onError 
     */
    getCurrentUser() {
        return new Promise((resolve, reject) => {
            this.factory.getProfileService().getCurrentUser((success) => {
                resolve(success);
            }), (error) => {
                reject(error);
            };
        })
    }

    setCurrentProfile(isGuestMode: boolean, request: Profile) {
        return new Promise((resolve, reject) => {
            this.factory.getProfileService().setCurrentProfile(isGuestMode, JSON.stringify(request), (success) => {
                resolve(success);
            }, (error) => {
                reject(error);
            });
        })
    }

    /**
     * This api gets the anonymous user the one if exists or a new anonymous user will be created.
     * @param onSuccess 
     * @param onError 
     */
    getAnonymousUser(onSuccess, onError) {
        // TODO: 
    }

    /**
     * This api gets the anonymous user from getAnonymousUser() api and sets it to current active user.
     * @param onSuccess 
     * @param onError
     */
    setAnonymousUser() {
        return new Promise((resolve, reject) => {
            this.factory.getProfileService().setAnonymousUser((success) => {
                resolve(success);
            }, (error) => {
                reject(error);
            });
        })
    }

    addContentAccess(cotentAccess: ContentAccess){
        return new Promise((resolve,reject) => {
            this.factory.getProfileService().addContentAccess(JSON.stringify(cotentAccess), (success) => {
                resolve(success);
            }, (error) => {
                reject(error);
            });
        })
    }

    /**
     * This api returns the list of all user profiles. It does not include the anonymous user.
     * @param onSuccess 
     * @param onError 
     */
    async getAllUserProfile(profileRequest: ProfileRequest) {
        return new Promise<any>((resolve, reject) => {
            this.factory.getProfileService().getAllUserProfile(JSON.stringify(profileRequest),
                (result) => {
                    resolve(result);
                }, (error) => {
                    reject(error);
                });
        });
    }

    /**
     * This api is used to delete a existing user with a specific uid
     * @param request 
     * @param onSuccess 
     * @param onError 
     */
    deleteUser(request: string){
         return new Promise((resolve,reject) => {
            this.factory.getProfileService().deleteUser(request, (success) => {
                resolve(success);
            }, (error) => {
                reject(error);
            });
        })
    } 

    /**
     * This api is used to import profile/group
     * @param request 
     * @param onSuccess 
     * @param onError 
     */
    importProfile(request: ProfileImportRequest)
    {
        return new Promise((resolve,reject) => {
            this.factory.getProfileService().importProfile(request, (success) => {
               resolve(success);
            }, (error) => {
               reject(error);
            });
        })
    }

    /**
     * This api is used to export profile/group
     * @param request  
     * @param onSuccess 
     * @param onError 
     */
    exportProfile(request: ProfileExportRequest)
    {
        return new Promise((resolve,reject) => {
            this.factory.getProfileService().exportProfile(request, (success) => {
              resolve(success);
            }, (error) => {
              reject(error);
            });
        })
    } 

    getProfile(request: GetProfileRequest){
        return new Promise((resolve,reject) => {
            this.factory.getProfileService().getProfile(request, (success) => {
             resolve(success);
            }, (error) => {
              reject(error);
            }); 
        })
    } 

}