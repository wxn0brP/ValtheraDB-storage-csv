import { ValtheraClass } from "@wxn0brp/db-core";
import { DbStorageCsv } from "./adapter.js";
export function createCsvValthera(opts) {
    const csvStorage = new DbStorageCsv(opts);
    return new ValtheraClass({
        adapter: csvStorage,
    });
}
