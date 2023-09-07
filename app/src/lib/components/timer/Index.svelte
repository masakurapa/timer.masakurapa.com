<div class="wrapper" style="
    position: {$isTimerRunning ? 'sticky' : 'unset'};
    top: {$isTimerRunning ? '0' : 'unset'};
    background-color: {$backgroundColor};
">
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
</div>

<script lang="ts">
    import { isTimerRunning, isTimeUpAll } from '$lib/store/timer';
    import { backgroundColor } from '$lib/store/setting';

    import Timer from '$lib/components/timer/Timer.svelte';
    import Sound from '$lib/components/timer/Sound.svelte';

    import StartButton from '$lib/components/timer/button/StartButton.svelte';
    import PauseButton from '$lib/components/timer/button/PauseButton.svelte';
    import StopSoundButton from '$lib/components/timer/button/StopSoundButton.svelte';
    import PrevButton from '$lib/components/timer/button/PrevButton.svelte';
    import NextButton from '$lib/components/timer/button/NextButton.svelte';
    import ResetButton from '$lib/components/timer/button/ResetButton.svelte';
</script>

<style>
    .wrapper {
        border-bottom: 1px solid #AAAAAA;
        padding: 8px 24px;
        z-index: 10;
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
