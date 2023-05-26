<script lang="ts">
    import type { Directory } from "$lib/controller/Controller"
    import BaseDialog from "$lib/components/BaseDialog.svelte"
    import { currentLang } from "$lib/I18n/i18n"

    export let show: boolean
    export let directory: Directory<any, any>

    const i18n = currentLang()

    let name = ""

    let creating = false

    let createPromise: Promise<void>

    async function createFolder() {
        creating = true
        try {
            createPromise = directory.createDirectory(name)
            await createPromise
            show = false
        } catch (error) {
            console.error(error)
        } finally {
            creating = false
        }
    }
</script>

{#if show}
    <BaseDialog bind:showModal={show}>
        <h1 class="subtitle2" slot="title">
            {$i18n.createFolder}
        </h1>

        <form id="create">
            <label class="label subtitle3">{$i18n.folderName}</label>
            <input class="input body1" type="text" bind:value={name} required />
        </form>

        {#await createPromise catch error}
            {#key createPromise}
                <div class="error-msg">
                    <p class="body2">{error.message}</p>
                </div>
            {/key}
        {/await}

        <div class="actions" slot="actions">
            <button class="action-btn body1 cancel-btn" autofocus on:click={() => (show = false)} type="reset">
                {$i18n.cancel}
            </button>
            <button
                class="action-btn body1 create-btn"
                form="create"
                type="submit"
                disabled={creating}
                on:click={createFolder}
            >
                {creating ? $i18n.creating : $i18n.create}
            </button>
        </div>
    </BaseDialog>
{/if}

<style>
    form {
        display: flex;
        flex-direction: column;
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

    button {
        padding: 3px 12px;
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
</style>
