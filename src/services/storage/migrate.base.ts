import { SQLiteObject } from "@ionic-native/sqlite";

export interface IMigrate {
    apply(db: SQLiteObject);

    shouldBeApplied(oldVersion: number, newVersion: number): boolean;
}