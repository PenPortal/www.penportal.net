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

    return {
        profile
    }
}) satisfies LayoutLoad
