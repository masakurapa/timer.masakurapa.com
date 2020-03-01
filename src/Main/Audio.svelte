<audio src="/warning1.mp3" {loop} bind:this={audio}></audio>

<script>
    import { isTimeUp, isTimeUpAll } from './store.js';

    let audio;
    let loop = false;

    isTimeUpAll.subscribe(flag => {
        if (audio === undefined) {
            return;
        }

        loop = true;
        if (flag) {
            audio.play();
        } else {
            audio.pause();
            audio.currentTime = 0;
        }
    });

    isTimeUp.subscribe(flag => {
        if (audio === undefined) {
            return;
        }
        if (!flag) {
            return;
        }

        loop = false;
        audio.play();
    });
</script>
