import { CustomFileCpu } from "@wxn0brp/db-core";
import { CustomActionsBase } from "@wxn0brp/db-core/base/custom";
import { access, mkdir, readdir } from "fs/promises";
import { parse, stringify } from "csv/sync";
import { readFile, writeFile } from "fs/promises";
export class DbStorageCsv extends CustomActionsBase {
    opts;
    constructor(opts) {
        super();
        this.opts = opts;
        this.fileCpu = new CustomFileCpu(this.read.bind(this), this.write.bind(this));
    }
    _getPath(config) {
        if (this.opts.file) {
            return this.opts.file;
        }
        else if (this.opts.dir) {
            return this.opts.dir + "/" + config.collection + ".csv";
        }
    }
    async read(file) {
        const path = this._getPath({ collection: file });
        const data = await readFile(path, "utf-8");
        return parse(data, { columns: true });
    }
    async write(file, data) {
        const string = stringify(data, { header: true });
        const path = this._getPath({ collection: file });
        await writeFile(path, string);
    }
    async ensureCollection(config) {
        const path = this._getPath(config);
        if (this.opts.file) {
            try {
                await access(path);
            }
            catch (error) {
                await writeFile(path, "");
            }
        }
        else if (this.opts.dir) {
            try {
                await access(path);
            }
            catch (error) {
                await mkdir(path.split("/").slice(0, -1).join("/"), { recursive: true });
                await writeFile(path, "");
            }
        }
        return true;
    }
    async issetCollection(config) {
        const path = this._getPath(config);
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
            return [this.opts.file];
        }
        else if (this.opts.dir) {
            return await readdir(this.opts.dir, { recursive: true });
        }
        else {
            return [];
        }
    }
}
