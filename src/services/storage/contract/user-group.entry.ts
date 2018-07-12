export const TABLE = "user_group_map"

export const COLUMN_GID = "gid";
export const COLUMN_UID = "uid";


export function getCreateTable(): string {
    return "CREATE TABLE IF NOT EXISTS " + TABLE + " ("
        + COLUMN_GID + " TEXT NOT NULL, "
        + COLUMN_UID + " TEXT NOT NULL, "
        + "CONSTRAINT user_group UNIQUE (" + COLUMN_GID + ", " + COLUMN_UID + ")"
        + ");";
}