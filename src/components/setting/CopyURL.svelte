<textarea bind:value={url} bind:this={textarea}></textarea>

<script lang="ts">
    import { onMount } from 'svelte';

    /** 設定のキー */
    export let key: string;

    let url = `https://timer.masakurapa.com?sid=${key}`;
    let textarea: HTMLTextAreaElement;

    onMount(() => {
        textarea.select();
        document.execCommand('copy');
    });
</script>
