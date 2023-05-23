import Dexie from "dexie"

type ProfileDB = Dexie & {
    profiles: Dexie.Table<Profile, string>
}

export type ProfileType = "in-browser" | "remote"

export type Profile = {
    id: string
    type: string
    name: string
    config: InBrowser | Remote<"no-password" | "token">
}

export type InBrowser = {}

export type RemoteAuth = "no-password" | "token"

export type Remote<Auth extends RemoteAuth> = {
    url: string
    authType: Auth
    options: Auth extends "no-password" ? NoPasswordAuth : TokenAuth
}

export type NoPasswordAuth = {}

export type TokenAuth = {
    token: string
}

export const profileDB = new Dexie("pen-portal-profiles") as ProfileDB
profileDB.version(1).stores({
    profiles: "id, type"
})
