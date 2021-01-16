<div class="current-phase">
    {$timerSettings[$timerIndex] !== undefined ? $timerSettings[$timerIndex].title : ''}
</div>

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
    import {
        timerSettings,
        isTimerStarting,
        timerIndex,
        isTimeUpAll,
    } from '../../store';


    import Audio from './Audio.svelte';
    import ButtonReset from './button/Reset.svelte';
    import ButtonNext from './button/Next.svelte';
    import ButtonStart from './button/Start.svelte';
    import ButtonStop from './button/Stop.svelte';
    import ButtonStopSound from './button/StopSound.svelte';
    import SoundSetting from './SoundSetting.svelte';
    import Timer from './Timer.svelte';
</script>

<style>
    .current-phase {
        font-size: 30px;
        height: 50px;
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
