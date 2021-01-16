<button
    on:click="{onClick}"
    disabled={$isTimerStarting}
>RESET PHASE</button>

<script lang="ts">
    import {
        timerSettings,
        isTimerStarting,
        timerIndex,
        isTimeUp,
        isFinish,
        interval,
    } from '../../../store';
    import { calcTotalSec } from '../../../util';

    const onClick = (): void => {
        clearInterval($interval);

        isTimeUp.set(false);
        isFinish.set(false);
        isTimerStarting.set(false);
        timerIndex.set(0);
        timerSettings.update(settings => {
            settings.forEach(t => {
                t.time = calcTotalSec(t.hour, t.minute, t.second);
            });
            return settings;
        });
    };
</script>

<style>
    button {
        padding: 8px;
        border: none;
        outline: none;
        color: #FFFFFF;
        width: 100px;
        height: 50px;
        background-color: #FFB833;
        cursor: pointer;
    }
    button:disabled {
        background-color: #999999;
        cursor: default;
    }
    button:forcus {
        background-color: #FFA500;
    }
    button:not(:disabled):hover {
        background-color: #FFA500;
    }
    button:not(:disabled):active {
        margin-right: 8px;
        background-color: #FFA500;
    }

    @media screen and (max-width: 480px) {
        button {
            width: 80px;
        }
    }
</style>
