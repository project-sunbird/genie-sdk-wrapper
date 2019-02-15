import { Injectable } from "@angular/core";
import {
    UserProfileDetailsRequest,
    UserProfileSkillsRequest,
    TenantInfoRequest,
    UserSearchCriteria,
    EndorseOrAddSkillRequest,
    ProfileVisibilityRequest,
    UploadFileRequest,
    UpdateUserInfoRequest,
    AcceptTermsAndConditionsRequest,
    UserExistRequest,
    GenerateOTPRequest,
    VerifyOTPRequest,
    LocationSearchCriteria
} from "./bean"
import { ServiceProvider } from "../factory";

@Injectable()
export class UserProfileService {

    constructor(private factory: ServiceProvider) {

    }

    getUserProfileDetails(request: UserProfileDetailsRequest, onSuccess, onError) {
        this.factory.getUserProfileService().getUserProfileDetails(JSON.stringify(request), onSuccess, onError);
    }

    getTenantInfo(request: TenantInfoRequest, onSuccess, onError) {
        this.factory.getUserProfileService().getTenantInfo(JSON.stringify(request), onSuccess, onError);
    }

    searchUser(request: UserSearchCriteria, onSuccess, onError) {
        this.factory.getUserProfileService().searchUser(JSON.stringify(request), onSuccess, onError);
    }

    getSkills(request: UserProfileSkillsRequest, onSuccess, onError) {
        this.factory.getUserProfileService().getSkills(JSON.stringify(request), onSuccess, onError);
    }

    endorseOrAddSkill(request: EndorseOrAddSkillRequest, onSuccess, onError) {
        this.factory.getUserProfileService().endorseOrAddSkill(JSON.stringify(request), onSuccess, onError);
    }

    setProfileVisibility(request: ProfileVisibilityRequest, onSuccess, onError) {
        this.factory.getUserProfileService().setProfileVisibility(JSON.stringify(request), onSuccess, onError);
    }

    uploadFile(request: UploadFileRequest, onSuccess, onError) {
        this.factory.getUserProfileService().uploadFile(JSON.stringify(request), onSuccess, onError);
    }

    updateUserInfo(request: UpdateUserInfoRequest, onSuccess, onError) {
        this.factory.getUserProfileService().updateUserInfo(JSON.stringify(request), onSuccess, onError);
    }

    acceptTermsAndConditions(request: AcceptTermsAndConditionsRequest, onSuccess, onError) {
        this.factory.getUserProfileService().acceptTermsAndConditions(JSON.stringify(request), onSuccess, onError);
    }

    isAlreadyInUse(request: UserExistRequest) {
        return new Promise((resolve, reject) => {
            this.factory.getUserProfileService().isAlreadyInUse(JSON.stringify(request),
                (success) => {
                    resolve(success);
                },
                (error) => {
                    reject(error);
                });
        });
    }

    generateOTP(request: GenerateOTPRequest) {
        return new Promise((resolve, reject) => {
            this.factory.getUserProfileService().generateOTP(JSON.stringify(request),
                (success) => {
                    resolve(success);
                },
                (error) => {
                    reject(error);
                });
        });
    }

    verifyOTP(request: VerifyOTPRequest) {
        return new Promise((resolve, reject) => {
            this.factory.getUserProfileService().verifyOTP(JSON.stringify(request),
                (success) => {
                    resolve(success);
                },
                (error) => {
                    reject(error);
                });
        });
    }

    searchLocation(request: LocationSearchCriteria) {
        return new Promise((resolve, reject) => {
            this.factory.getUserProfileService().searchLocation(JSON.stringify(request),
                (success) => {
                    resolve(success);
                },
                (error) => {
                    reject(error);
                });
        });
    }

}
