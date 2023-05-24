import type { LayoutLoad } from "./$types"
import { profileDB } from "../../profiles"

export const load = (async ({ params }) => {
    const profile = await profileDB.profiles.where("id").equals(params.id).first()

    if (!profile) {
        throw {
            isPenPortalError: true,
            i18nKey: "load-profile-error"
        }
    }

    if (profile) {
        const { LocalBrowserAdapter } = await import("$lib/adapters/local-browser/LocalBrowserAdapter")
        const c = LocalBrowserAdapter.createController({
            name: profile.name
        })
        await c.init()
        return {
            profile,
            controller: c
        }
    }

    return {
        profile,
        controller: null
    }
}) satisfies LayoutLoad
