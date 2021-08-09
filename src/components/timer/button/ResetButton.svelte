<button on:click="{onClick}" {disabled}>リセット</button>

<script lang="ts">
    import { personalTimerSetting } from '../../../store/setting';
    import {
        isTimerRunning,
        currentTimerPosition,
        timerSecondsRemaining,
    } from '../../../store/timer';
    import { calcTotalSeconds } from '../../../util';

    const onClick = (): void => {
        // 現在地が先頭以外なら先頭に戻すだけ
        if ($currentTimerPosition > 0) {
            currentTimerPosition.set(0);
            return;
        }

        // ありえないはずだが、先頭要素が存在しない場合は残り時間をリセット
        if (typeof $personalTimerSetting.timerSettings[0] === 'undefined') {
            timerSecondsRemaining.set(0);
            return;
        }

        // 先頭の設定で残り時間をリセット
        timerSecondsRemaining.set(calcTotalSeconds($personalTimerSetting.timerSettings[0].timer));
    };

    // タイマー起動中は無効化する
    $: disabled = $isTimerRunning === true;
</script>

<style>
    button {
        background-color: #FFBB33;
        border-bottom: 5px solid #CC9933;
        width: 100px;
    }

    button:hover {
        background-color: #FFAA22;
    }
    button:disabled {
        background-color: #999999;
        border-bottom: 5px solid #666666;
        cursor: default;
    }
</style>
