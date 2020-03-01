<input
    type="tel"
    bind:value={value}
    minlength="1"
    maxlength="2"
    disabled={$isTimerStarting}
    on:change={onChange}
>

<script>
    import { createEventDispatcher } from 'svelte';
    import { isTimerStarting } from '../../store.js';

    export let value;

    const dispatch = createEventDispatcher();

    const MIN = 0;
    const MAX = 24;

    const onChange = (e) => {
        const val = parseInt(e.target.value, 10);
        if (isNaN(val)) {
            dispatch('change', { value: 0 });
            return;
        }

        let ret = val;
        if (val < MIN) {
            ret = MIN;
        } else if (val > MAX) {
            ret = MAX;
        }
        dispatch('change', { value: ret });
    };
</script>

<style>
    input {
        padding: 8px;
        height: 40px;
        text-align: center;
        width: 52px;
    }
    input:focus {
        outline: none;
    }
    input:disabled {
        background-color: #EEEEEE;
        color: #999999;
    }

    @media screen and (max-width: 480px) {
        input {
            width: 40px;
        }
    }
</style>
