<script lang="ts">
    import { getContext, setContext } from "svelte"
    import type { Readable } from "svelte/store"
    import type { I18NTranslation } from "$lib/I18n/i18n"
    import { page } from "$app/stores"
    import type { PageData } from "./$types"
    import CreateSpaceModal from "./CreateSpaceModal.svelte"

    export let data: PageData

    $: controller = data.controller
    $: profile = data.profile
    $: spaces = data.controller!.spaces
    const i18n = getContext<Readable<I18NTranslation>>("i18n")

    setContext("controller", controller)

    $: console.log($spaces)

    let showCreateSpaceModal = false

    function formatSpaceName(name: string) {
        return name == "[Default]" ? $i18n.default + " " + $i18n.space : name
    }
</script>

<CreateSpaceModal bind:showModal={showCreateSpaceModal} />

<main>
    <h1 class="headline2" style:view-transition-name="title-of-profile-{profile.id}">
        {profile.name}
    </h1>
    <h3 class="subtitle2">{$i18n.selectASpace}</h3>

    <button class="create-btn subtitle3" on:click={() => (showCreateSpaceModal = true)}>
        +&nbsp;{$i18n.createSpace}
    </button>

    <ol class="space-list">
        {#each Object.values($spaces) as space (space.id)}
            <li class="card">
                <a class="subtitle3" href="{$page.url.pathname}/{space.name}">
                    <p style:view-transition-name="title-of-profile-space-{profile.id}-{space.id}">
                        {formatSpaceName(space.name)}
                    </p>
                </a>
            </li>
        {/each}
    </ol>
</main>

<style>
    main {
        max-height: 100vh;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        max-width: 1200px;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    ol {
        all: unset;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1rem;
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

    .create-btn {
        align-self: flex-end;

        outline: none;

        color: var(--violet9);
        border: 1px solid var(--violet9);
        background-color: var(--violet3);
        border-radius: 8px;
        cursor: pointer;

        transition: background-color 0.2s ease-in-out;
    }

    .create-btn:is(:hover, :focus-visible) {
        background-color: var(--violet4);
    }

    .create-btn:active {
        background-color: var(--violet5);
    }
</style>
