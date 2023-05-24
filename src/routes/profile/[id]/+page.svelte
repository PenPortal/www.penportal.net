<script lang="ts">
    import { getContext } from "svelte"
    import type { Controller } from "$lib/controller/Controller"
    import { Space } from "$lib/controller/Controller"
    import type { Readable } from "svelte/store"
    import type { I18NTranslation } from "$lib/I18n/i18n"
    import { page } from "$app/stores"
    import type { Profile } from "../../profiles"

    const controller = getContext<Readable<Controller<any, any, Space<any, any>>>>("controller")
    const i18n = getContext<Readable<I18NTranslation>>("i18n")
    const profile = getContext<Readable<Profile>>("profile")

    let spaces = $controller.spaces

    $: console.log($spaces)

    function formatSpaceName(name: string) {
        return name == "[Default]" ? $i18n.default + $i18n.space : name
    }
</script>

<main>
    <h1 class="headline2">{$profile.name}</h1>
    <h3 class="subtitle1">{$i18n.selectASpace}</h3>
    <ol class="space-list">
        {#each Object.values($spaces) as space (space.id)}
            <li class="card">
                <a class="subtitle3" href="{$page.url.pathname}/space/{space.id}">
                    {formatSpaceName(space.name)}
                </a>
            </li>
        {/each}
    </ol>
</main>

<style>
    main {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        max-width: 1200px;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    ol {
        all: unset;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    li {
        all: unset;
        display: block;
    }

    a {
        display: block;
        text-decoration: none;
        color: inherit;
        padding: 0.2rem 1rem;
    }

    .card {
        border: 1px solid var(--blue6);
        background-color: var(--blue1);
        color: var(--blue9);
        border-radius: 0.5rem;

        transition: background-color 0.2s, border-color 0.2s;
    }

    .card:hover {
        background-color: var(--blue2);
        border-color: var(--blue7);
    }

    .card:active {
        background-color: var(--blue3);
        border-color: var(--blue8);
    }
</style>
