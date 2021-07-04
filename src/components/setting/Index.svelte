<div class="button-wrapper">
    <button
        class:active={activeBtnNo === 1}
        on:click="{() => onClick(1)}"
    >Settings</button>

    <div class="hisotry-button-wrapper">
        <button
            class:active={activeBtnNo === 2}
            on:click="{() => onClick(2)}"
        >Setting History</button>
    </div>
</div>

<script lang="ts">
    let activeBtnNo = 0;

    const onClick = (no: number): void => {
        // 現在アクティブな番号と同じならアクティブなボタンを無くす
        // それ以外は渡された番号をアクティブにする
        activeBtnNo = activeBtnNo === no ? 0 : no;
    }
</script>

<style>
    .button-wrapper {
        display: flex;
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
