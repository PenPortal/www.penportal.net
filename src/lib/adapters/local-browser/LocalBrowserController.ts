import { Controller } from "$lib/controller/Controller"
import { LocalBrowserSpace } from "$lib/adapters/local-browser/LocalBrowserSpace"
import type { LocalBrowserDirectory } from "$lib/adapters/local-browser/LocalBrowserDirectory"
import type { LocalBrowserNote } from "$lib/adapters/local-browser/LocalBrowserNote"
import type { LocalDB } from "$lib/adapters/local-browser/LocalBrowserAdapter"
import { liveQuery } from "dexie"

export class LocalBrowserController extends Controller<LocalBrowserSpace, LocalBrowserDirectory, LocalBrowserNote> {
    db: LocalDB

    constructor(db: LocalDB) {
        super()
        this.db = db
    }

    async init(): Promise<void> {
        await this.refreshSpaces()
        await super.init()
        liveQuery(async () => {
            await this.db.spaces
        }).subscribe(async () => {
            await this.refreshSpaces()
        })
    }

    async refreshSpaces() {
        const dbSpaces = await this.db.spaces.toArray()
        const spaceListPromise = Promise.all(
            dbSpaces.map(async (dbSpace) => {
                const space = new LocalBrowserSpace(this.db, dbSpace.name, dbSpace.id, dbSpace.rootDirectoryId)
                await space.init()
                return space
            })
        )

        const spaceList = await spaceListPromise

        const spaceObj: Record<string, LocalBrowserSpace> = {}
        spaceList.forEach((space) => {
            spaceObj[space.name] = space
        })

        this.spaces.set(spaceObj)
    }

    async canCreateSpace(name: string): Promise<boolean> {
        const hasSpace = await this.db.spaces.where("name").equals(name).first()
        return hasSpace == null
    }

    async createSpace(name: string): Promise<void> {
        const canCreate = await this.canCreateSpace(name)
        if (!canCreate) {
            throw new Error(`Cannot create space with name ${name}`)
        }

        const spaceId = crypto.randomUUID()
        const rootDirectoryId = crypto.randomUUID()

        await this.db.spaces.put({
            id: spaceId,
            name,
            rootDirectoryId
        })

        await this.db.directories.add({
            id: rootDirectoryId,
            parentId: spaceId,
            name: "root",
            directories: [],
            notes: []
        })
    }

    async deleteSpace(space: LocalBrowserSpace) {
        const canDelete = await this.canDeleteSpace(space)
        if (!canDelete) {
            throw new Error(`Cannot delete space with name ${space.name}`)
        }

        await this.db.spaces.delete(space.id)
    }
}
