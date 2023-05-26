<script lang="ts">
    import { KEY_DOWN_COMMAND } from "lexical"

    import "./editors.css"
    import { onMount } from "svelte"
    import { setupEditor } from "$lib/editor/block-editor"
    import { textSliceCursor } from "$lib/editor/utils/textSliceCursor"
    import type { ClientRectObject } from "@floating-ui/core"

    const editor = setupEditor()

    let editorRoot: HTMLElement

    $: {
        if (editorRoot) {
            editor.setRootElement(editorRoot)
        }
    }

    let startListeningForToolbar = false

    let cursorPos: ClientRectObject | null = null
    let toolbarText: string | null = null

    onMount(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                if (startListeningForToolbar) {
                    const result = textSliceCursor(() => {
                        startListeningForToolbar = false
                    })

                    if (result) {
                        cursorPos = result.position
                        toolbarText = result.text
                    } else {
                        cursorPos = null
                        toolbarText = null
                    }
                }
            })
        })
    })

    onMount(() => {
        return editor.registerCommand<KeyboardEvent>(
            KEY_DOWN_COMMAND,
            (e) => {
                if (e.key == "/") {
                    startListeningForToolbar = true
                }

                return true
            },
            1
        )
    })
</script>

<div bind:this={editorRoot} contenteditable="true" class="editor-root" />

<style>
    .editor-root {
        width: 100%;
        height: 100%;

        outline: none;
    }
</style>
