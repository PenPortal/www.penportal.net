<script lang="ts">
    import { clickOutside } from "$lib/clickOutside"
    import { getContext } from "svelte"
    import type { I18NTranslation } from "$lib/I18n/i18n"
    import type { Readable } from "svelte/store"
    import CreateFolderModal from "./CreateFolderModal.svelte"
    import type { Directory } from "$lib/controller/Controller"
    import CreateNoteModal from "./CreateNoteModal.svelte"

    function handleClickOutside() {
        Object.assign(dom.style, {
            display: "none"
        })
    }

    export let dom: HTMLElement

    const i18n = getContext<Readable<I18NTranslation>>("i18n")
    export let directory: Directory<any, any>

    type Action = {
        translationKey: string
        action: () => void
    }

    let showCreateFolderModal = false
    let showCreateNoteModal = false

    const actions: Action[] = [
        {
            translationKey: "createFolder",
            action: () => {
                showCreateFolderModal = true
            }
        },
        {
            translationKey: "createNote",
            action: () => {
                showCreateNoteModal = true
            }
        }
    ]
</script>

{#if showCreateFolderModal}
    <CreateFolderModal bind:show={showCreateFolderModal} {directory} />
{/if}

{#if showCreateNoteModal}
    <CreateNoteModal bind:show={showCreateNoteModal} {directory} />
{/if}

<div use:clickOutside on:click_outside={handleClickOutside} bind:this={dom} class="context">
    <ol class="content">
        {#each actions as action}
            <li>
                <button
                    tabindex="0"
                    autofocus
                    class="item body1"
                    on:click={() => {
                        action.action()
                        handleClickOutside()
                    }}
                >
                    {$i18n[action.translationKey]}
                </button>
            </li>
        {/each}
    </ol>
</div>

<style>
    .context {
        display: none;
        width: max-content;
        position: absolute;
        top: 0;
        left: 0;

        min-width: 128px;
        max-width: 300px;

        border: 1px solid var(--gray8);
        box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
        border-radius: 8px;

        padding: 4px;
    }

    ol {
        all: unset;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    li {
        all: unset;
        display: block;
    }

    .item {
        display: block;
        width: 100%;
        height: 32px;

        outline: none;
        border: none;
        background: none;

        border-radius: 4px;

        text-align: start;
    }

    .item:is(:hover, :focus) {
        background: var(--gray6);
    }

    .content {
    }
</style>
