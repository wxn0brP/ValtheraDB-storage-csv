import { CustomActionsBase } from "@wxn0brp/db-core/base/custom";
import { VQuery } from "@wxn0brp/db-core/types/query";
export interface Opts {
    file?: string;
    dir?: string;
}
export declare class DbStorageCsv extends CustomActionsBase {
    opts: Opts;
    constructor(opts: Opts);
    _getPath(config: VQuery): string;
    read(file: string): Promise<unknown[]>;
    write(file: string, data: any): Promise<void>;
    ensureCollection(config: VQuery): Promise<boolean>;
    issetCollection(config: VQuery): Promise<boolean>;
    getCollections(): Promise<string[]>;
    removeCollection(config: VQuery): Promise<boolean>;
}
