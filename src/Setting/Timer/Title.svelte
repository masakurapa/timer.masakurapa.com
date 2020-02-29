<input
    type="text"
    bind:value={value}
    disabled={$isTimerStarting}
    on:change={onChange}
>

<script>
    import { createEventDispatcher } from 'svelte';
    import { isTimerStarting } from '../../store.js';

    export let value;

    const dispatch = createEventDispatcher();

    const onChange = (e) => {
        const val = e.target.value;
        dispatch('change', { value: val });
    };
</script>

<style>
    input {
        padding: 8px;
        height: 40px;
        width: 100%;
    }
    input:focus {
        outline: none;
    }
</style>
