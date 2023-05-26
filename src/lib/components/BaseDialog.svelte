<script lang="ts">
    import { getContext } from "svelte"
    import type { I18NTranslation } from "$lib/I18n/i18n"

    import type { Readable } from "svelte/store"

    export let showModal: boolean

    let dialog: HTMLDialogElement

    const i18n = getContext<Readable<I18NTranslation>>("i18n")

    $: if (dialog && showModal) dialog.showModal()

    interface $$Slots {
        default: {}
        title: {}
        actions: {}
    }
</script>

<dialog bind:this={dialog} on:close>
    <div class="title">
        <slot name="title" />
    </div>
    <div class="content">
        <slot />
    </div>
    <div class="actions">
        <slot name="actions" />
    </div>
</dialog>

<style>
    dialog {
        display: flex;
        flex-direction: column;
    }

    .actions {
        width: fit-content;
        align-self: flex-end;
    }

    @keyframes horizontal-shaking {
        0% {
            transform: translateX(0);
        }
        25% {
            transform: translateX(5px);
        }
        50% {
            transform: translateX(-5px);
        }
        75% {
            transform: translateX(5px);
        }
        100% {
            transform: translateX(0);
        }
    }

    .content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    input,
    select {
        outline: none;
        padding: 0.35rem 0.5rem;
        border-radius: 8px;
        border: 1px solid var(--gray6);
        background: var(--gray1);
        color: var(--gray12);

        transition: border-color 0.2s ease-out;
    }

    :is(input, select):is(:focus, :hover) {
        border-color: var(--gray8);
    }

    dialog {
        outline: none;
        padding: 24px;
        width: calc(100vw - 16px);
        max-width: 500px;
        border-radius: 12px;
        border: 1px solid var(--gray8);
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.12), 0 32px 64px rgba(0, 0, 0, 0.14);
    }

    dialog::backdrop {
        background: rgba(0, 0, 0, 0.3);
    }

    dialog > div {
        padding: 0.2rem;
    }

    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @keyframes zoom {
        from {
            transform: scale(0.95);
        }
        to {
            transform: scale(1);
        }
    }

    dialog[open]::backdrop {
        animation: fade 0.2s ease-out;
    }

    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    button {
        display: block;
    }
</style>
