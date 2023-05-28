<script lang="ts">
    import "./editors.css"
    import { onMount, setContext } from "svelte"
    import { setupEditor } from "$lib/editor/block-editor"
    import ToolboxPlugin from "$lib/editor/plugins/ToolboxPlugin.svelte"
    import HistoryStatePlugin from "$lib/editor/plugins/HistoryStatePlugin.svelte"
    import RichTextPlugin from "$lib/editor/plugins/RichTextPlugin.svelte"
    import MarkdownPlugin from "$lib/editor/plugins/MarkdownPlugin.svelte"
    import FloatingTextFormatToolbarPlugin from "$lib/editor/plugins/floating-text-format/FloatingTextFormatToolbarPlugin.svelte"
    import AutoLinkPlugin from "$lib/editor/plugins/AutoLink/AutoLinkPlugin.svelte"
    import LinkPlugin from "$lib/editor/plugins/link/LinkPlugin.svelte"
    import type { SerializedEditorState } from "lexical/LexicalEditorState"

    export let initState: SerializedEditorState | null = null

    export let editorStateSerialized: SerializedEditorState

    const editor = setupEditor(initState)
    setContext("editor", editor)

    let editorRoot: HTMLElement

    $: {
        if (editorRoot) {
            editor.setRootElement(editorRoot)
        }
    }

    onMount(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorStateSerialized = editorState.toJSON()
        })
    })
</script>

<RichTextPlugin {editor} />
<MarkdownPlugin {editor} />
<FloatingTextFormatToolbarPlugin {editor} />
<AutoLinkPlugin {editor} />
<LinkPlugin {editor} />
<HistoryStatePlugin {editor} />
<ToolboxPlugin {editor} />

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
