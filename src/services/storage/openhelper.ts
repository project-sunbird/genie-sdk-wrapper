import { SQLiteObject, SQLite } from "@ionic-native/sqlite";

export abstract class DBOpenHelper {

    private oldDBVersion: number = -1;

    private readonly KEY_DB_VERSION = 'db_version';

    private db;

    constructor(private sqlite: SQLite, private dbName: string, private dbVersion: number) {
        let oldVersion = window.localStorage.getItem(this.KEY_DB_VERSION);

        if (oldVersion && !isNaN(parseInt(oldVersion))) {
            this.oldDBVersion = parseInt(oldVersion);
        }        
    }

    abstract onCreate(db: SQLiteObject): boolean;

    abstract onUpgrade(db: SQLiteObject, oldVersion: number, newVersion: number): boolean;

    createOrOpenDb() {
        this.sqlite.create({
            name: this.dbName,
            location: "default"
        }).then((db: SQLiteObject) => {
            this.db = db;
            this.createOrUpdateTables();
        }).catch((error) => {
            this.db = undefined;
            console.log("Error : " + error);
        });
    }


    getDatabase(): SQLiteObject {
        return this.db;
    }

    private createOrUpdateTables() {
        let result: boolean = false;

        if (this.oldDBVersion < 0) {
            result = this.onCreate(this.db);
        } else if (this.oldDBVersion < this.dbVersion) {
            result = this.onUpgrade(this.db, this.oldDBVersion, this.dbVersion);
        } else {
            result = true;
        }


        if (result) {
            window.localStorage.setItem(this.KEY_DB_VERSION, String(this.dbVersion));
        } else {
            // TODO: Need to handle the failure scanario
        }
    }
} 