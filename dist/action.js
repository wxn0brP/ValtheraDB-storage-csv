import { CustomFileCpu } from "@wxn0brp/db-core";
import { CustomActionsBase } from "@wxn0brp/db-core/base/custom";
import { parse, stringify } from "csv/sync";
import { access, mkdir, readdir, readFile, rm, writeFile } from "fs/promises";
import { version } from "./version.js";
export class DbStorageCsv extends CustomActionsBase {
    opts;
    version = version;
    constructor(opts) {
        super();
        this.opts = opts;
        this.fileCpu = new CustomFileCpu(this.read.bind(this), this.write.bind(this));
    }
    _getPath(collection) {
        if (this.opts.file) {
            return this.opts.file;
        }
        else if (this.opts.dir) {
            return this.opts.dir + "/" + collection + ".csv";
        }
    }
    async read(file) {
        const path = this._getPath(file);
        const data = await readFile(path, "utf-8");
        const records = parse(data, {
            columns: true,
        });
        for (const record of records) {
            for (const key of Object.keys(record)) {
                const val = record[key];
                if (val === "" || val === undefined || val === null) {
                    delete record[key];
                    continue;
                }
                try {
                    record[key] = JSON.parse(val);
                }
                catch {
                    // keep as string if not valid JSON
                }
            }
        }
        return records;
    }
    async write(file, data) {
        const transformed = data.map((row) => {
            const newRow = {};
            for (const [k, v] of Object.entries(row)) {
                newRow[k] = v === undefined ? "" : JSON.stringify(v);
            }
            return newRow;
        });
        const string = stringify(transformed, {
            header: true,
        });
        const path = this._getPath(file);
        await writeFile(path, string);
    }
    async ensureCollection(collection) {
        const path = this._getPath(collection);
        if (this.opts.file) {
            try {
                await access(path);
                return false;
            }
            catch (error) {
                await writeFile(path, "");
            }
        }
        else if (this.opts.dir) {
            try {
                await access(path);
                return false;
            }
            catch (error) {
                await mkdir(path.split("/").slice(0, -1).join("/"), {
                    recursive: true,
                });
                await writeFile(path, "");
            }
        }
        return true;
    }
    async issetCollection(collection) {
        const path = this._getPath(collection);
        try {
            await access(path);
            return true;
        }
        catch (error) {
            return false;
        }
    }
    async getCollections() {
        if (this.opts.file) {
            return [
                this.opts.file,
            ];
        }
        else if (this.opts.dir) {
            try {
                const files = await readdir(this.opts.dir, {
                    recursive: true,
                });
                return files.map(f => (f.endsWith(".csv") ? f.slice(0, -4) : f));
            }
            catch {
                return [];
            }
        }
        else {
            return [];
        }
    }
    async removeCollection(collection) {
        await rm(this._getPath(collection));
        return true;
    }
}
