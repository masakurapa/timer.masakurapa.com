<div>
    <p on:click={onClick}>
        サウンド <i class="fas fa-2x" class:fa-toggle-on={isPlaySound} class:fa-toggle-off={!isPlaySound}></i>
    </p>
</div>
<audio src="/decision4.mp3" bind:this={audio1}><track kind="captions"/></audio>
<audio src="/warning1.mp3" loop bind:this={audio2}><track kind="captions"/></audio>

<script lang="ts">
    import { isTimeUp, isTimeUpAll } from '../../store/timer';

    let isPlaySound = true;

    const onClick = () => {
        isPlaySound = !isPlaySound;
        setAudio2Volume(isPlaySound);
    };

    let audio1: HTMLMediaElement;
    let audio2: HTMLMediaElement;

    // 1つのタイマー設定の終了を管理するフラグの変更を検知したとき
    isTimeUp.subscribe(flag => {
        if (audio1 === undefined || !isPlaySound) {
            return;
        }
        if (flag) {
            audio1.play();
        } else {
            audio1.pause();
            audio1.currentTime = 0;
        }
    });

    // 全タイマー設定の終了を管理するフラグの変更を検知したとき
    isTimeUpAll.subscribe(flag => {
        if (audio2 === undefined) {
            return;
        }
        if (flag) {
            setAudio2Volume(isPlaySound);
            audio2.play();
        } else {
            audio2.pause();
            audio2.currentTime = 0;
        }
    });

    const setAudio2Volume = (flag: boolean): void => {
        audio2.volume = flag ? 1 : 0;
    };
</script>

<style>
    div {
        height: 32px;
        width: 150px;
    }

    p {
        line-height: 32px;
        cursor: pointer;
    }

    i {
        vertical-align: middle;
    }
</style>
