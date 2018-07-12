import { Migration } from "./migration";
import { SQLiteObject } from "@ionic-native/sqlite";
import * as GroupEntry from "../contract/group.entry";
import * as UserGroupEntry from "../contract/user-group.entry";

export class CreateMigration extends Migration {

    constructor() {
        super(1, 1);
    }

    apply(db: SQLiteObject) {
        db.transaction(() => {
            this.getAllCreateQuery().forEach(query => {
                db.executeSql(query, {});
            })
        });
    }

    private getAllCreateQuery(): Array<string> {
        return [
            GroupEntry.getCreateTable(),
            UserGroupEntry.getCreateTable()
        ]
    }
}