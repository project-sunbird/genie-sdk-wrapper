import { Storage } from "@ionic/storage";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";


export abstract class StorageService<S> {

    protected db: SQLiteObject | any;

    constructor(private sqlite: SQLite, private keyPrefix: string, private listKey: string = "list") {
        sqlite.create({
            name: "sunbird-mobile.db",
            location: "default"
        }).then((db: SQLiteObject) => {
            this.db = db;
            console.log("CREATE TABLE IF NOT EXISTS " + keyPrefix + " (key TEXT, value TEXT)");
            return this.db.executeSql("CREATE TABLE IF NOT EXISTS " + keyPrefix + " (key TEXT UNIQUE, value TEXT)", {})
        }).then(val => {
            console.log("Table Created : " + val);
        }).catch(error => {
            console.log("Not able to create the db");
        });
    }


    /**
     * Save the given ´object´ into Ionic Storage 
     * @param object 
     */
    async save(object: S): Promise<any> {
        let key = this.getKeyForObject(object);
        return this.db.executeSql("INSERT INTO " + this.keyPrefix + " VALUES (?, ?)", [key, JSON.stringify(object)]);
    }


    async saveAll(objects: Array<S>): Promise<any> {
        return this.db.transaction(() => {
            objects.forEach(object => {
                let key = this.getKeyForObject(object);
                this.db.executeSql("INSERT INTO " + this.keyPrefix + " VALUES (?, ?)", [key, JSON.stringify(object)]);
            });
        });
    }

    /**
     * Update the given ´object´ into Ionic Storage 
     * @param object 
     */
    async update(object: S): Promise<any> {
        let key = this.getKeyForObject(object);
        return this.db.executeSql("UPDATE " + this.keyPrefix + " SET value = ? WHERE key = ?", [JSON.stringify(object), key]);
    }

    /**
     * Delete the given ´object´ from Ionic Storage
     * @param object It can be type of ´S´ or string (Unqiue Id of the object)
     */
    async delete(object: S | string): Promise<any> {
        let key = this.getKeyForObject(object);
        return this.db.executeSql("DELETE FROM " + this.keyPrefix + " WHERE key = ?", [key]);
    }

    /**
     * Get the value for given ´object´ from Ionic Storage
     * @param object It can be type of ´S´ or string (Unqiue Id of the object)
     */
    async get(object: S | string): Promise<any> {
        let key = this.getKeyForObject(object);
        return this.db.executeSql("SELECT value FROM " + this.keyPrefix + " WHERE key = ?", [key]);
    }


    /**
     * Get all the values stored in the Ionic Storage
     */
    async getAll(): Promise<any> {
        return this.db.executeSql("SELECT value FROM " + this.keyPrefix, []);
    }


    private getKeyForObject(object: S | string): string {
        let key;

        if (typeof object === "string") {
            key = object;
        } else {
            key = this.getUniqueKeyFromObject(object);
        }

        return this.keyPrefix.concat("_", key);
    }


    protected getKeyForList(): string {
        return this.keyPrefix.concat("_", this.listKey)
    }

    /**
     * Get the Unique ID which used as keys in the Storage
     * @param object 
     */
    abstract getUniqueKeyFromObject(object: S): string
}