import type { Adapter } from "$lib/adapters/adapters"
import { LocalBrowserController } from "$lib/adapters/local-browser/LocalBrowserController"
import Dexie from "dexie"
import type { SerializedEditorState } from "lexical/LexicalEditorState"

const LocalBrowserAdapter: Adapter<LocalBrowserController, LocalBrowserConfig> = {
    name: "Local Browser",
    createController(config: LocalBrowserConfig): LocalBrowserController {
        const db = new Dexie(config.name) as LocalDB
        db.version(1).stores({
            spaces: "id, &name, rootDirectoryId",
            directories: "id, parentId, name, [directories], [notes], [name+parentId]",
            notes: "id, spaceId, parentId, name, [name+parentId]"
        })

        return new LocalBrowserController(db)
    }
}

export type LocalBrowserConfig = {
    name: string
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
    content: SerializedEditorState
}

export { LocalBrowserAdapter }
