<div class="wrapper">
    <div class="setting-name-wrapper">
        <div class="label">Setting Name:</div>
        <input type="text" class="setting-name" value="">
    </div>

    <div class="button-wrapper">
        <button class="save-btn">Save LocalStorage</button>
        <div class="share-button-wrapper">
            <button
                class="save-btn"
                on:click="{onClickShareBtn}"
            >
                {#if shared}Update Shared Setting{:else}Share Setting{/if}
            </button>
        </div>
    </div>

    {#if shared}
        <div class="share-url-wrapper">
            <div class="label">Share URL:</div>
            <input type="text" class="shere-url" value="https://timer.masakurapa.com/?sid=12345" disabled>
            <button class="share-btn">COPY</button>
        </div>
    {/if}
</div>

<script lang="ts">
    let shared = false;

    const onClickShareBtn = (): void => {
        shared = true;
    }
</script>

<style>
    .wrapper {
        margin-bottom: 32px;
        border: 1px solid #000000;
        padding: 12px;
        max-width: 600px;
    }
    .setting-name-wrapper {
        margin-bottom: 12px;
    }
    .button-wrapper {
        display: flex;
        margin-bottom: 12px;
    }
    .share-button-wrapper {
        margin-left: 32px;
    }

    .save-btn {
        background-color: #FFFFFF;
        color: #000000;
        width: 200px;
    }
    .share-btn {
        background-color: #FFFFFF;
        color: #000000;
        width: 60px;
        height: 40px;
    }

    button:hover {
        background-color: #DDDDDD;
    }
    button:disabled {
        background-color: #999999;
        cursor: default;
    }

    .label {
        margin-bottom: 4px;
    }

    @media (max-width: 500px) {
        .save-btn {
            width: 150px;
            min-width: 150px;
        }
        .setting-name {
            width: 250px;
        }
        .shere-url {
            width: 250px;
        }
    }
</style>
