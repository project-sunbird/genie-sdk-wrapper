import { DatabaseService } from "./db.service";


export abstract class NoSQLService<S> {


    constructor(private dbService: DatabaseService, private tableName: string) {

    }


    /**
     * Save the given ´object´ into SQLite Storage 
     * @param object 
     */
    async save(object: S): Promise<any> {
        let key = this.getKeyForObject(object);
        return this.dbService.getDatabase().executeSql("INSERT INTO " + this.tableName + " VALUES (?, ?)", [key, JSON.stringify(object)]);
    }


    async saveAll(objects: Array<S>): Promise<any> {
        return this.dbService.getDatabase().transaction(() => {
            objects.forEach(object => {
                let key = this.getKeyForObject(object);
                this.dbService.getDatabase().executeSql("INSERT INTO " + this.tableName + " VALUES (?, ?)", [key, JSON.stringify(object)]);
            });
        });
    }

    /**
     * Update the given ´object´ into SQLite Storage 
     * @param object 
     */
    async update(object: S): Promise<any> {
        let key = this.getKeyForObject(object);
        return this.dbService.getDatabase().executeSql("UPDATE " + this.tableName + " SET value = ? WHERE key = ?", [JSON.stringify(object), key]);
    }

    /**
     * Delete the given ´object´ from SQLite Storage
     * @param object It can be type of ´S´ or string (Unqiue Id of the object)
     */
    async delete(object: S | string): Promise<any> {
        let key = this.getKeyForObject(object);
        return this.dbService.getDatabase().executeSql("DELETE FROM " + this.tableName + " WHERE key = ?", [key]);
    }

    /**
     * Get the value for given ´object´ from SQLite Storage
     * @param object It can be type of ´S´ or string (Unqiue Id of the object)
     */
    async get(object: S | string): Promise<any> {
        let key = this.getKeyForObject(object);
        return this.dbService.getDatabase().executeSql("SELECT value FROM " + this.tableName + " WHERE key = ?", [key]);
    }


    /**
     * Get all the values stored in the SQLite Storage
     */
    async getAll(): Promise<any> {
        return this.dbService.getDatabase().executeSql("SELECT value FROM " + this.tableName, []);
    }


    private getKeyForObject(object: S | string): string {
        let key;

        if (typeof object === "string") {
            key = object;
        } else {
            key = this.getUniqueKeyFromObject(object);
        }

        return key;
    }

    /**
     * Get the Unique ID which used as keys in the Storage
     * @param object 
     */
    abstract getUniqueKeyFromObject(object: S): string
}