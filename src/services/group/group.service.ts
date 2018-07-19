import { Injectable } from "@angular/core";
import { Group, AddUpdateProfilesRequest } from "./bean";
import { ServiceProvider } from "../factory";
import { GenieResponse } from "../service.bean";

@Injectable()
export class GroupService {

    constructor(private factory: ServiceProvider) {
    }

    /**
     * @param request This api is used to create a new group with specific {@link Group}
     */
    async createGroup(request: Group) {
        return new Promise<GenieResponse<Group>>((resolve, reject) => {
            this.factory.getGroupService().createGroup(JSON.stringify(request), (success) => {
                resolve(JSON.parse(success));
            }, (error) => {
                reject(JSON.parse(error));
            });
        });
    }

    /**
     * This api updates the specific group that is passed to it.
     * @param request 
     */
    async updateGroup(request: Group) {
        return new Promise<GenieResponse<Group>>((resolve, reject) => {
            this.factory.getGroupService().updateGroup(JSON.stringify(request), (success) => {
                resolve(JSON.parse(success));
            }, (error) => {
                reject(JSON.parse(error));
            });
        });
    }

    async setCurrentGroup(gid: string) {
        return new Promise<GenieResponse<any>>((resolve, reject) => {
            this.factory.getGroupService().setCurrentGroup(gid, (success) => {
                resolve(JSON.parse(success));
            }, (error) => {
                reject(JSON.parse(error));
            });
        });
    }

    /**
     * This api gets the current active group.
     */
    async getCurrentGroup() {
        return new Promise<GenieResponse<Group>>((resolve, reject) => {
            this.factory.getGroupService().getCurrentGroup((success) => {
                resolve(JSON.parse(success));
            }, (error) => {
                reject(JSON.parse(error));
            });
        });
    }

    /**
     * This api returns the list of all groups.
     */
    async getAllGroup() {
        return new Promise<GenieResponse<Array<Group>>>((resolve, reject) => {
            this.factory.getGroupService().getAllGroup((success) => {
                resolve(JSON.parse(success));
            }, (error) => {
                reject(JSON.parse(error));
            });
        });
    }

    /**
     * This api is used to delete a existing group with a specific gid
     * @param gid 
     */
    async deleteGroup(gid: string) {
        return new Promise<GenieResponse<any>>((resolve, reject) => {
            this.factory.getGroupService().deleteGroup(gid, (success) => {
                resolve(JSON.parse(success));
            }, (error) => {
                reject(JSON.parse(error));
            });
        });
    }


    /**
     * This api adds/updates all the profiles to the group.
     * @param addUpdateProfilesToGroup 
     */
    async addUpdateProfilesToGroup(addUpdateProfilesRequest: AddUpdateProfilesRequest) {
        return new Promise<GenieResponse<any>>((resolve, reject) => {
            this.factory.getGroupService().addUpdateProfilesToGroup(addUpdateProfilesRequest, (success) => {
                resolve(JSON.parse(success));
            }, (error) => {
                reject(JSON.parse(error));
            });
        });
    }


}