<script lang="ts">
    import { formatErrorMessage } from "$lib/I18n/formatErrorMessage.js"
    import { getContext } from "svelte"
    import type { I18NTranslation } from "$lib/I18n/i18n.js"
    import { page } from "$app/stores"
    import type { Readable } from "svelte/store"

    const i18n = getContext<Readable<I18NTranslation>>("i18n")
</script>

<h1 class="headline2">{formatErrorMessage($i18n, $page.error)}</h1>
