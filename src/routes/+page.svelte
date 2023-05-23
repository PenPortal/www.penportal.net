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

    const i18n = getContext<I18NTranslation>("i18n")

    const profiles = liveQuery(() => profileDB.profiles.toArray()) as Readable<Array<Profile>> // dirty hack to make ide work

    let showCreateProfileModal = false

</script>

<CreateProfileModal
    bind:showModal={showCreateProfileModal}
    on:close={() => showCreateProfileModal = false}
/>

<main>
    <h1 class="headline3">{$i18n.welcomeMessage}</h1>
   <div class="profile-selection">
       <button class="create-btn subtitle3" on:click={() => showCreateProfileModal = true}>
           +&nbsp;{$i18n.createProfile}
       </button>
       {#if $profiles == null}
       {:else if $profiles.length === 0}
           <p class="subtitle2 no-profile">{$i18n.noProfiles}</p>
       {:else}
           <ol>
               {#each $profiles as profile (profile.id)}
                   <li>
                       <a href="/profile/{profile.id}">
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

    h1 {
        text-align: center;
    }

    .profile-selection {
        max-width: 600px;
        width: fit-content;
        display: flex;
        flex-direction: column;
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