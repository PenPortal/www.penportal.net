import { Directory } from "$lib/controller/Controller"
import type { LocalBrowserNote } from "$lib/adapters/local-browser/LocalBrowserNote"
import type { LocalDB } from "$lib/adapters/local-browser/LocalBrowserAdapter"

export class LocalBrowserDirectory extends Directory<LocalBrowserDirectory, LocalBrowserNote> {
    db: LocalDB

    constructor(db: LocalDB, name: string, directoryId: string) {
        super(name, directoryId)
        this.db = db
    }

    async canDeleteDirectory(directory: LocalBrowserDirectory): Promise<boolean> {
        return true
    }

    async canDeleteNote(note: LocalBrowserNote): Promise<boolean> {
        return true
    }

    async canCreateDirectory(name: string): Promise<boolean> {
        const hasDirectory = await this.db.directories.where({ name, parentId: this.id }).first()
        return !hasDirectory
    }

    async createDirectory(name: string): Promise<void> {
        const canCreate = await this.canCreateDirectory(name)
        if (!canCreate) {
            throw new Error(`Cannot create directory with name ${name}`)
        }

        await this.db.directories.add({
            id: crypto.randomUUID(),
            parentId: this.id,
            name,
            directories: [],
            notes: []
        })
    }

    async canCreateNote(name: string): Promise<boolean> {
        const hasNote = await this.db.notes.where({ name, parentId: this.id }).first()
        return !hasNote
    }

    async createNote(name: string): Promise<void> {
        const canCreate = await this.canCreateNote(name)
        if (!canCreate) {
            throw new Error(`Cannot create note with name ${name}`)
        }

        await this.db.notes.add({
            id: crypto.randomUUID(),
            parentId: this.id,
            name: name,
            content: ""
        })
    }

    deleteDirectory(directory: LocalBrowserDirectory): Promise<void> {
        return Promise.resolve(undefined)
    }

    deleteNote(): Promise<void> {
        return Promise.resolve(undefined)
    }
}
