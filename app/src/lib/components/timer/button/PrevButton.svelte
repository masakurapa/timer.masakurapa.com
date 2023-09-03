<button on:click="{onClick}" {disabled}>前へ</button>

<script lang="ts">
    import { personalTimerSetting } from '$lib/store/setting';
    import {
        currentTimerPosition,
        isTimeUpAll,
    } from '$lib/store/timer';

    const onClick = (): void => {
        const pos = $currentTimerPosition - 1;
        currentTimerPosition.set(pos < 0 ? 0 : pos);
    };

    // 次の位置に設定情報がある場合にtrueを返します
    $: disabled = $isTimeUpAll
        || typeof $personalTimerSetting.timerSettings[$currentTimerPosition - 1] === 'undefined';
</script>

<style>
    button {
        background-color: #FF9955;
        border-bottom: 5px solid #cc6655;
        width: 100px;
    }

    button:hover {
        background-color: #EE8844;
    }
    button:disabled {
        background-color: #999999;
        border-bottom: 5px solid #666666;
        cursor: default;
    }

    @media (max-width: 400px) {
        button {
            width: 70px;
            font-size: 12px;
        }
    }
</style>
