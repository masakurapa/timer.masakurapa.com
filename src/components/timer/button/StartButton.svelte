<button on:click="{onClick}" {disabled}>START</button>

<script lang="ts">
    import { isTimerRunning, timerSecondsRemaining } from '../../../store/state';

    const onClick = (): void => {
        isTimerRunning.set(true);
    };

    // 残り秒数が0ならボタン非活性
    $: disabled = $timerSecondsRemaining === 0;
</script>

<style>
    button {
        background-color: #2288FF;
        width: 200px;
    }

    button:hover {
        background-color: #1177EE;
    }
    button:disabled {
        background-color: #999999;
        cursor: default;
    }
</style>
