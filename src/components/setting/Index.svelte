<div class="button-wrapper">
    <button
        class:active={activeBtnNo === TIMER_SETTING}
        on:click="{() => onClick(TIMER_SETTING)}"
    >Settings</button>

    <div class="hisotry-button-wrapper">
        <button
            class:active={activeBtnNo === HISTORY}
            on:click="{() => onClick(HISTORY)}"
        >Setting History</button>
    </div>
</div>

<svelte:component this={components[activeBtnNo]}/>
<!-- クリップボードコピーで使用する領域 -->
<div id="clipboard"></div>

<script lang="ts">
    import TimerSetting from './timer_setting/Index.svelte';
    // import History from './history/Index.svelte';

    // アクティブなボタンがない状態
    const NONE = 0;
    // タイマー設定がアクティブな状態
    const TIMER_SETTING  = 1;
    // 設定履歴がアクティブな状態
    const HISTORY  = 2;

    const components: { [key: number]: any } = {
        [TIMER_SETTING]: TimerSetting,
        // [HISTORY]: History,
    };

    let activeBtnNo  = TIMER_SETTING;

    const onClick = (no: number): void => {
        // 現在アクティブな番号と同じならアクティブなボタンを無くす
        // それ以外は渡された番号をアクティブにする
        activeBtnNo = activeBtnNo === no ? NONE : no;
    }
</script>

<style>
    .button-wrapper {
        display: flex;
        margin-bottom: 32px;
    }
    .hisotry-button-wrapper {
        margin-left: 32px;
    }

    button {
        background-color: #FFFFFF;
        color: #000000;
        width: 200px;
    }

    button:hover {
        background-color: #DDDDDD;
    }
    button:disabled {
        background-color: #999999;
        cursor: default;
    }

    .active {
        background-color: #DDDDDD;
    }

    @media (max-width: 500px) {
        button {
            width: 150px;
            min-width: 150px;
        }
    }
</style>
