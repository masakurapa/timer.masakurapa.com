<textarea bind:value={copyText} bind:this={textarea}></textarea>

<script lang="ts">
    import { onMount } from 'svelte';

    /** 設定のキー */
    export let key: string;

    const url = new URL(window.location.href);

    let copyText = `${url.origin}?sid=${key}`;
    let textarea: HTMLTextAreaElement;

    onMount(() => {
        textarea.select();
        document.execCommand('copy');
    });
</script>
