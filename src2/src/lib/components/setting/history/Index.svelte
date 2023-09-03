<div class="wrapper">
    <PersonalSetting
        personalTimerSettings={timerSetting ? timerSetting.settings : []}
    />
</div>
<div class="wrapper">
    <History
        timerHistories={timerSetting ? timerSetting.histories : []}
    />
</div>

<script lang="ts">
    import { onMount } from 'svelte';

    import type {
        StorageTimerSetting,
    } from '$lib/types/local_timer';

    import {
        getTimerSetting,
    } from '$lib/storage';

    import PersonalSetting from '$lib/components/setting/history/PersonalSetting.svelte'
    import History from '$lib/components/setting/history/History.svelte'

     // ローカルストレージに保存されたタイマー設定
    let timerSetting: StorageTimerSetting;

     onMount(() => {
        timerSetting = getTimerSetting();
     });
</script>

<style>
    .wrapper {
        margin-bottom: 32px;
        max-width: 800px;
    }
</style>
