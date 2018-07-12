import { Injectable } from "@angular/core";
import { Group } from "./bean";
import { DatabaseService } from "../storage/db.service";
import * as UserGroupEntry from "../storage/contract/user-group.entry";


@Injectable()
export class UserGroupMapService {

    constructor(private database: DatabaseService) {
        
    }


    async save(group: Group) {
        try {
            let gid = group.gid;
            let result = await this.database.getDatabase().executeSql("SELECT " + UserGroupEntry.COLUMN_UID + " FROM " + UserGroupEntry.TABLE + " WHERE " + UserGroupEntry.COLUMN_GID + " = ?", [gid]);
            let addedUids: any = [];

            if (result.rows.length && result.rows.items.length) {
                addedUids.push(result.rows.item);
            }

            return this.database.getDatabase().transaction(() => {
                if (group.uids && group.uids.length > 0) {
                    group.uids.forEach(uid => {
                        if (addedUids.indexOf(uid) == -1) {
                            this.database.getDatabase().executeSql("INSERT INTO " + UserGroupEntry.TABLE + " VALUES (?, ?)", [gid, uid]);
                        }
                    });
                }
            });
        } catch (error) {
            return await { error: error };
        }
    }

    async getAllUserForGroup(group: Group | string) {
        let gid;
        if (typeof group === "string") {
            gid = group
        } else {
            gid = group.gid;
        }

        let result = await this.database.getDatabase().executeSql("SELECT * FROM " + UserGroupEntry.TABLE + " WHERE " + UserGroupEntry.COLUMN_GID + " = ?", [gid]);
        let addedUids: any = [];

        if (result.rows.length) {
            for (let i = 0; i < result.rows.length; i++) {
                let value = result.rows.item(i).uid;
                addedUids.push(value);
            }
        }
        
        return addedUids;
    }

    async deleteAllUserForGroup(group: Group | string) {
        let gid;
        if (typeof group === "string") {
            gid = group
        } else {
            gid = group.gid;
        }

        return this.database.getDatabase().executeSql("DELETE FROM " + UserGroupEntry.TABLE + " WHERE " + UserGroupEntry.COLUMN_GID + " = ?", [gid]);
    }
}