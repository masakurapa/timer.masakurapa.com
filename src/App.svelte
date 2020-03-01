<main>
    <MainIndex/>
    <hr>
    <SettingIndex/>
</main>

<script>
    import { onMount } from 'svelte';
    import { isWindowFocus } from './store.js';

    import MainIndex from './Main/Index.svelte';
    import SettingIndex from './Setting/Index.svelte';

    window.onfocus = () => {
        isWindowFocus.set(true);
    };

    window.onblur = () => {
        isWindowFocus.set(false);
    };

    onMount(() => {
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
    :global(html, body) {
        position: relative;
        width: 100%;
        height: 100%;
    }

    :global(body) {
        color: #333;
        margin: 0;
        padding: 24px 24px 60px 24px;
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    }
    :global(input, button) {
        font-family: inherit;
        font-size: inherit;
        padding: 0.4em;
        margin: 0 0 0.5em 0;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 8px;
    }
</style>
