<script lang="ts">
    import type { PageData } from "./$types"
    import { getContext } from "svelte"
    import type { I18NTranslation } from "$lib/I18n/i18n"
    import type { Readable } from "svelte/store"

    export let data: PageData

    $: controller = data.controller
    $: profile = data.profile
    $: space = data.space

    const i18n = getContext<Readable<I18NTranslation>>("i18n")

    function formatSpaceName(name: string) {
        return name == "[Default]" ? $i18n.default + " " + $i18n.space : name
    }
</script>

<main>
    <h1 class="headline3" style:view-transition-name="title-of-profile-space-{profile.id}-{space.id}">
        {formatSpaceName(space.name)}
    </h1>
</main>
