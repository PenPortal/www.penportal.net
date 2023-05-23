import Dexie from "dexie"

type ProfileDB = Dexie & {
    profiles: Dexie.Table<Profile, string>
}

export type Profile = {
    id: string
    type: string
    config: InBrowser | Remote<"no-password" | "token">
}

type InBrowser = {
    name: string
}

type Remote<Auth extends "no-password" | "token"> = {
    name: string
    url: string
    authType: Auth
    auth: Auth extends "no-password" ? NoPasswordAuth : TokenAuth
}

type NoPasswordAuth = {
    type: "no-password"
    email: string
}

type TokenAuth = {
    type: "token"
    token: string
}

export const profileDB = new Dexie("pen-portal-profiles") as ProfileDB
profileDB.version(1).stores({
    profiles: "id, type"
})