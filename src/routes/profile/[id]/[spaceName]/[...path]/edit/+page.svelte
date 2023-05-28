<script lang="ts">
    import BlockEditor from "$lib/editor/BlockEditor.svelte"
    import { getContext, onMount } from "svelte"
    import { Note, Space } from "$lib/controller/Controller.js"
    import { page } from "$app/stores"
    import { get } from "svelte/store"

    const space = getContext<Space<any, any>>("space")

    $: path = $page.params.path.split("/")

    $: note = getNote(path)

    function getNote(path: string[]): Note {
        let dir = get(space.root.directories)[path[0]]

        for (let i = 1; i < path.length - 1; i++) {
            console.log(123)
            dir = get(dir.directories)[path[i]]
        }

        return get<Note>(dir.notes)[path[path.length - 1]]
    }

    $: content = note.content

    $: initState = get(note.content)

    let timeout: number

    function autoSaveLoop(threshold: number) {
        timeout = setTimeout(async () => {
            if (note) {
                await note.saveContent()
            }
            autoSaveLoop(threshold)
        }, threshold)
    }

    onMount(() => {
        autoSaveLoop(100)
        return () => clearTimeout(timeout)
    })
</script>

<BlockEditor {initState} bind:editorStateSerialized={$content} />
