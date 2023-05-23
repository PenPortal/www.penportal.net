import type { I18NTranslation } from "$lib/I18n/i18n"

export function formatErrorMessage(lang: I18NTranslation, error: any) {
    if (error.isPenPortalError) {
        const e = error as { isPenPortalError: true; i18nKey: keyof I18NTranslation }
        return lang[e.i18nKey]
    } else {
        return error.message
    }
}
