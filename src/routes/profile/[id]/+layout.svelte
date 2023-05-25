<script lang="ts">
    import type { LayoutData } from "./$types"
    import type { Readable } from "svelte/store"
    import { writable } from "svelte/store"
    import type { Profile } from "../../profiles"
    import type { I18NTranslation } from "$lib/I18n/i18n"
    import { getContext, setContext } from "svelte"

    import "./profile-space-transition.css"

    export let data: LayoutData

    const profile = writable<Profile>(data.profile)
    setContext("profile", profile)
    $: $profile = data.profile

    setContext("controller", data.controller!)

    const i18n = getContext<Readable<I18NTranslation>>("i18n")
</script>

<div>
    <slot />
</div>

<style>
    div {
        min-height: 100vh;
        height: 100vh;
        box-sizing: border-box;
        padding: 16px;
    }
</style>
