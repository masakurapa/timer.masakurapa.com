<div class="wrapper">
    <div class="label"><slot/></div>
    <div class="number-wrapper">
        <input
            type="tel"
            bind:value={value}
            minlength=1
            maxlength=2
            disabled={$isTimerStarting}
            on:change={onChange}
        >
    </div>
    <div class="range-wrapper">
        <input
            type=range
            bind:value={value}
            {min}
            {max}
            step=1
            disabled={$isTimerStarting}
            on:change={onChange}
            on:input={onChange}
        >
    </div>
</div>

<script lang="ts">
    import {
        timerSettings,
        isTimerStarting,
    } from '../../../store';
    import { calcTotalSec } from '../../../util';
    import { storeTimerSettings } from '../storage';

    type keys = 'hour' | 'minute' | 'second';

    export let value: number;
    export let min: number;
    export let max: number;
    export let index: number;
    export let key: keys;

    const updateTimerSettings = (value: number): void => {
        $timerSettings[index][key] = value;

        // タイマー値の再計算
        timerSettings.update(settings => {
            settings.forEach(t => {
                t.time = calcTotalSec(t.hour, t.minute, t.second);
            });
            return settings;
        });

        storeTimerSettings($timerSettings);
    };

    const onChange = (e: any): void => {
        const val = parseInt(e.target.value, 10);
        if (isNaN(val)) {
            updateTimerSettings(0);
            return;
        }

        let ret = val;
        if (val < min) {
            ret = min;
        } else if (val > max) {
            ret = max;
        }
        updateTimerSettings(ret);
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
    .number-wrapper {
        width: 70px;
    }
    .range-wrapper {
        width: 300px;
    }

    /* NumberBox Style */
    input[type="tel"] {
        padding: 8px;
        height: 40px;
        text-align: center;
        width: 50px;
    }
    input[type="tel"]:focus {
        outline: none;
    }
    input[type="tel"]:disabled {
        background-color: #EEEEEE;
        color: #999999;
    }

    /* Range Style */
    input[type=range] {
        width: 100%;
        -webkit-appearance: none;
        border: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
        width: 300px;
        height: 1em;
        background: #ddd;
        border: none;
        border-radius: 3px;
    }
    input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        border: none;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: #1976d2;
        margin-top: -5px;
    }
    input[type=range]:disabled::-webkit-slider-thumb {
        background: #eee;
    }
    input[type=range]:focus {
        outline: none;
    }
    input[type=range]:focus::-webkit-slider-runnable-track {
        background: #ccc;
    }

    /* media query */
    @media screen and (max-width: 480px) {
        input[type="tel"] {
            width: 40px;
        }
        .number-wrapper {
            width: 60px;
        }
        .range-wrapper {
            width: 200px;
        }
    }
</style>
