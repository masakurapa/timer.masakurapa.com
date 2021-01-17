{#if hasTitle}
    <div class="current-phase">
        {makePhageStr($timerSettings, $timerIndex, '')}
    </div>
    <div class="next-phase">
        Next: {makePhageStr($timerSettings, $timerIndex + 1, '-')}
    </div>
{/if}

<Timer/>

<div class="btn-wrapper">
    <div class="main-btn-wrapper">
        {#if $isTimeUpAll}
            <ButtonStopSound/>
        {:else if !$isTimerStarting}
            <ButtonStart/>
        {:else}
            <ButtonStop/>
        {/if}
    </div>
    <div class="sub-btn-wrapper">
        <ButtonNext/>
        <ButtonReset/>
    </div>
</div>

<div class="sound-wrapper"><SoundSetting/></div>
<Audio/>

<script lang="ts">
    import type { timerSetting } from '../../types';
    import {
        timerSettings,
        isTimerStarting,
        timerIndex,
        isTimeUpAll,
    } from '../../store';
    import { padding } from '../../util.js';

    import Audio from './Audio.svelte';
    import ButtonReset from './button/Reset.svelte';
    import ButtonNext from './button/Next.svelte';
    import ButtonStart from './button/Start.svelte';
    import ButtonStop from './button/Stop.svelte';
    import ButtonStopSound from './button/StopSound.svelte';
    import SoundSetting from './SoundSetting.svelte';
    import Timer from './Timer.svelte';

    let hasTitle = false;
    timerSettings.subscribe((settings): void => {
        hasTitle = settings.some(setting => setting.title !== "");
    });

    // フェーズの表示情報を返す
    const makePhageStr = (settings: timerSetting[], index: number, defaultTitle: string): string => {
        if (index >= settings.length) {
            return defaultTitle;
        }

        const t = settings[index];
        return `${t.title} (${padding(t.hour)}:${padding(t.minute)}:${padding(t.second)})`;
    };
</script>

<style>
    .current-phase {
        font-size: 30px;
        height: 50px;
    }
    .next-phase {
        font-size: 15px;
        height: 30px;
    }

    .btn-wrapper {
        display: flex;
        margin-bottom: 20px;
    }
    .main-btn-wrapper {
        margin-right: 32px;
    }
    .sound-wrapper {
        margin-bottom: 20px;
    }
</style>
