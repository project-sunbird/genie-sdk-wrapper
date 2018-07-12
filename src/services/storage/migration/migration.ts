import { IMigrate } from "../migrate.base";
import { SQLiteObject } from "@ionic-native/sqlite";

export abstract class Migration implements IMigrate {

    constructor(private migrationNumber: number, private targetDbVersion: number) {

    }

    abstract apply(db: SQLiteObject);

    shouldBeApplied(oldVersion: number, newVersion: number): boolean {
        return oldVersion < this.targetDbVersion && this.targetDbVersion <= newVersion;
    }

    compareTo(another: Migration) {
        return (this.migrationNumber < another.migrationNumber) ? -1 : (this.migrationNumber > another.migrationNumber ? 1 : 0);
    }
}