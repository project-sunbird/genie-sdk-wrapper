import { Injectable } from "@angular/core";
import { Profile, ContentAccess, ProfileRequest, ProfileImportRequest, ProfileExportRequest } from "./bean";
import { ServiceProvider } from "../factory";

@Injectable()
export class ProfileService {

    constructor(private factory: ServiceProvider) {

    }

    /**
     * @param request This api is used to create a new user with specific {@link Profile}
     * @param onSuccess 
     * @param onError 
     */
    createProfile(request: Profile, onSuccess, onError) {
        this.factory.getProfileService().createProfile(JSON.stringify(request), onSuccess, onError);
    }

    /**
     * This api updates the specific profile that is passed to it.
     * @param request 
     * @param onSuccess 
     * @param onError 
     */
    updateProfile(request: Profile, onSuccess, onError) {
        this.factory.getProfileService().updateProfile(JSON.stringify(request), onSuccess, onError);
    }

    setCurrentUser(request: string, onSuccess, onError) {
        this.factory.getProfileService().setCurrentUser(request, onSuccess, onError);
    }

    /**
     * This api gets the current active user.
     * @param onSuccess 
     * @param onError 
     */
    getCurrentUser(onSuccess, onError) {
        this.factory.getProfileService().getCurrentUser(onSuccess, onError);
    }

    setCurrentProfile(isGuestMode: boolean, request: Profile, onSuccess, onError) {
        this.factory.getProfileService().setCurrentProfile(isGuestMode, JSON.stringify(request), onSuccess, onError);
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
    setAnonymousUser(onSuccess, onError) {
        this.factory.getProfileService().setAnonymousUser(onSuccess, onError);
    }

    addContentAccess(cotentAccess: ContentAccess, onSuccess, onError) {
        this.factory.getProfileService().addContentAccess(JSON.stringify(cotentAccess), onSuccess, onError);
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
    deleteUser(request: string, onSuccess, onError) {
        this.factory.getProfileService().deleteUser(request, onSuccess, onError);
    }

    /**
     * This api is used to import profile/group
     * @param request 
     * @param onSuccess 
     * @param onError 
     */
    importProfile(request: ProfileImportRequest, onSuccess, onError) {
        this.factory.getProfileService().importProfile(request, onSuccess, onError);
    }

    /**
     * This api is used to export profile/group
     * @param request  
     * @param onSuccess 
     * @param onError 
     */
    exportProfile(request: ProfileExportRequest, onSuccess, onError) {
        this.factory.getProfileService().exportProfile(request, onSuccess, onError);
    }

}