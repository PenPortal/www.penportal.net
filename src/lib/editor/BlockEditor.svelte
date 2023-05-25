<script lang="ts">
    import { createEditor } from "lexical"
    import { ListItemNode, ListNode } from "@lexical/list"
    import { HeadingNode, QuoteNode, registerRichText } from "@lexical/rich-text"
    import { HEADING, registerMarkdownShortcuts } from "@lexical/markdown"
    import type { EditorThemeClasses } from "lexical/LexicalEditor"

    import "./editors.css"
    import { onMount } from "svelte"

    const theming: EditorThemeClasses = {
        heading: {
            h1: "editor-h1",
            h2: "editor-h2",
            h3: "editor-h3",
            h4: "editor-h4",
            h5: "editor-h5",
            h6: "editor-h6"
        }
    }

    const config = {
        namespace: "MyEditor",
        theme: theming,
        nodes: [HeadingNode, ListNode, ListItemNode, QuoteNode],
        onError: console.error
    }

    const editor = createEditor(config)

    registerRichText(editor)
    registerMarkdownShortcuts(editor, [HEADING])

    let editorRoot: HTMLElement

    $: {
        if (editorRoot) {
            editor.setRootElement(editorRoot)
        }
    }

    onMount(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            // The latest EditorState can be found as `editorState`.
            // To read the contents of the EditorState, use the following API:

            console.log(editorState.toJSON())
        })
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
