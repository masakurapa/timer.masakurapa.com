<div class="wrapper">
    <div class="button-wrapper">
        <div
            class="btn"
            class:active={activeBtnNo === TIMER_SETTING}
            on:click="{() => onClick(TIMER_SETTING)}"
            aria-hidden="true"
        ><i class="fas fa-cogs fa-2x"></i> タイマー設定</div>
    </div>

    <div class="button-wrapper">
        <div
            class="btn"
            class:active={activeBtnNo === HISTORY}
            on:click="{() => onClick(HISTORY)}"
            aria-hidden="true"
        ><i class="fas fa-history fa-2x"></i> 個人設定・履歴</div>
    </div>
</div>

<svelte:component this={components[activeBtnNo]}/>
<!-- クリップボードコピーで使用する領域 -->
<div id="clipboard"></div>

<script lang="ts">
    import TimerSetting from '$lib/components/setting/timer_setting/Index.svelte';
    import History from '$lib/components/setting/history/Index.svelte';

    // アクティブなボタンがない状態
    const NONE = 0;
    // タイマー設定がアクティブな状態
    const TIMER_SETTING  = 1;
    // 設定履歴がアクティブな状態
    const HISTORY  = 2;

    const components: { [key: number]: any } = {
        [TIMER_SETTING]: TimerSetting,
        [HISTORY]: History,
    };

    let activeBtnNo  = TIMER_SETTING;

    const onClick = (no: number): void => {
        // 現在アクティブな番号と同じならアクティブなボタンを無くす
        // それ以外は渡された番号をアクティブにする
        activeBtnNo = activeBtnNo === no ? NONE : no;
    }
</script>

<style>
    .wrapper {
        display: flex;
        width: 100%;
        padding: 4px 0;
        margin-bottom: 32px;
        border-bottom: 1px solid #AAAAAA;
    }
    .button-wrapper {
        width: calc(100% / 2);
        padding: 0 4px;
    }

    .btn i {
        display: inline-block;
        vertical-align: middle;
        margin-right: 8px;
    }

    .btn {
        display: flex;
        width: 100%;
        height: 50px;
        border-radius: 8px;
        cursor: pointer;
        justify-content: center;
        align-items: center;
    }

    .btn:hover {
        background-color: #DDDDDD;
    }
    .btn:disabled {
        background-color: #999999;
        cursor: default;
    }

    .active {
        background-color: #DDDDDD;
    }

    @media (max-width: 380px) {
        .button-wrapper {
            font-size: 12px;
        }
    }
</style>
