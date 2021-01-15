<input
    type="tel"
    bind:value={value}
    minlength="{minlength}"
    maxlength="{maxlength}"
    disabled={$isTimerStarting}
    on:change={onChange}
>

<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { isTimerStarting } from '../../store';

    export let value: number;
    export let min: number;
    export let max: number;
    export let minlength = 1;
    export let maxlength = 2;

    const dispatch = createEventDispatcher();

    const onChange = (e: any): void => {
        const val = parseInt(e.target.value, 10);
        if (isNaN(val)) {
            dispatch('change', { value: 0 });
            return;
        }

        let ret = val;
        if (val < min) {
            ret = min;
        } else if (val > max) {
            ret = max;
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
