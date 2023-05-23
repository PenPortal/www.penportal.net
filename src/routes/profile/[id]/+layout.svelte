<script lang="ts">
    import type { LayoutData } from "./$types"
    import { writable } from "svelte/store"
    import type { Controller } from "$lib/controller/Controller"
    import type { Profile } from "../../profiles"
    import type { I18NTranslation } from "$lib/I18n/i18n"
    import { getContext } from "svelte"
    import { formatErrorMessage } from "$lib/I18n/formatErrorMessage"

    export let data: LayoutData

    $: loadPromise = loadController(data.profile)

    let controller = writable<Controller<any, any, any>>()

    const i18n = getContext<I18NTranslation>("i18n")

    async function loadController(profile: Profile) {
        if (profile) {
            const { LocalBrowserAdapter } = await import("$lib/adapters/local-browser/LocalBrowserAdapter")
            const c = LocalBrowserAdapter.createController({
                name: profile.name
            })
            $controller = c
        }
    }
</script>

<main>
    <h1 class="headline3">{data.profile.name}</h1>

    {#await loadPromise}
        <h2 class="headline3">{$i18n.loading}...</h2>
    {:then _}
        <slot />
    {:catch error}
        <h2 class="headline3">{formatErrorMessage($i18n, error)}</h2>
    {/await}
</main>

<style>
    h2 {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
