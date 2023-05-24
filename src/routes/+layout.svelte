<script lang="ts">
    import "./normalize.css"
    import "./baseStyle.css"
    import "./typography.css"

    import "./profile-page-transition.css"

    import { preparePageTransition } from "$lib/page-transition"

    import type { Snapshot } from "./$types"
    import { writable } from "svelte/store"
    import { setContext } from "svelte"
    import { i18n } from "$lib/I18n/i18n"

    preparePageTransition()

    let lang = "en"

    const i18nStore = writable(i18n[lang])

    $: {
        $i18nStore = i18n[lang]
    }

    export const snapshot: Snapshot = {
        capture: () => lang,
        restore: (value) => (lang = value)
    }

    setContext("i18n", i18nStore)
</script>

<slot />
