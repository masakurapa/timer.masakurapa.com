<div class="timer">
    {hour}:{minute}:{second}
</div>

<script>
    import {
        timerIndex,
        timerSettings,
    } from '../store.js';
    import { padding, totalSecToHMS } from '../util.js';

    let hour = '00';
    let minute = '00';
    let second = '00';

    // reactive
    $: {
        const t = $timerSettings[$timerIndex];
        if (t !== undefined) {
            const obj = totalSecToHMS(t.time);
            hour = padding(obj.hour);
            minute = padding(obj.minute);
            second = padding(obj.second);
        }
    }
</script>

<style>
    .timer {
        font-size: 120px;
    }

    @media screen and (max-width: 480px) {
        .timer {
            font-size: 80px;
        }
    }
</style>
