import type { Writable } from "svelte/store"
import { get, writable } from "svelte/store"


export abstract class Controller<SPACE extends Space<D, N>, D extends Directory<D, N>, N extends Note> {
    spaces: Writable<Record<string, SPACE>> = writable({})

    async init(): Promise<void> {
        // ensure default space exists
        await this.getDefaultSpace()
        return
    }

    async getSpace(name: string): Promise<SPACE | null> {
        const spaces = get(this.spaces)

        if (spaces == null) {
            return null
        }

        return get(this.spaces)[name] ?? null
    }


    /**
     * @returns the default space should have name [Default]
     */
    async getDefaultSpace(): Promise<SPACE> {
        const defaultSpace = await this.getSpace("[Default]")
        if (defaultSpace) {
            return defaultSpace
        }

        await this.createSpace("[Default]")

        return (await this.getSpace("[Default]"))!
    }

    async canCreateSpace(name: string): Promise<boolean> {
        return !(await this.getSpace(name))
    }

    abstract createSpace(name: string): Promise<void>

    async canDeleteSpace(space: SPACE): Promise<boolean> {
        return space.name !== "[Default]"
    }

    abstract deleteSpace(space: SPACE): Promise<void>
}

export abstract class Space<D extends Directory<D, N>, N extends Note> {
    name: string
    id: string
    abstract root: D


    protected constructor(name: string, id: string) {
        this.name = name
        this.id = id
    }

    async init(): Promise<void> {
        return
    }

}

export abstract class Directory<DIR extends Directory<DIR, NOTE>, NOTE extends Note> implements DirectoryItem {

    name: string
    id: string

    directories: Writable<Record<string, DIR>> = writable({})
    notes: Writable<Record<string, NOTE>> = writable({})

    protected constructor(name: string, id: string) {
        this.name = name
        this.id = id
    }

    async init(): Promise<void> {
        return
    }

    async getDirectory(name: string): Promise<DIR | null> {
        return get(this.directories)[name] ?? null
    }

    async getNote(name: string): Promise<NOTE | null> {
        return get(this.notes)[name] ?? null
    }


    async canCreateDirectory(name: string): Promise<boolean> {
        return !(await this.getDirectory(name))
    }

    abstract createDirectory(name: string): Promise<void>

    async canCreateNote(name: string): Promise<boolean> {
        return !(await this.getNote(name))
    }

    abstract createNote(name: string): Promise<void>

    abstract canDeleteDirectory(directory: DIR): Promise<boolean>

    abstract deleteDirectory(directory: DIR): Promise<void>

    abstract canDeleteNote(note: NOTE): Promise<boolean>

    abstract deleteNote(): Promise<void>
}

export abstract class Note implements DirectoryItem {
    name: string
    id: string

    contentLoaded: boolean

    content: Writable<string> | null = null

    protected constructor(name: string, id: string) {
        this.name = name
        this.id = id
        this.contentLoaded = false
    }

    /**
     * @returns the content of the note, it will make sure the content is loaded
     */
    async getContent(): Promise<Writable<string>> {
        if (!this.contentLoaded) {
            this.content = writable(await this.loadContent())
            this.contentLoaded = true
        }

        return this.content!
    }

    abstract loadContent(): Promise<string>

    abstract saveContent(): Promise<void>
}

export interface DirectoryItem {
    name: string
    id: string
}