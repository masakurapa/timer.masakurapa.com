<button on:click="{onClick}" {disabled}>RESET</button>

<script lang="ts">
    import { timerSettings } from '../../../store/setting';
    import {
        isTimerRunning,
        currentTimerPosition,
        timerSecondsRemaining,
    } from '../../../store/state';
    import { calcTotalSeconds } from '../../../util';

    const onClick = (): void => {
        // 現在地が先頭以外なら先頭に戻すだけ
        if ($currentTimerPosition > 0) {
            currentTimerPosition.set(0);
            return;
        }

        // ありえないはずだが、先頭要素が存在しない場合は残り時間をリセット
        if (typeof $timerSettings[0] === 'undefined') {
            timerSecondsRemaining.set(null);
            return;
        }

        // 先頭の設定で残り時間をリセット
        timerSecondsRemaining.set(calcTotalSeconds($timerSettings[0].timer));
    };

    // タイマー起動中は無効化する
    $: disabled = $isTimerRunning === true;
</script>

<style>
    button {
        background-color: #FFBB33;
        width: 100px;
    }

    button:hover {
        background-color: #FFAA22;
    }
    button:disabled {
        background-color: #999999;
        cursor: default;
    }
</style>
