<div class="wrapper">
    <div class="label">Total:</div>
    <div class="total">{totalHour}:{totalMinute}:{totalSecond}</div>
</div>

<script lang="ts">
    import { timerSettings } from '../../../store';
    import {
        padding,
        calcTotalSec,
        totalSecToHMS,
    } from '../../../util';

    let totalHour = '00';
    let totalMinute = '00';
    let totalSecond = '00';

    // 合計時間を求める
    timerSettings.subscribe((settings): void => {
        let total = 0;
        settings.forEach(t => {
            total += calcTotalSec(t.hour, t.minute, t.second);
        });

        const t = totalSecToHMS(total);
        totalHour = padding(t.hour);
        totalMinute = padding(t.minute);
        totalSecond = padding(t.second);
    });
</script>

<style>
    .wrapper {
        display: flex;
        align-items: center;
        font-weight: bold;
    }
    .label {
        font-weight: bold;
        width: 80px;
    }
    .total {
        font-size: x-large;
    }
</style>
