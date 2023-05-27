<script lang="ts">
    import { computePosition, flip } from "@floating-ui/dom"
    import type { ClientRectObject } from "@floating-ui/core"
    import { createEventDispatcher, getContext } from "svelte"
    import type { LexicalEditor } from "lexical/LexicalEditor"
    import { texts } from "$lib/editor/toolbox/toolbox"

    export let pos: ClientRectObject | null
    export let toolbarText: string

    let toolboxDom: HTMLElement

    const editor = getContext<LexicalEditor>("editor")

    const dispatcher = createEventDispatcher()

    $: {
        if (pos && toolboxDom) {
            update()
        }
    }

    function update() {
        const virtualEl = {
            getBoundingClientRect() {
                return pos!
            }
        }

        computePosition(virtualEl, toolboxDom, {
            placement: "bottom-start",
            middleware: [
                flip({
                    boundary: editor.getRootElement()!,
                    padding: 8
                })
            ]
        }).then(({ x, y }) => {
            Object.assign(toolboxDom.style, {
                left: `${x}px`,
                top: `${y}px`,
                display: "block"
            })
        })
    }

    let focusIndex = 0

    $: actions = searchActions(toolbarText.toLowerCase())

    type Action = {
        name: string
        svg: string
        handler?: (editor: LexicalEditor) => void
        dom: HTMLElement | null
        i: number
    }

    function searchActions(s: string): Action[] {
        const string = s.replaceAll(/\s+/g, "")
        let i = 0
        return texts
            .filter(({ name }) => name.toLowerCase().replaceAll(/\s+/g, "").includes(string))
            .map((a) => ({ ...a, dom: null, i: i++ }))
    }

    $: {
        actions.forEach((action, i) => {
            const dom: HTMLElement = action.dom
            if (!dom) {
                return
            }

            i == focusIndex ? dom.setAttribute("data-selected", "true") : dom.removeAttribute("data-selected")
        })
    }

    function handleKeys(e: KeyboardEvent) {
        switch (e.key) {
            case "ArrowDown":
                e.preventDefault()
                focusIndex = (focusIndex + 1) % actions.length
                break
            case "ArrowUp":
                e.preventDefault()
                focusIndex = (focusIndex - 1 + actions.length) % actions.length
                break
            case "Enter":
                e.preventDefault()
                executeAction(actions[focusIndex])
                break
            case "Escape":
                e.preventDefault()
                dispatcher("close", true)
                break
        }
    }

    function executeAction(action: Action) {
        editor.update(() => {
            action.handler!(editor)
        })
        dispatcher("close")
    }
</script>

<svelte:body on:keydown={handleKeys} />

<div role="menu" bind:this={toolboxDom} class="toolbox">
    <ol>
        {#each actions as action}
            <li role="menuitem" tabindex="-1" on:mouseover={() => (focusIndex = action.i)}>
                <button
                    bind:this={action.dom}
                    class="btn subtitle3"
                    data-selected="false"
                    on:click={() => {
                        executeAction(action)
                    }}
                >
                    {@html action.svg}
                    <span>{action.name}</span>
                </button>
            </li>
        {/each}

        {#if actions.length === 0}
            <li role="menuitem" tabindex="-1">
                <span class="subtitle3">没有找到相关的操作</span>
            </li>
        {/if}
    </ol>
</div>

<style>
    ol {
        all: unset;
        display: flex;
        flex-direction: column;
    }

    li {
        all: unset;
        display: block;
    }

    button {
        outline: none;
        border: none;
        background: transparent;
        width: 100%;

        height: 34px;

        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 4px;
        gap: 8px;

        border-radius: 6px;
    }

    button :global(svg) {
        fill: var(--gray12);
    }

    button[data-selected] {
        background: var(--gray6);
    }

    .toolbox {
        display: none;
        position: absolute;
        top: 0;
        left: 0;

        width: 180px;

        max-height: 300px;

        border: 1px solid var(--gray8);
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.12), 0 32px 64px rgba(0, 0, 0, 0.14);
        border-radius: 8px;

        padding: 4px;
    }
</style>
