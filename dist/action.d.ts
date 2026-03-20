import { CustomActionsBase } from "@wxn0brp/db-core/base/custom";
export interface Opts {
    file?: string;
    dir?: string;
}
export declare class DbStorageCsv extends CustomActionsBase {
    opts: Opts;
    constructor(opts: Opts);
    _getPath(collection: string): string;
    read(file: string): Promise<unknown[]>;
    write(file: string, data: any): Promise<void>;
    ensureCollection(collection: string): Promise<boolean>;
    issetCollection(collection: string): Promise<boolean>;
    getCollections(): Promise<string[]>;
    removeCollection(collection: string): Promise<boolean>;
}
