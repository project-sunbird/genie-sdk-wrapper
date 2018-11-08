import { Injectable } from "@angular/core";

import {
    AnnouncementDetailsRequest, AnnouncementListRequest,
    UpdateAnnouncementStateRequest
} from "./bean";
import { ServiceProvider } from "../factory";

@Injectable()
export class AnnouncementService {

    constructor(private factory: ServiceProvider) {

    }

    getAnnouncementDetails(request: AnnouncementDetailsRequest){
        return new Promise((resolve,reject) => {
            this.factory.getAnnouncementService().getAnnouncementDetails(JSON.stringify(request), (success) => {
                resolve(success);
            }),(error) => {
                reject(error);
            }
        })
    }

    getAnnouncementList(request: AnnouncementListRequest, onSuccess, onError) {
        this.factory.getAnnouncementService().getAnnouncementList(JSON.stringify(request), onSuccess, onError);
    }

    updateAnnouncementState(request: UpdateAnnouncementStateRequest, onSuccess, onError) {
        this.factory.getAnnouncementService().updateAnnouncementState(JSON.stringify(request), onSuccess, onError);
    }
}