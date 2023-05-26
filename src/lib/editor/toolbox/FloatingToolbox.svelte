<script lang="ts">
    import { computePosition, flip } from "@floating-ui/dom"
    import type { ClientRectObject } from "@floating-ui/core"
    import { getContext } from "svelte"
    import type { LexicalEditor } from "lexical/LexicalEditor"

    export let pos: ClientRectObject

    let toolboxDom: HTMLElement

    const editor = getContext<LexicalEditor>("editor")

    $: {
        if (pos && toolboxDom) {
            update()
        }
    }

    function update() {
        const virtualEl = {
            getBoundingClientRect() {
                return pos
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
</script>

<div bind:this={toolboxDom} class="toolbox">123123</div>

<style>
    .toolbox {
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
</style>
