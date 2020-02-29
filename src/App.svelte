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
        padding: 16px 16px 52px 16px;
    }
</style>
