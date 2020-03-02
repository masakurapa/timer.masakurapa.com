<div>Repeat: {$repeatCount}</div>
<div class="title">{$timerSettings[$timerIndex] !== undefined ? $timerSettings[$timerIndex].title : ''}</div>

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
        <ButtonSkip/>
        <ButtonReset/>
    </div>
</div>

<Audio/>

<script>
    import {
        timerSettings,
        isTimerStarting,
        timerIndex,
        repeatCount,
        isTimeUpAll,
    } from '../store.js';


    import Audio from './Audio.svelte';
    import ButtonReset from './ButtonReset.svelte';
    import ButtonSkip from './ButtonSkip.svelte';
    import ButtonStart from './ButtonStart.svelte';
    import ButtonStop from './ButtonStop.svelte';
    import ButtonStopSound from './ButtonStopSound.svelte';
    import Timer from './Timer.svelte';
</script>

<style>
    .title {
        font-size: 30px;
    }

    .btn-wrapper {
        display: flex;
    }
    .main-btn-wrapper {
        margin-right: 32px;
    }
</style>
