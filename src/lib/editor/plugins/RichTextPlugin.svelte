<script lang="ts">
    import type { LexicalEditor } from "lexical/LexicalEditor"
    import { onMount } from "svelte"
    import { registerRichText } from "@lexical/rich-text"

    export let editor: LexicalEditor

    onMount(() => registerRichText(editor))
</script>
