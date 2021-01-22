<div>
    <p on:click={onClick}>
        Sound <i class="fas fa-2x" class:fa-toggle-on={$isPlaySound} class:fa-toggle-off={!$isPlaySound}></i>
    </p>
</div>

<script lang="ts">
    import { isPlaySound } from '../../store';

    const onClick = () => {
        isPlaySound.set(!$isPlaySound);
    };
</script>

<style>
    div {
        height: 32px;
        width: 100px;
    }

    p {
        line-height: 32px;
        cursor: pointer;
    }

    i {
        vertical-align: middle;
    }
</style>
