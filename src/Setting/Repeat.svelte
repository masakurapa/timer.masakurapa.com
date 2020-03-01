<div class="wrapper">
    <label>Repeat Count</label>
    <div>
        <input
            type="number"
            bind:value={$repeat}
            min="{MIN}"
            max="{MAX}"
            disabled={$isTimerStarting}
            on:change={(e) => onChange(e.target.value)}
        >
    </div>
</div>

<script>
    import { repeat, isTimerStarting } from '../store.js';

    const MIN = 0;
    const MAX = 100;

    // 繰り返し回数のonChangeイベント
    const onChange = (val) => {
        if (val.length === 0) {
            repeat.set(MIN);
            return;
        }
        const nval = parseInt(val, 10);
        if (nval < MIN) {
            repeat.set(MIN);
        } else if (nval > MAX) {
            repeat.set(MAX);
        } else {
            repeat.set(nval);
        }
    };
</script>

<style>
    .wrapper {
        margin-bottom: 20px;
    }
    label {
        display: block;
        font-weight: bold;
        margin-bottom: 8px;
    }
    input {
        padding: 8px;
        height: 40px;
        text-align: center;
    }
    input:focus {
        outline: none;
    }
    input:disabled {
        background-color: #EEEEEE;
        color: #999999;
    }
</style>
