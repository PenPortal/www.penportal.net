import type { PageLoad } from "./$types"
import { profileDB } from "./profiles"

export const load = (async ({}) => {
    return {
        profiles: await profileDB.profiles.toArray()
    }
}) satisfies PageLoad
