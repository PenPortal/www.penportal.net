<script lang="ts">
    import type { LexicalEditor } from "lexical/LexicalEditor"
    import { onMount } from "svelte"
    import { createEmptyHistoryState, type HistoryState, registerHistory } from "@lexical/history"

    export let editor: LexicalEditor

    export let externalHistoryState: HistoryState = createEmptyHistoryState()
    export let delay = 800

    // returns callback to unregister
    onMount(() => registerHistory(editor, externalHistoryState, delay))
</script>
