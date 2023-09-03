{#if show}
    <div transition:fade class="message-box">{message}</div>
{/if}

<script lang="ts">
    import { fade  } from 'svelte/transition';

    /** 表示メッセージ */
    export let message: string;
    /** メッセージを表示するか */
    export let show: boolean;
</script>

<style>
    .message-box {
        font-size: 18px;
        font-weight: bold;
        color: #FFFFFF;
        background-color: #84C98B;
        height: 40px;
        line-height: 40px;
        width: 400px;
        border-radius: 8px;
        text-align: center;
        margin: auto;
        z-index: 10;
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
    }

    @media (max-width: 500px) {
        .message-box {
            background-color: #84C98B;
            height: 40px;
            width: 200px;
        }
    }
</style>
