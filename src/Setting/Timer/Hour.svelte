<input
    type="number"
    bind:value={value}
    min="{MIN}"
    max="{MAX}"
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
        const val = e.target.value;
        if (typeof val === 'string' && val.length === 0) {
            dispatch('change', { value: val });
            return;
        }

        const nval = parseInt(val, 10);
        let ret = nval;
        if (nval < MIN) {
            ret = MIN;
        } else if (nval > MAX) {
            ret = MAX;
        }

        dispatch('change', { value: ret });
    };
</script>

<style>
    input {
        padding: 8px;
        height: 40px;
        border-radius: 8px;
        text-align: center;
    }
    input:focus {
        outline: none;
    }
</style>
