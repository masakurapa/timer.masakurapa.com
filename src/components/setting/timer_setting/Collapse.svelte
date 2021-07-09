<div class="wrapper">
    <label class="collapse-btn" for="{key}-callapse">
        <i class="fas {icon}"></i> <slot name="header"></slot>
    </label>
    <input
        class="collapse-open"
        type="checkbox"
        id="{key}-callapse"
        aria-hidden="true"
        hidden
        bind:checked={open}
    />

    <div class="collapse-painel">
        <div class="collapse-inner">
            <slot name="content"></slot>
        </div>
    </div>
</div>

<script lang="ts">
    /** ユニークになるキー文字列 */
    export let key: string;

    // 設定の開閉管理フラグ
    let open = false;

    $: icon = open ? 'fa-chevron-down' : 'fa-chevron-up';
</script>

<style>
    .wrapper {
        margin-bottom: 32px;
        border: 1px solid #000000;
        background-color: #FFFFFF;
        border-radius: 8px;
        padding: 12px;
        max-width: 600px;
    }

    .collapse-open {
        display: none;
    }
    .collapse-painel {
        visibility: hidden;
        max-height: 0;
        opacity: 0;
        transition: max-height .1s,visibility .3s,opacity .3s;
    }
    .collapse-open:checked ~ .collapse-painel {
        max-height: 100%;
        opacity: 100;
        visibility: visible;
    }
    .collapse-btn {
        background: #FFFFFF;
        border-radius: 2px;
        cursor: pointer;
        display: block;
        padding: 5px 10px;
        font-weight: bold;
    }
    .collapse-inner {
        padding-top: 16px;
        background: #FFFFFF;
    }
</style>
