import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { DBOpenHelper } from "./openhelper";
import * as Migrations from "./migration/migrations";

@Injectable()
export class DatabaseService extends DBOpenHelper {

    constructor(sqlite: SQLite) {
        super(sqlite, "sunbird-mobile.db", 1);
    }

    onCreate(db: SQLiteObject): boolean {
        Migrations.getAllMigration().forEach(migration => {
            migration.apply(db);
        });
        return true;
    }


    onUpgrade(db: SQLiteObject, oldVersion: number, newVersion: number): boolean {
        Migrations.getAllMigration().forEach(migration => {
            if (migration.shouldBeApplied(oldVersion, newVersion)) {
                migration.apply(db);
            }
        });
        return true;
    }
}