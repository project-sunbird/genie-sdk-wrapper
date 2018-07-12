import { Injectable } from "@angular/core";
import { Group } from "./bean";
import { ServiceProvider } from "../factory";
import { UUID } from "angular2-uuid";
import { UserGroupMapService } from "./user-group-map.service";
import { DatabaseService } from "../storage/db.service";
import * as GroupEntry from "../storage/contract/group.entry";

@Injectable()
export class GroupService {


    constructor(private database: DatabaseService, private userGroupService: UserGroupMapService, private factory: ServiceProvider) {
    }


    /**
     * @param group This api is used to create a new group with specific {@link Group}
     */
    async createGroup(group: Group) {
        let gid = this.getKeyForObject(group);
        let insertQuery = "INSERT INTO " + GroupEntry.TABLE + " VALUES (?, ?, ?)";

        let value = await this.database.getDatabase()
            .executeSql(insertQuery, [gid, JSON.stringify(group), group.name])

        if (value) {
            console.log("Inserted Id : " + value.insertId);
            console.log("Rows Affected : " + value.rowsAffected);

            if (value.rowsAffected == 1) {
                let map = await this.userGroupService.save(group);
                return await { result: group };
            }
        }

        return await { error: "Something wrong" }
    }

    /**
     * This api updates the specific group that is passed to it.
     * @param group 
     */
    async updateGroup(group: Group) {
        let gid = this.getKeyForObject(group);
        let updateQuery = "UPDATE " + GroupEntry.TABLE + " SET "
            + GroupEntry.COLUMN_GROUP_VALUE + " = ?, "
            + GroupEntry.COLUMN_GROUP_NAME + " = ? WHERE "
            + GroupEntry.COLUMN_GID + " = ?";

        let value = await this.database.getDatabase()
            .executeSql(updateQuery, [JSON.stringify(group), group.name, gid]);

        if (value) {
            console.log("Inserted Id : " + value.insertId);
            console.log("Rows Affected : " + value.rowsAffected);

            if (value.rowsAffected == 1) {
                let map = await this.userGroupService.save(group);
                return await { result: group };
            }
        }

        return await { error: "Something wrong" }
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
        let selectQuery = "SELECT * FROM " + GroupEntry.TABLE;
        let result = await this.database.getDatabase().executeSql(selectQuery, []);

        let groups: any = [];

        if (result.rows.length && result.rows.length > 0) {
            for (let i = 0; i < result.rows.length; i++) {
                let data = JSON.parse(result.rows.item(i).value);
                let gid = data.gid;
                let values = await this.userGroupService.getAllUserForGroup(gid);
                data.uids = values;
                groups.push(data);
            }
        }
        // create succes response
        let genieResponse = { result: groups };
        return await genieResponse;
    }

    /**
     * This api is used to delete a existing group with a specific gid
     * @param gid 
     */
    async deleteGroup(gid: string) {
        let deleteQuery = "DELETE FROM " + GroupEntry.TABLE + " WHERE " + GroupEntry.COLUMN_GID + " = ?";
        let value = await this.database.getDatabase().executeSql(deleteQuery, [gid]);


        if (value) {
            console.log("Inserted Id : " + value.insertId);
            console.log("Rows Affected : " + value.rowsAffected);

            if (value.rowsAffected == 1) {
                let map = await this.userGroupService.deleteAllUserForGroup(gid);
                return await { result: gid };
            }
        }

        return await { error: "Something wrong" }
    }

    private getKeyForObject(object: Group | string): string {
        let key;

        if (typeof object === "string") {
            key = object;
        } else {
            key = this.getUniqueKeyFromObject(object);
        }

        return key;
    }

    private getUniqueKeyFromObject(object: Group): string {
        if (object.gid) {
            return object.gid
        } else {
            object.gid = UUID.UUID() // Return Random UUID 
            return object.gid;
        }
    }

}