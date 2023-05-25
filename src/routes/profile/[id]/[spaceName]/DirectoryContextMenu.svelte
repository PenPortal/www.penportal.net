<script lang="ts">
    import { clickOutside } from "$lib/clickOutside"

    function handleClickOutside() {
        Object.assign(dom.style, {
            display: "none"
        })
    }

    export let dom: HTMLElement
</script>

<div use:clickOutside on:click_outside={handleClickOutside} bind:this={dom} class="context">
    <div class="content" />
</div>

<style>
    .context {
        display: none;
        width: max-content;
        position: absolute;
        top: 0;
        left: 0;
    }

    .content {
    }
</style>
