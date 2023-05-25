import { Directory, emptySerializedEditorState } from "$lib/controller/Controller"
import { LocalBrowserNote } from "$lib/adapters/local-browser/LocalBrowserNote"
import type { LocalDB } from "$lib/adapters/local-browser/LocalBrowserAdapter"
import { liveQuery } from "dexie"

export class LocalBrowserDirectory extends Directory<LocalBrowserDirectory, LocalBrowserNote> {
    db: LocalDB

    constructor(db: LocalDB, name: string, directoryId: string) {
        super(name, directoryId)
        this.db = db
    }

    async init(): Promise<void> {
        await this.refreshDirectories()
        await this.refreshNotes()

        liveQuery(async () => {
            await this.db.directories.where({ parentId: this.id })

            await this.db.notes.where({ parentId: this.id })
        }).subscribe(() => {
            this.refreshDirectories()
            this.refreshNotes()
        })
    }

    private async refreshDirectories() {
        const dbDirectories = await this.db.directories.where({ parentId: this.id }).toArray()
        const directoryListPromise = Promise.all(
            dbDirectories.map(async (dbDirectory) => {
                const directory = new LocalBrowserDirectory(this.db, dbDirectory.name, dbDirectory.id)
                await directory.init()
                return directory
            })
        )

        const directoryList = await directoryListPromise

        const directoryObj: Record<string, LocalBrowserDirectory> = {}
        directoryList.forEach((directory) => {
            directoryObj[directory.name] = directory
        })

        this.directories.set(directoryObj)
    }

    private async refreshNotes() {
        const dbNotes = await this.db.notes.where({ parentId: this.id }).toArray()
        const noteListPromise = Promise.all(
            dbNotes.map(async (dbNote) => {
                const note = new LocalBrowserNote(this.db, dbNote.name, dbNote.id)
                await note.init()
                return note
            })
        )

        const noteList = await noteListPromise

        const noteObj: Record<string, LocalBrowserNote> = {}
        noteList.forEach((note) => {
            noteObj[note.name] = note
        })

        this.notes.set(noteObj)
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
            content: emptySerializedEditorState
        })
    }

    deleteDirectory(directory: LocalBrowserDirectory): Promise<void> {
        return Promise.resolve(undefined)
    }

    deleteNote(): Promise<void> {
        return Promise.resolve(undefined)
    }
}
