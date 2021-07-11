<button on:click="{onClick}" {disabled}>PREV</button>

<script lang="ts">
    import { timerSettings } from '../../../store/setting';
    import { currentTimerPosition } from '../../../store/timer';

    const onClick = (): void => {
        const pos = $currentTimerPosition - 1;
        currentTimerPosition.set(pos < 0 ? 0 : pos);
    };

    // 次の位置に設定情報がある場合にtrueを返します
    $: disabled = typeof $timerSettings[$currentTimerPosition - 1] === 'undefined';
</script>

<style>
    button {
        background-color: #FF9955;
        width: 100px;
    }

    button:hover {
        background-color: #EE8844;
    }
    button:disabled {
        background-color: #999999;
        cursor: default;
    }
</style>
