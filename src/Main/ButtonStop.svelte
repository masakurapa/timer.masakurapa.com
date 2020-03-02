<button
    on:click="{onClick}"
    disabled={!$isTimerStarting}
>PAUSE</button>

<script>
    import {
        isTimerStarting,
        interval,
    } from '../store.js';

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
    button:not(:disabled):hover {
        background-color: #CC1237;
    }
    button:not(:disabled):active {
        background-color: #CC1237;
    }

    @media screen and (max-width: 480px) {
        button {
            width: 150px;
            height: 40px;
        }
    }
</style>
