<audio src="/decision4.mp3" bind:this={audio1}><track kind="captions"/></audio>
<audio src="/warning1.mp3" loop bind:this={audio2}><track kind="captions"/></audio>

<script lang="ts">
    import {
        isTimeUp,
        isTimeUpAll,
        isPlaySound,
    } from '../../store.js';

    let audio1: HTMLMediaElement;
    let audio2: HTMLMediaElement;

    isPlaySound.subscribe(flag => {
        if (audio2 === undefined) {
            return;
        }
        setAudio2Volume(flag);
    });

    isTimeUpAll.subscribe(flag => {
        if (audio2 === undefined) {
            return;
        }
        if (flag) {
            setAudio2Volume($isPlaySound);
            audio2.play();
        } else {
            audio2.pause();
            audio2.currentTime = 0;
        }
    });

    isTimeUp.subscribe(flag => {
        if (audio1 === undefined || !$isPlaySound) {
            return;
        }
        if (flag) {
            audio1.play();
        } else {
            audio1.pause();
            audio1.currentTime = 0;
        }
    });

    const setAudio2Volume = (flag: boolean): void => {
        audio2.volume = flag ? 1 : 0;
    };
</script>
