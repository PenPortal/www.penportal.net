<script lang="ts">
    import { getContext } from "svelte"
    import type { I18NTranslation } from "$lib/I18n/i18n"

    import type { Readable } from "svelte/store"
    import type { Controller } from "$lib/controller/Controller"

    export let showModal: boolean

    let dialog: HTMLDialogElement

    const i18n = getContext<Readable<I18NTranslation>>("i18n")

    $: if (dialog && showModal) dialog.showModal()

    $: {
        if (showModal == false) {
            name = ""
        }
    }

    let createPromise: Promise<void> | null = null
    let creating = false

    $: {
        name

        createPromise = null
    }

    async function onSubmit(event: Event) {
        event.preventDefault()
        if (creating) return
        creating = true

        createPromise = createSpace()

        try {
            await createPromise
            dialog.close()
        } catch (error) {
            console.error(error)
        } finally {
            creating = false
        }
    }

    const controller = getContext<Controller<any, any, any>>("controller")

    async function createSpace() {
        await controller.createSpace(name)
    }

    let name = ""
</script>

<dialog bind:this={dialog} on:close>
    <div class="content" on:click|stopPropagation>
        <h1 class="headline4">{$i18n.createProfile}</h1>

        <form id="create" on:submit={onSubmit}>
            <div class="form-group">
                <label class="subtitle2" for="name">{$i18n.profileName}</label>
                <input class="body1" type="text" id="name" bind:value={name} required />
            </div>

            {#await createPromise catch error}
                {#key createPromise}
                    <div class="error-msg">
                        <p class="body2">{error.message}</p>
                    </div>
                {/key}
            {/await}

            <div class="actions">
                <button class="action-btn body1 cancel-btn" autofocus on:click={() => dialog.close()} type="reset">
                    {$i18n.cancel}
                </button>
                <button class="action-btn body1 create-btn" form="create" type="submit" disabled={creating}>
                    {creating ? $i18n.creating : $i18n.create}
                </button>
            </div>
        </form>
    </div>
</dialog>

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .form-group {
        display: flex;
        flex-direction: column;
    }

    .actions {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
    }

    .action-btn {
        flex: 1;
    }

    .error-msg {
        width: 100%;
        color: var(--red9);
        border: 1px solid var(--red6);
        border-radius: 8px;
        padding: 0.5rem;
        box-sizing: border-box;
        font-family: var(--font-medium);
        font-weight: bolder;
        animation: horizontal-shaking 0.5s ease-out;
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

    .action-btn {
        outline: none;
        cursor: pointer;
        border-radius: 8px;
        transition: background 0.2s ease-out, border-color 0.2s ease-out;
    }

    .action-btn:invalid,
    .cancel-btn {
        color: var(--red9);
        background: var(--red1);
        border: 1px solid var(--red6);
    }

    .cancel-btn:is(:focus, :hover) {
        background: var(--red2);
        border-color: var(--red8);
    }

    .cancel-btn:active {
        background: var(--red3);
        border-color: var(--red8);
    }

    .create-btn {
        color: var(--grass12);
        background: var(--grass9);
        border: 1px solid var(--grass6);
    }

    .create-btn:is(:focus, :hover) {
        background: var(--grass10);
    }

    .create-btn:active {
        background: var(--grass11);
    }

    .create-btn:disabled {
        cursor: not-allowed;
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

    .content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    dialog {
        padding: 8px;
        width: calc(100vw - 16px);
        max-width: 500px;
        border-radius: 12px;
        border: 1px solid var(--gray8);
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
