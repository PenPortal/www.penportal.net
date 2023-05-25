<script lang="ts">
    import type { LayoutData } from "./$types"
    import { setContext } from "svelte"

    export let data: LayoutData

    setContext("space", data.space)
</script>

<slot />
