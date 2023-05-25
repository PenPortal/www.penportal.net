import type { PageLoad } from "./$types"
import { profileDB } from "./profiles"

export const load = (async ({ depends }) => {
    depends("profileDB")
    return {
        profiles: await profileDB.profiles.toArray()
    }
}) satisfies PageLoad
