import type { I18NTranslation } from "$lib/I18n/i18n"

export const english: I18NTranslation = {
    penPortal: "Pen Portal",
    userSpace: "User Space",
    welcomeMessage: "Welcome to Pen Portal!",
    // profiles related
    selectProfile: "Select a profile",
    noProfiles: "You don't have any profile yet",
    createProfile: "Create profile",
    newProfile: "New Profile",
    profileName: "Profile Name",
    profileType: "Profile Type",
    profileTypes: {
        inBrowser: "In Browser",
        remote: "Remote"
    },
    profileTypeDescription: {
        inBrowser: "This profile will be stored in your browser, and will be available only on this device.",
        remote: "This profile will connect to a remote server."
    },

    remoteURL: "Remote URL",

    remoteAuthType: "Remote Authentication Type",
    remoteAuthTypes: {
        noPassword: "No Password",
        token: "Token"
    },

    remoteToken: "Auth Token",

    create: "Create",
    creating: "Creating",
    cancel: "Cancel",

    "load-profile-error": "Error loading profile",

    loading: "Loading",
    default: "Default",
    space: "Space",
    selectASpace: "Select a space"
}
