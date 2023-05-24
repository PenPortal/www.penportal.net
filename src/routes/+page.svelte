<script lang="ts" context="module">
</script>

<script lang="ts">
    import { liveQuery } from "dexie"
    import { profileDB } from "./profiles"
    import type { Profile } from "./profiles"
    import { getContext } from "svelte"
    import type { I18NTranslation } from "$lib/I18n/i18n"
    import type { Readable } from "svelte/store"
    import CreateProfileModal from "./CreateProfileModal.svelte"

    const i18n = getContext<Readable<I18NTranslation>>("i18n")

    const profiles = liveQuery(() => profileDB.profiles.toArray()) as Readable<Array<Profile>> // dirty hack to make ide work

    let showCreateProfileModal = false
</script>

<CreateProfileModal bind:showModal={showCreateProfileModal} on:close={() => (showCreateProfileModal = false)} />

<main>
    <h1 class="headline3">{$i18n.welcomeMessage}</h1>
    <div class="profile-selection">
        <button class="create-btn subtitle3" on:click={() => (showCreateProfileModal = true)}>
            +&nbsp;{$i18n.createProfile}
        </button>
        {#if $profiles == null}
            <p class="subtitle2" style="opacity: 0;">{$i18n.loading}</p>
        {:else if $profiles.length === 0}
            <p class="subtitle2 no-profile">{$i18n.noProfiles}</p>
        {:else}
            <ol>
                {#each $profiles as profile (profile.id)}
                    <li class="">
                        <a class="subtitle3_1 profile-card" href="/profile/{profile.id}">
                            {profile.name}
                        </a>
                    </li>
                {/each}
            </ol>
        {/if}
    </div>
</main>

<style>
    main {
        max-width: 600px;
        padding: 8px;
        box-sizing: border-box;

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        width: 100%;

        display: flex;
        flex-direction: column;

        align-items: center;
    }

    ol {
        all: unset;
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
    }

    li {
        all: unset;
        display: block;
    }

    h1 {
        text-align: center;
    }

    .profile-card {
        width: 100%;
        border: 1px solid var(--violet6);
        background-color: var(--violet1);
        color: var(--violet11);

        padding: 8px;
        box-sizing: border-box;

        transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    }

    a {
        display: block;
        width: 100%;
        text-decoration: none;
        cursor: pointer;
    }

    .profile-card:is(:hover, :focus-visible) {
        background-color: var(--violet2);
        color: var(--violet12);
    }

    .profile-card:active {
        background-color: var(--violet3);
        color: var(--violet12);
    }

    .profile-selection {
        max-width: 400px;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
    }

    .no-profile {
        align-self: center;
    }

    .create-btn {
        align-self: flex-end;

        outline: none;

        color: var(--blue9);
        border: 1px solid var(--blue9);
        background-color: var(--blue3);
        border-radius: 8px;
        cursor: pointer;

        transition: background-color 0.2s ease-in-out;
    }

    .create-btn:is(:hover, :focus-visible) {
        background-color: var(--blue4);
    }

    .create-btn:active {
        background-color: var(--blue5);
    }
</style>
