import Dexie, { Table } from "dexie";

export interface Butterfly {
    _id: string;
    commonName: string;
    binomialName: string;
    image?: string;
}

export class MySubClassedDexie extends Dexie {
    butterflies!: Table<Butterfly>;

    constructor() {
        super("bbm");
        this.version(1).stores({
            butterflies: "_id,commonName,binomialName,image", // Primary key and indexed props
        });
    }
}

export const db = new MySubClassedDexie();
