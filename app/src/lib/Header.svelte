<svelte:head>
    {@html `<style>
        body {
            overflow-y: ${overflow};
        }
    </style>`}
</svelte:head>

<header>
    <h1>ふぁしりたいまー</h1>

    <div
        class="menu-bar"
        on:click="{onClickMenu}"
        aria-hidden="true"
    >
        {#if isOpenMenu}
            <i class="fas fa-times fa-2x"></i>
        {:else}
            <i class="fas fa-bars fa-2x"></i>
        {/if}
    </div>
    <div
        class="menu"
        class:hide-menu="{!isOpenMenu}"
        on:click="{onClickMenu}"
        aria-hidden="true"
    >
        <div class="menu-content-wrapper" on:click="{(e) => e.stopPropagation() }" aria-hidden="true">
            <div class="menu-content-title">その他のツール</div>
            <a href="https://gensei.masakurapa.com/" target="_blank" rel="noopener">
                <div class="menu-content">
                    <img width="20" height="20" src="https://gensei.masakurapa.com/favicon.png" alt="厳正な抽選ツール">
                    厳正な抽選ツール
                </div>
            </a>
        </div>
    </div>
</header>

<script lang="ts">
    let isOpenMenu = false;
    let overflow = 'auto';

    // メニューの開閉領域のクリックイベント
    // メニューを開いている場合はy軸のスクロールを無効にする
    const onClickMenu = (): void => {
        isOpenMenu = !isOpenMenu;
        overflow = isOpenMenu ? 'hidden' : 'auto';
    };
</script>

<style>
    header{
        width: 100%;
        justify-content: center;
        margin-bottom: 16px;
        padding: 4px 0;
        background-color: #659AD2;
        display: flex;
        align-items: center;
        position: relative;
    }

    h1 {
        font-size: 20px;
        color: #FFFFFF;
        margin: 0;
    }

    .menu-bar {
        position: absolute;
        right: 8px;
        color: #FFFFFF;
        cursor: pointer;
    }
    .hide-menu {
        display: none;
    }

    .menu {
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 36px;
        left: 0;
        background-color: rgba(50, 50, 50, 0.75);
        z-index: 2;
        overflow: hidden;
    }

    .menu-content-wrapper {
        width: 500px;
        position: absolute;
        right: 0;
        background-color: #FFFFFF;
        border: 1px solid #AAAAAA;
        z-index: 3;
    }
    .menu-content-wrapper a {
        display: block;
        text-decoration: none;
        padding: 8px 0;
    }
    .menu-content-wrapper a:visited {
        color: #333333;
    }

    .menu-content-title {
        padding: 8px;
        border-bottom: 1px solid #AAAAAA;
        font-size: 16px;
    }
    .menu-content {
        padding-left: 24px;
        line-height: 36px;
        align-items: center;
        display: flex;
        font-size: 20px;
    }
    .menu-content img {
        margin-right: 8px;
        border: 1px solid #AAAAAA;
    }

    @media (max-width: 550px) {
        .menu-content-wrapper {
            width: 300px;
        }
    }
</style>
