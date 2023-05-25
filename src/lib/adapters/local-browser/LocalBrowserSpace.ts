import { Space } from "$lib/controller/Controller"
import { LocalBrowserDirectory } from "$lib/adapters/local-browser/LocalBrowserDirectory"
import type { LocalBrowserNote } from "$lib/adapters/local-browser/LocalBrowserNote"
import type { LocalDB } from "$lib/adapters/local-browser/LocalBrowserAdapter"

export class LocalBrowserSpace extends Space<LocalBrowserDirectory, LocalBrowserNote> {
    db: LocalDB
    root: LocalBrowserDirectory

    async init() {
        await this.root.init()
    }

    constructor(db: LocalDB, name: string, id: string, dirId: string) {
        super(name, id)
        this.db = db
        this.root = new LocalBrowserDirectory(db, name, dirId)
    }
}
