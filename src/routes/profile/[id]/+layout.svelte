<script lang="ts">
    import type { LayoutData } from "./$types"
    import type { Readable } from "svelte/store"
    import { writable } from "svelte/store"
    import type { Controller } from "$lib/controller/Controller"
    import type { Profile } from "../../profiles"
    import type { I18NTranslation } from "$lib/I18n/i18n"
    import { getContext, setContext } from "svelte"
    import { formatErrorMessage } from "$lib/I18n/formatErrorMessage"

    export let data: LayoutData

    $: loadPromise = loadController(data.profile)

    const profile = writable<Profile>(data.profile)
    setContext("profile", profile)

    const controller = writable<Controller<any, any, any>>()
    setContext("controller", controller)

    const i18n = getContext<Readable<I18NTranslation>>("i18n")

    async function loadController(profile: Profile) {
        if (profile) {
            const { LocalBrowserAdapter } = await import("$lib/adapters/local-browser/LocalBrowserAdapter")
            const c = LocalBrowserAdapter.createController({
                name: profile.name
            })
            await c.init()
            $controller = c
        }
    }
</script>

{#await loadPromise}
    <h2 class="headline3">{data.profile.name} {$i18n.loading}...</h2>
{:then _}
    <slot />
{:catch error}
    <h2 class="headline3">{formatErrorMessage($i18n, error)}</h2>
{/await}

<style>
    h2 {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
