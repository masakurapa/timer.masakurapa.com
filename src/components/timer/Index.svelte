<Timer/>

<div class="btn-wrapper">
    <div class="main-btn-wrapper">
        {#if $isTimerRunning === true}
            {#if $isTimeUpAll === true}
                <StopSoundButton/>
            {:else}
                <PauseButton/>
            {/if}
        {:else}
            <StartButton/>
        {/if}
    </div>
    <div class="sub-btn-wrapper">
        <PrevButton/>
        <NextButton/>
        <ResetButton/>
    </div>
</div>

<div class="sound-wrapper">
    <Sound/>
</div>

<script lang="ts">
    import { isTimerRunning, isTimeUpAll } from '../../store/timer';

    import Timer from './Timer.svelte';
    import Sound from './Sound.svelte';

    import StartButton from './button/StartButton.svelte';
    import PauseButton from './button/PauseButton.svelte';
    import StopSoundButton from './button/StopSoundButton.svelte';
    import PrevButton from './button/PrevButton.svelte';
    import NextButton from './button/NextButton.svelte';
    import ResetButton from './button/ResetButton.svelte';
</script>

<style>
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

    @media (max-width: 650px) {
        .btn-wrapper {
            display: block;
        }
        .main-btn-wrapper {
            margin-right: 0px;
            margin-bottom: 8px;
        }
    }
</style>
