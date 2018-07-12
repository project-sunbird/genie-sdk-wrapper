export const TABLE = "groups"

export const COLUMN_GID = "gid";
export const COLUMN_GROUP_VALUE = "value";
export const COLUMN_GROUP_NAME = "name";


export function getCreateTable(): string {
    return "CREATE TABLE IF NOT EXISTS " + TABLE + " ("
        + COLUMN_GID + " TEXT PRIMARY KEY, "
        + COLUMN_GROUP_VALUE + " TEXT NOT NULL, "
        + COLUMN_GROUP_NAME + " TEXT NOT NULL"
        + ");";
}