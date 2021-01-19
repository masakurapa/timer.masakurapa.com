<button
    disabled={$isTimerStarting || $timerSettings.length === 1}
    on:click="{() => remove()}"
><i class="fas fa-trash-alt fa-2x"></i></button>

<script lang="ts">
    import {
        timerIndex,
        timerSettings,
        isTimerStarting,
    } from '../../../store';
    import { storeTimerSettings } from '../storage';

    export let index: number;

    // 指定行のタイマー設定を削除
    const remove = (): void => {
        timerSettings.update(settings => {
            settings.splice(index, 1);
            return settings;
        });
        storeTimerSettings($timerSettings);

        // 無条件で一番上のタイマーに戻しておく
        timerIndex.set(0);
    };
</script>

<style>
    /* ボタン系 */
    button {
        height: 40px;
        padding: 0px;
        background-color: #FFFFFF;
        border: none;
        outline: none;
        cursor: pointer;
        color: #DC143C;
    }
    button:forcus {
        background-color: #FFFFFF;
    }
    button:disabled {
        color: #999999;
        cursor: default;
    }
    button:not(:disabled):active {
        background-color: #FFFFFF;
    }
</style>
