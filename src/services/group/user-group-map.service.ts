import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { Group } from "./bean";


@Injectable()
export class UserGroupMapService {

    private db: SQLiteObject | any;
    private tableName = "user_group_map";

    constructor(sqlite: SQLite) {
        sqlite.create({
            name: "sunbird-mobile.db",
            location: "default"
        }).then((db: SQLiteObject) => {
            this.db = db;

            return this.db.executeSql("CREATE TABLE IF NOT EXISTS " + this.tableName + " (_id INTEGER PRIMARY KEY AUTOINCREMENT, gid TEXT, uid TEXT)", {});
        }).then(val => {
            console.log("[UserGroupMap] Table Created : " + JSON.stringify(val));
        }).catch(error => {
            console.log("[UserGroupMap] table creation failed : " + error);
        })
    }


    async save(group: Group) {
        try {
            let gid = group.gid;
            let result = await this.db.executeSql("SELECT uid FROM " + this.tableName + " WHERE gid = ?", [gid]);
            let addedUids: any = [];

            if (result.rows.length && result.rows.items.length) {
                addedUids.push(result.rows.item);
            }

            return this.db.transaction(() => {
                if (group.uids && group.uids.length > 0) {
                    group.uids.forEach(uid => {
                        if (addedUids.indexOf(uid) == -1) {
                            this.db.executeSql("INSERT INTO " + this.tableName + " (gid, uid) VALUES (?, ?)", [gid, uid]);
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

        let result = await this.db.executeSql("SELECT * FROM " + this.tableName + " WHERE gid = ?", [gid]);
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

        return this.db.executeSql("DELETE FROM " + this.tableName + " WHERE gid = ?", [gid]);
    }
}