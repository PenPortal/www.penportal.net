import type { PageLoad } from "./$types"

export const load = (async ({ parent }) => {
    return {
        ...(await parent())
    }
}) satisfies PageLoad
