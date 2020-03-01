<button
    on:click="{onClick}"
    disabled={$isTimerStarting}
>RESET</button>

<script>
    import { timerIndex, repeatCount, isTimeUp, interval } from './store.js';
    import { timerSettings, isTimerStarting } from '../store.js';

    const onClick = () => {
        clearInterval($interval);

        isTimeUp.set(false);
        isTimerStarting.set(false);
        repeatCount.set(0);
        timerIndex.set(0);
        timerSettings.update(settings => {
            settings.forEach(t => {
                t.time = (t.hour * 60 * 60) + (t.minute * 60) + t.second;
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
    }
    button:disabled {
        background-color: #999999;
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
            height: 40px;
        }
    }
</style>
