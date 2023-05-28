<script lang="ts">
    import type { LexicalEditor } from "lexical/LexicalEditor"
    import type { ClientRectObject } from "@floating-ui/core"
    import { KEY_DOWN_COMMAND, type RangeSelection } from "lexical"
    import { onMount } from "svelte"
    import { textSliceCursor } from "$lib/editor/utils/textSliceCursor"
    import FloatingToolbox from "$lib/editor/plugins/toolbox/FloatingToolbox.svelte"

    export let editor: LexicalEditor

    let startListeningForToolbar = false

    let cursorPos: ClientRectObject | null = null
    let toolbarText: string | null = null
    let selection: RangeSelection | null = null

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
                        selection = result.selection
                    } else {
                        cursorPos = null
                        toolbarText = null
                        selection = null
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

    function resetStates() {
        startListeningForToolbar = false
        cursorPos = null
        toolbarText = null
        selection = null
    }

    function close(event: CustomEvent) {
        const doNothing = event.detail

        if (doNothing === true) {
            resetStates()
            return
        }

        const sel = selection!.clone()
        sel.anchor.offset = sel.focus.offset - toolbarText!.length - 1 // 1 is for the slash

        editor.update(() => {
            sel.deleteLine(true)
        })

        resetStates()
    }
</script>

{#if cursorPos && toolbarText != null}
    <FloatingToolbox bind:pos={cursorPos} {toolbarText} on:close={close} />
{/if}
