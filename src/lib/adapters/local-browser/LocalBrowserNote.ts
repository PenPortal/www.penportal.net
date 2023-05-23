import { Note } from "$lib/controller/Controller"
import type { LocalDB } from "$lib/adapters/local-browser/LocalBrowserAdapter"
import { get } from "svelte/store"

export class LocalBrowserNote extends Note {

    db: LocalDB

    constructor(db: LocalDB, name: string, id: string) {
        super(name, id)
        this.db = db
    }

    async loadContent(): Promise<string> {
        const note = await this.db.notes.get(this.id)
        if (!note) {
            throw new Error(`Note with id ${this.id} not found`)
        }

        return note.content
    }

    async saveContent(): Promise<void> {
        await this.db.notes.update(this.id, { content: get(this.content!) })
    }

}