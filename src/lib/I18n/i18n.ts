import { english } from "$lib/I18n/translation/en"

export type Languages = "en"

export type I18N = {
    [key in Languages]: I18NTranslation
}

export type I18NTranslation = {
    penPortal: string
    userSpace: string
    welcomeMessage: string

    // profiles related
    selectProfile: string
    noProfiles: string
    createProfile: string
}

export const i18n: I18N = {
    en: english
}