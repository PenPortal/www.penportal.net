<script lang="ts">
    import "./editors.css"
    import { setContext } from "svelte"
    import { setupEditor } from "$lib/editor/block-editor"
    import Toolbox from "$lib/editor/Toolbox.svelte"
    import HistoryState from "$lib/editor/HistoryState.svelte"

    const editor = setupEditor()
    setContext("editor", editor)

    let editorRoot: HTMLElement

    $: {
        if (editorRoot) {
            editor.setRootElement(editorRoot)
        }
    }
</script>

<HistoryState {editor} />

<Toolbox {editor} />

<div bind:this={editorRoot} contenteditable="true" class="editor-root" />

<style>
    .editor-root {
        width: 100%;
        height: 100%;

        outline: none;

        padding: 0 24px;
        box-sizing: border-box;

        max-width: min(1000px, 100%);
        margin: 0 auto;

        font-size: 18px;
    }
</style>
