import { Injectable } from "@angular/core";
import { Group } from "./bean";
import { Storage } from '@ionic/storage';
import { ServiceProvider } from "../factory";

@Injectable()
export class GroupService {

    constructor(private storage: Storage, private factory: ServiceProvider) {
        storage.ready().then(() => {
        });
    }

    /**
     * @param request This api is used to create a new group with specific {@link Group}
     */
    async createGroup(request: Group) {
        // TODO:

        try {
            let value = await this.storage.set('name', request);
            // create succes response
            let genieResponse = {};
            return await genieResponse;
        } catch (error) {
            // create genie error response
            return await {};
        }

    }

    /**
     * This api updates the specific group that is passed to it.
     * @param request 
     */
    async updateGroup(request: Group) {
        // TODO:
        this.createGroup({}).
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
        // TODO: 
    }

    /**
     * This api is used to delete a existing group with a specific gid
     * @param gid 
     */
    async deleteGroup(gid: string) {
        // TODO: 
    }

    /**
     * This API is used to 
     * @param request {@link UsersAndGroups}
     */
    async mapUserAndGroup(request: UsersAndGroups) {

    }

}