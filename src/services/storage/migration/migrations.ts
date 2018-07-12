import { Migration } from "./migration";
import { CreateMigration } from "./_01_.create.migration";

export function getAllMigration(): Array<Migration> {
    let migration: Array<Migration> = [new CreateMigration()]

    migration = migration.sort((a: Migration, b: Migration) => {
        return a.compareTo(b);
    })

    return migration;
}