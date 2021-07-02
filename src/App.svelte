<Head/>
<main>
    <Timer/>
    <hr>
    <Setting/>
</main>

<script lang="ts">
    import { onMount } from 'svelte';
    import { isWindowFocus } from './store.js';

    import Head from './Head.svelte';
    import Timer from './components/timer/Index.svelte';
    import Setting from './components/setting/Index.svelte';

    window.onfocus = (): void => isWindowFocus.set(true);
    window.onblur = (): void => isWindowFocus.set(false);

    onMount((): void => {
        // 通知の許可を求める
        if ('Notification' in window) {
            const permission = Notification.permission;
            if (permission === 'denied' || permission === 'granted') {
                return;
            }
            Notification.requestPermission();
        }
    });
</script>

<style>
    main {
        padding: 24px;
    }

    :global(input) {
        font-family: inherit;
        font-size: inherit;
        padding: 0.4em;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 8px;
    }

    :global(button) {
        font-family: inherit;
        font-size: inherit;
        padding: 0.4em;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 8px;
    }
</style>
