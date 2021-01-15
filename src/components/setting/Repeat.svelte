<div class="wrapper">
    <div class="label">Repeat Count</div>
    <div>
        <NumberBox
            value={$repeat}
            min="{0}"
            max="{100}"
            maxlength="{3}"
            on:change={e => onChange(e)}
        />
    </div>
</div>

<script lang="ts">
    import { repeat } from '../../store';
    import NumberBox from './NumberBox.svelte';

    const onChange = (e: any): void => {
        repeat.set(e.detail.value);
    };
</script>

<style>
    .wrapper {
        margin: 0 0 20px 32px;
    }
    .label {
        display: block;
        font-weight: bold;
        margin-bottom: 8px;
    }
</style>
