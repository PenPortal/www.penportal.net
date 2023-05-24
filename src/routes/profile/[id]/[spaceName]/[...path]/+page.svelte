<script lang="ts">
    import { getContext } from "svelte"
    import type { Readable } from "svelte/store"
    import type { Controller } from "$lib/controller/Controller"
    import { page } from "$app/stores"

    const controller = getContext<Readable<Controller<any, any, any>>>("controller")

    $: path = $page.params.path.split("/")
</script>
