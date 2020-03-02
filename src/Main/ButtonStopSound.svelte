<button
    on:click="{onClick}"
    disabled={!$isTimeUpAll}
>STOP SOUND</button>

<script>
    import {
        isTimeUpAll,
    } from '../store.js';

    const onClick = () => {
        isTimeUpAll.set(false);
    };
</script>

<style>
    button {
        padding: 8px;
        height: 40px;
        border: none;
        outline: none;
        color: #FFFFFF;
        width: 200px;
        height: 50px;
        background-color: #3CB371;
    }
    button:disabled {
        background-color: #999999;
    }
    button:forcus {
        background-color: #349961;
    }
    button:not(:disabled):hover {
        background-color: #349961;
    }
    button:not(:disabled):active {
        background-color: #349961;
    }

    @media screen and (max-width: 480px) {
        button {
            width: 150px;
            height: 40px;
        }
    }
</style>
