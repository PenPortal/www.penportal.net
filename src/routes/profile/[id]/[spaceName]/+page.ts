import type { PageLoad } from "./$types"

export const load = (async ({ parent, params }) => {
    return {
        ...(await parent())
    }
}) satisfies PageLoad
