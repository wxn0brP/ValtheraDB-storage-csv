import { ValtheraClass } from "@wxn0brp/db-core";
import { DbStorageCsv, Opts } from "./action";

export function createCsvValthera(opts: Opts) {
    const csvStorage = new DbStorageCsv(opts);
    return new ValtheraClass({
        dbAction: csvStorage
    });
}