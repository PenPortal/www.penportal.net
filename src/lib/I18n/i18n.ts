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
    newProfile: string
    profileName: string
    profileType: string
    profileTypes: {
        inBrowser: string
        remote: string
    }

    profileTypeDescription: {
        inBrowser: string
        remote: string
    }

    remoteURL: string

    remoteAuthType: string
    remoteAuthTypes: {
        noPassword: string
        token: string
    }

    remoteToken: string

    create: string
    creating: string
    cancel: string

    "load-profile-error": string

    loading: string
    default: string
    space: string

    selectASpace: string
    createSpace: string

    spaceName: string
}

export const i18n: I18N = {
    en: english
}
