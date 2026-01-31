import { ValtheraClass } from "@wxn0brp/db-core";
import { DbStorageCsv } from "./action.js";
export function createCsvValthera(opts) {
    const csvStorage = new DbStorageCsv(opts);
    return new ValtheraClass({
        dbAction: csvStorage
    });
}
