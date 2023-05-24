import type { PageLoad } from "./$types"
import { get } from "svelte/store"

export const load = (async ({ parent, params }) => {
    const { controller } = await parent()

    const spaces = get(controller!.spaces)

    return {
        space: spaces[params.spaceName]
    }
}) satisfies PageLoad
