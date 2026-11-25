import { CustomAdapterBase } from "@wxn0brp/db-core/base/customAdapter";
export interface Opts {
    file?: string;
    dir?: string;
}
export declare class DbStorageCsv extends CustomAdapterBase {
    opts: Opts;
    version: string;
    constructor(opts: Opts);
    _getPath(collection: string): string;
    read(file: string): Promise<unknown[]>;
    write(file: string, data: any): Promise<void>;
    ensureCollection(collection: string): Promise<boolean>;
    issetCollection(collection: string): Promise<boolean>;
    getCollections(): Promise<string[]>;
    removeCollection(collection: string): Promise<boolean>;
}
