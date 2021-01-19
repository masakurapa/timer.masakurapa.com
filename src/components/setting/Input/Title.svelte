<div class="wrapper">
    <div class="label"><slot/></div>
    <div class="text-wrapper">
        <input
            type="text"
            bind:value={value}
            disabled={$isTimerStarting}
            on:change={onChange}
        >
    </div>
</div>

<script lang="ts">
    import {
        timerSettings,
        isTimerStarting,
    } from '../../../store.js';
    import { storeTimerSettings } from '../storage';

    export let value: string;
    export let index: number;

    const onChange = (e: any): void => {
        $timerSettings[index].title = e.target.value;
        storeTimerSettings($timerSettings);
    };
</script>

<style>
    .wrapper {
        display: flex;
        align-items: center;
    }
    .label {
        font-weight: bold;
        width: 80px;
    }
    .text-wrapper {
        width: 300px;
    }

    input {
        padding: 8px;
        height: 40px;
        width: 100%;
    }
    input:focus {
        outline: none;
    }
    input:disabled {
        background-color: #EEEEEE;
        color: #999999;
    }

    @media screen and (max-width: 480px) {
        .text-wrapper {
            width: 200px;
        }
    }
</style>
