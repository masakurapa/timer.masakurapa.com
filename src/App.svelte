<main>
    <Timer/>
    <hr>
    <Setting/>
</main>

<script lang="ts">
    import Timer from './components/timer/Index.svelte';
    import Setting from './components/setting/Index.svelte';
</script>

<style>
    main {
        padding: 24px;
    }

    /*
     * ボタンの基本的なスタイルをグローバルに定義しておく
     * 背景色は各ボタンで設定する
     */
    :global(button) {
        padding: 8px;
        outline: none;
        height: 50px;
        color: #FFFFFF;
        box-sizing: border-box;
        border: 1px solid #CCCCCC;
        border-radius: 8px;
        cursor: pointer;
    }

    :global(input[type="text"]) {
        height: 24px;
        padding: 4px;
        width: 350px;
        outline: none;
        border: 1px solid #767676;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
    }
</style>
