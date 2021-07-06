<div class="wrapper">
    <div class="phase-title">Phase Title</div>

    <div class="timer">
        {padding(totalTime.hour)}:{padding(totalTime.minute)}:{padding(totalTime.second)}
    </div>

    <div class="next-phase">
         <div>Next:</div>
         <div>(00:00:00)</div>
         <div>Next Phase Title</div>
    </div>
</div>

<script lang="ts">
    import type { Timer } from '../../types/local_timer';
    import { timerSettings } from '../../store/setting';
    import { padding, calcTotalTime } from '../../util';

    let totalTime: Timer = { hour: 0, minute: 0, second: 0 };

    timerSettings.subscribe(settings => {
        // 全設定の合計時間を求める
        totalTime = calcTotalTime(settings);
    });
</script>

<style>
    .wrapper {
        margin-bottom: 32px;
    }

    .phase-title {
        font-size: 40px;
        word-wrap: break-word;
    }

    .timer {
        font-size: 120px;
    }

    .next-phase {
        font-size: 20px;
        padding-left: 20px;
        word-wrap: break-word;
        display: flex;
    }

    .next-phase > div {
        margin-right: 12px;
    }

    @media screen and (max-width: 550px) {
        .phase-title {
            font-size: 28px;
        }
        .timer {
            font-size: 80px;
        }
        .next-phase {
            font-size: 16px;
        }
    }
</style>
