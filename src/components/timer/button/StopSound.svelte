<button
    on:click="{onClick}"
    disabled={!$isTimeUpAll}
>STOP SOUND</button>

<script lang="ts">
    import {
        timerSettings,
        isTimerStarting,
        timerIndex,
        isTimeUp,
        isFinish,
        isTimeUpAll,
        interval,
    } from '../../../store';
    import { calcTotalSec } from '../../../util';

    const onClick = (): void => {
        clearInterval($interval);

        isTimeUp.set(false);
        isFinish.set(false);
        isTimerStarting.set(false);
        isTimeUpAll.set(false);
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
        width: 200px;
        height: 50px;
        background-color: #3CB371;
        cursor: pointer;
    }
    button:disabled {
        background-color: #999999;
        cursor: default;
    }
    button:forcus {
        background-color: #349961;
    }
    button:not(:disabled):hover {
        background-color: #349961;
    }
    button:not(:disabled):active {
        background-color: #349961;
    }

    @media screen and (max-width: 480px) {
        button {
            width: 150px;
        }
    }
</style>
