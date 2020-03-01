<div>Repeat: {$repeatCount}</div>
<div class="title">{$timerSettings[$timerIndex] !== undefined ? $timerSettings[$timerIndex].title : ''}</div>

<Timer/>

{#if $isTimeUpAll}
    <ButtonStopSound/>
{:else if !$isTimerStarting}
    <ButtonStart/>
{:else}
    <ButtonStop/>
{/if}
<ButtonReset/>

<Audio/>

<script>
    import { timerSettings, isTimerStarting } from '../store.js';
    import { repeatCount, timerIndex, isTimeUpAll } from './store.js';

    import Audio from './Audio.svelte';
    import ButtonReset from './ButtonReset.svelte';
    import ButtonStart from './ButtonStart.svelte';
    import ButtonStop from './ButtonStop.svelte';
    import ButtonStopSound from './ButtonStopSound.svelte';
    import Timer from './Timer.svelte';
</script>

<style>
    .title {
        font-size: 30px;
    }
</style>
