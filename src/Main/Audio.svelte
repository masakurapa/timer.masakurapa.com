<audio src="/decision4.mp3" bind:this={audio1}></audio>
<audio src="/warning1.mp3" loop bind:this={audio2}></audio>

<script>
    import { isTimeUp, isTimeUpAll } from './store.js';

    let audio1;
    let audio2;

    isTimeUpAll.subscribe(flag => {
        if (audio2 === undefined) {
            return;
        }
        if (flag) {
            audio2.play();
        } else {
            audio2.pause();
            audio2.currentTime = 0;
        }
    });

    isTimeUp.subscribe(flag => {
        if (audio1 === undefined) {
            return;
        }
        if (!flag) {
            return;
        }
        audio1.play();
    });
</script>
