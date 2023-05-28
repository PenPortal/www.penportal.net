<script lang="ts">
    import type { Directory } from "$lib/controller/Controller"
    import { page } from "$app/stores"
    import FileIcon from "./FileIcon.svelte"
    import FolderIcon from "./FolderIcon.svelte"
    import DirectoryContextMenu from "./DirectoryContextMenu.svelte"
    import { computePosition, flip } from "@floating-ui/dom"
    import type { Readable } from "svelte/store"
    import { getContext, setContext } from "svelte"
    import type { I18NTranslation } from "$lib/I18n/i18n"

    export let directory: Directory<any, any>

    const i18n = getContext<Readable<I18NTranslation>>("i18n")

    $: directories = directory.directories
    $: notes = directory.notes

    setContext("directory", directory)

    let directoryCtxMenuElm: HTMLElement
    let dirDom: HTMLElement

    function handleRightClick({ clientX, clientY }: MouseEvent) {
        const virtualEl = {
            getBoundingClientRect() {
                return {
                    width: 0,
                    height: 0,
                    x: clientX,
                    y: clientY,
                    top: clientY,
                    left: clientX,
                    right: clientX,
                    bottom: clientY
                }
            }
        }

        computePosition(virtualEl, directoryCtxMenuElm, {
            placement: "bottom-start",
            middleware: [
                flip({
                    boundary: dirDom,
                    padding: 8
                })
            ]
        }).then(({ x, y }) => {
            Object.assign(directoryCtxMenuElm.style, {
                left: `${x}px`,
                top: `${y}px`,
                display: "block"
            })
        })
    }
</script>

<ol bind:this={dirDom} class="box" on:contextmenu|preventDefault={handleRightClick}>
    {#each Object.entries($directories) as [name, dir] (dir.id)}
        <li>
            <a href="{$page.url.pathname}/{name}">
                <FolderIcon />
                <p class="body2">{name}</p>
            </a>
        </li>
    {/each}

    {#each Object.entries($notes) as [name, note] (note.id)}
        <li>
            <a href="{$page.url.pathname}/{name}/edit">
                <FileIcon />
                <p class="body2">{name}</p>
            </a>
        </li>
    {/each}

    {#if Object.keys($notes).length === 0 && Object.keys($directories).length === 0}
        <p class="headline5 helper-message">{$i18n.emptyHelperMessage}</p>
    {/if}
</ol>

<DirectoryContextMenu bind:dom={directoryCtxMenuElm} {directory} />

<style>
    .helper-message {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 0;
    }

    ol {
        all: unset;

        flex: 1;

        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1em;

        overflow: clip;
    }

    li {
        all: unset;
        display: block;
    }

    a {
        all: unset;
        width: 96px;
        max-height: 180px;

        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }

    a:hover {
        cursor: pointer;
    }

    .box a:active :global(svg) {
        transform: scale(0.95);
    }

    .box a:focus :global(svg) {
        background: var(--blue6);
    }

    p {
        text-align: center;
    }

    .box :global(svg) {
        border-radius: 18px;

        padding-left: 13px;
        padding-right: 13px;

        min-width: 70px;
        height: 96px;

        transition: transform 0.2s ease-in-out, background 0.2s ease-in-out;
    }

    p {
        word-break: break-all;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
</style>
