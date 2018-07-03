import { Storage } from "@ionic/storage";


export abstract class StorageService<S> {
    

    constructor(private storage: Storage, private keyPrefix: string, private listKey: string = "list") {
        storage.ready().then(() => {
        });
     }

    async save(object: S): Promise<any> {
        let key = this.getKeyForObject(object);
        let savedObject = await this.storage.set(key, object);
        return await this.storeKeyInList(this.getUniqueKeyFromObject(object));
    }

    async update(object: S): Promise<any> {
        let key = this.getKeyForObject(object);
        let savedObject = await this.storage.set(key, object);
        return await this.storeKeyInList(this.getUniqueKeyFromObject(object));
    }

    async delete(object: S | string): Promise<any> {
        let key;
        let listKey;
        if (typeof object === "string") {
            listKey = object;
            key = this.keyPrefix.concat("_", object);
        } else {
            listKey = this.getUniqueKeyFromObject(object);
            key = this.getKeyForObject(object as S);
        }
        let removedObject = await this.storage.remove(key);
        return await this.removeKeyInList(listKey);
    }

    async get(object: S | string): Promise<any> {
        let key;
        if (typeof object === "string") {
            key = this.keyPrefix.concat("_", object);
        } else {
            key = this.getKeyForObject(object as S);
        }
        return this.storage.get(key);
    }

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

    private getKeyForObject(object: S): string {
        return this.keyPrefix.concat("_", this.getUniqueKeyFromObject(object));
    }


    protected getKeyForList(): string {
        return this.keyPrefix.concat("_", this.listKey)
    }

    abstract getUniqueKeyFromObject(object: S): string
}