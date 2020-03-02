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
    main {
        padding: 24px;
    }

    :global(input, button) {
        font-family: inherit;
        font-size: inherit;
        padding: 0.4em;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 8px;
    }
</style>
