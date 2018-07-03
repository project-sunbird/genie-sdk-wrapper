import { Injectable } from "@angular/core";
import { Group } from "./bean";
import { Storage } from '@ionic/storage';
import { ServiceProvider } from "../factory";
import { StorageService } from "../storage/storage.service";
import { UUID } from "angular2-uuid";

@Injectable()
export class GroupService extends StorageService<Group> {


    constructor(storage: Storage, private factory: ServiceProvider) {
        super(storage, "group");
    }

    /**
     * @param request This api is used to create a new group with specific {@link Group}
     */
    async createGroup(request: Group) {
        // TODO:

        try {
            let value = await this.save(request);
            // create succes response
            let genieResponse = { result: value };
            return await genieResponse;
        } catch (error) {
            // create genie error response
            return await { error: error };
        }

    }

    /**
     * This api updates the specific group that is passed to it.
     * @param request 
     */
    async updateGroup(request: Group) {
        // TODO:
        try {
            let value = await this.update(request);
            // create succes response
            let genieResponse = { result: value };
            return await genieResponse;
        } catch (error) {
            // create genie error response
            return await { error: error };
        }
    }

    setCurrentGroup(gid: string) {
        window.sessionStorage.setItem('current_group', gid);
    }

    /**
     * This api gets the current active group.
     */
    getCurrentGroup(): string {
        return window.sessionStorage.getItem('current_group')!;
    }

    /**
     * This api returns the list of all groups.
     */
    async getAllGroup() {
        try {
            let value = await this.getAll();
            // create succes response
            let genieResponse = { result: value };
            return await genieResponse;
        } catch (error) {
            return await { error: error };
        } 
    }

    /**
     * This api is used to delete a existing group with a specific gid
     * @param gid 
     */
    async deleteGroup(gid: string) {
        try {
            let value = await this.delete(gid);
            // create succes response
            let genieResponse = { result: value };
            return await genieResponse;
        } catch (error) {
            return await { error: error };
        }
    }


    /**
     * This API is used to 
     * @param request {@link UsersAndGroups}
     */
    // async mapUserAndGroup(request: UsersAndGroups) {

    // }

    getUniqueKeyFromObject(object: Group): string {
        if (object.gid) {
            return object.gid
        } else {
            object.gid = UUID.UUID() // Return Random UUID 
            return object.gid; 
        }
    }

}