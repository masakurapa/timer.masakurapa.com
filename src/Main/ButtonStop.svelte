<button
    on:click="{onClick}"
    disabled={!$isTimerStarting}
>STOP</button>

<script>
    import { interval } from './store.js';
    import { isTimerStarting } from '../store.js';

    // タイマーの一時停止
    const onClick = () => {
        clearInterval($interval);
        isTimerStarting.set(false);
    };
</script>

<style>
    button {
        padding: 8px;
        height: 40px;
        border-radius: 8px;
        border: none;
        outline: none;
        color: #FFFFFF;
        width: 200px;
        height: 50px;
        background-color: #DC143C;
    }
    button:disabled {
        background-color: #999999;
    }
    button:forcus {
        background-color: #CC1237;
    }
    button:hover {
        background-color: #CC1237;
    }
    button:not(:disabled):active {
        background-color: #CC1237;
    }
</style>
