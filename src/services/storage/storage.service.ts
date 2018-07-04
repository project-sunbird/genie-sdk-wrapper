import { Storage } from "@ionic/storage";


export abstract class StorageService<S> {


    constructor(private storage: Storage, private keyPrefix: string, private listKey: string = "list") {
        storage.ready().then(() => {
        });
    }


    /**
     * Save the given ´object´ into Ionic Storage 
     * @param object 
     */
    async save(object: S): Promise<any> {
        let key = this.getKeyForObject(object);
        let savedObject = await this.storage.set(key, object);
        return await this.storeKeyInList(this.getUniqueKeyFromObject(object));
    }

    /**
     * Update the given ´object´ into Ionic Storage 
     * @param object 
     */
    async update(object: S): Promise<any> {
        let key = this.getKeyForObject(object);
        let savedObject = await this.storage.set(key, object);
        return await this.storeKeyInList(this.getUniqueKeyFromObject(object));
    }

    /**
     * Delete the given ´object´ from Ionic Storage
     * @param object It can be type of ´S´ or string (Unqiue Id of the object)
     */
    async delete(object: S | string): Promise<any> {
        let objectKey = this.getKeyForObject(object);
        let listKey;
        if (typeof object === "string") {
            listKey = object;
        } else {
            listKey = this.getUniqueKeyFromObject(object);
        }
        let removedObject = await this.storage.remove(objectKey);
        return await this.removeKeyInList(listKey);
    }

    /**
     * Get the value for given ´object´ from Ionic Storage
     * @param object It can be type of ´S´ or string (Unqiue Id of the object)
     */
    async get(object: S | string): Promise<any> {
        let key = this.getKeyForObject(object);
        return this.storage.get(key);
    }


    /**
     * Get all the values stored in the Ionic Storage
     */
    async getAll(): Promise<any> {
        let listKey = this.getKeyForList();
        let allKeys = await this.storage.get(listKey);

        if (!allKeys) {
            allKeys = [];
        }

        let values: Array<S> = []

        for (const key of allKeys) {
            let value = await this.get((<string>key));

            if (value) {
                values.push(value);
            }
        }

        return values;
    }

    private async storeKeyInList(key: string): Promise<string> {
        let listKey = this.getKeyForList();

        let allKeys = await this.storage.get(listKey);

        if (!allKeys) {
            allKeys = [];
        }

        if (allKeys.indexOf(key) == -1) {
            allKeys.push(key)
        }

        return this.storage.set(listKey, allKeys);
    }

    private async removeKeyInList(key: string): Promise<any> {
        let listKey = this.getKeyForList();
        let allKeys = await this.storage.get(listKey);

        if (!allKeys) {
            allKeys = [];
        }

        if (allKeys.indexOf(key) > -1) {
            let index = allKeys.indexOf(key);
            allKeys.splice(index, 1);
        }

        return this.storage.set(listKey, allKeys);
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