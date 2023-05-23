import type { Adapter } from "$lib/adapters/adapters"
import { LocalBrowserController } from "$lib/adapters/local-browser/LocalBrowserController"
import Dexie from "dexie"


const LocalBrowserAdapter: Adapter<LocalBrowserController> = {
    name: "Local Browser",
    createController(): LocalBrowserController {
        const db = new Dexie("pen-portal-local-browser") as LocalDB
        db.version(1).stores({
            spaces: "id, &name, rootDirectoryId",
            directories: "id, parentId, name, [directories], [notes]",
            notes: "id, spaceId, parentId, name"
        })

        return new LocalBrowserController(db)
    }
}

export type LocalDB = Dexie & {
    spaces: Dexie.Table<DBSpace, string>
    directories: Dexie.Table<DBDirectory, string>
    notes: Dexie.Table<DBNote, string>
}

export type DBSpace = {
    id: string
    name: string
    rootDirectoryId: string
}

export type DBDirectory = {
    id: string
    parentId: string
    name: string
    directories: string[]
    notes: string[]
}

export type DBNote = {
    id: string
    parentId: string
    name: string
    content: string
}

export { LocalBrowserAdapter }