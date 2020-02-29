<button
    on:click="{onClick}"
    disabled={!$isTimeUp}
>STOP SOUND</button>

<script>
    import { isTimeUp } from './store.js';

    const onClick = () => {
        isTimeUp.set(false);
    };
</script>

<style>
    button {
        padding: 8px;
        height: 40px;
        border-radius: 8px;
        border: none;
        outline: none;
        color: #FFFFFF;
        width: 200px;
        height: 50px;
        background-color: #1E90FF;
    }
    button:disabled {
        background-color: #999999;
    }
    button:forcus {
        background-color: #1872CC;
    }
    button:hover {
        background-color: #1872CC;
    }
    button:not(:disabled):active {
        background-color: #1872CC;
    }
</style>
