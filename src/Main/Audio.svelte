<audio src="/warning1.mp3" loop bind:this={audio}></audio>

<script>
    import { isTimeUp } from './store.js';

    let audio;

    isTimeUp.subscribe(flag => {
        if (audio === undefined) {
            return;
        }
        if (flag) {
            audio.play();
        } else {
            audio.pause();
            audio.currentTime = 0;
        }
    });
</script>
