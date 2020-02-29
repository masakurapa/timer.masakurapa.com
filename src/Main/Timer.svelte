<div class="timer">
    {hour}:{minute}:{second}
</div>

<script>
    import { timerSettings } from '../store.js';

    // 使用するタイマー設定の位置
    export let index;

    let hour = '00';
    let minute = '00';
    let second = '00';

    // ゼロパディングする
    const padding = (val) => {
        return val.toString().padStart(2, '0');
    };

    // reactive
    $: {
        const t = $timerSettings[index];
        if (t !== undefined) {
            const baseTime = (t.hour * 60 * 60) + (t.minute * 60) + t.second - t.time;
            const h = Math.floor((baseTime) / (60 * 60));
            const m = Math.floor((baseTime - (h * 60 * 60)) / 60);
            const s = (baseTime - (h * 60 * 60) - (m * 60));

            hour = padding(h);
            minute = padding(m);
            second = padding(s);
        }
    }
</script>

<style>
    .timer {
        font-size: 120px;
    }
</style>
