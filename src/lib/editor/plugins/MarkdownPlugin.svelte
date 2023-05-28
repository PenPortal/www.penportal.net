<script lang="ts">
    import type { LexicalEditor } from "lexical/LexicalEditor"
    import { onMount } from "svelte"
    import {
        BOLD_ITALIC_STAR,
        BOLD_ITALIC_UNDERSCORE,
        BOLD_STAR,
        BOLD_UNDERSCORE,
        CODE,
        HEADING,
        INLINE_CODE,
        ITALIC_STAR,
        ITALIC_UNDERSCORE,
        LINK,
        ORDERED_LIST,
        QUOTE,
        STRIKETHROUGH,
        UNORDERED_LIST,
        registerMarkdownShortcuts
    } from "@lexical/markdown"

    export let editor: LexicalEditor

    onMount(() =>
        registerMarkdownShortcuts(editor, [
            // Element transformers
            UNORDERED_LIST,
            CODE,
            HEADING,
            ORDERED_LIST,
            QUOTE,

            // Text format transformers
            BOLD_ITALIC_STAR,
            BOLD_ITALIC_UNDERSCORE,
            BOLD_STAR,
            BOLD_UNDERSCORE,
            INLINE_CODE,
            ITALIC_STAR,
            ITALIC_UNDERSCORE,
            STRIKETHROUGH,

            // Text match transformers
            LINK
        ])
    )
</script>
