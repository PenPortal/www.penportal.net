<script lang="ts">
    import { getContext } from "svelte"
    import type { Readable } from "svelte/store"
    import { get } from "svelte/store"
    import type { Controller } from "$lib/controller/Controller"
    import { Space } from "$lib/controller/Controller"
    import { page } from "$app/stores"
    import DirectoryView from "../DirectoryView.svelte"
    import type { I18NTranslation } from "$lib/I18n/i18n"

    const controller = getContext<Controller<any, any, any>>("controller")
    const space = getContext<Space<any, any>>("space")

    $: path = $page.params.path.split("/")

    $: dir = getDirectory(path)

    function getDirectory(path: string[]) {
        let dir = get(space.root.directories)[path[0]]
        for (let i = 1; i < path.length; i++) {
            dir = get(dir.directories)[path[i]]
        }
        return dir
    }

    const i18n = getContext<Readable<I18NTranslation>>("i18n")

    function formatSpaceName(name: string) {
        return name == "[Default]" ? $i18n.default + " " + $i18n.space : name
    }
</script>

<main>
    <h1 class="headline3">
        {formatSpaceName(space.name)}
    </h1>

    <DirectoryView directory={dir} />
</main>

<style>
    main {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
</style>
