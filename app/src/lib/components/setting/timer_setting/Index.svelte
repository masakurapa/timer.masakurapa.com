<div class="remove-all-btn-wrapper" class:hide={disabled}>
    <button class="remove-all-btn" on:click="{onClickRemoveAll}">設定を初期化</button>
</div>

<div>
    <Share/>
    <Colors/>
    <Timer/>
</div>

<script lang="ts">
    import { isTimerRunning } from '$lib/store/timer';
    import { resetPersonalTimerSetting } from '$lib/store/setting';
    import { resetAll } from '$lib/store/storage';
    import { saveTimerSettingKey } from '$lib/storage';

    import Share from '$lib/components/setting/timer_setting/Share.svelte';
    import Colors from '$lib/components/setting/timer_setting/Colors.svelte';
    import Timer from '$lib/components/setting/timer_setting/Timer.svelte';

    /**
     * 全ての設定を削除します
     */
     const onClickRemoveAll = (): void => {
        if (!confirm('設定を初期化します。\nよろしいですか？')) {
            return;
        }

        resetAll();
        resetPersonalTimerSetting();
        saveTimerSettingKey('');
    }

    $: disabled = $isTimerRunning === true;
</script>

<style>
    .hide {
        display: none !important;
    }

    .remove-all-btn-wrapper {
        max-width: 800px;
        margin-bottom: 32px;
    }
    .remove-all-btn {
        color: #FFFFFF;
        background-color: #DC3545;
        border-bottom: 5px solid #AB013C;
        width: 200px;
    }
    .remove-all-btn:hover {
        background-color: #CB2434;
    }
    .remove-all-btn:disabled {
        background-color: #999999;
        border-bottom: 5px solid #666666;
        cursor: default;
    }

    @media (max-width: 500px) {
        .remove-all-btn {
            width: 150px;
            min-width: 150px;
        }
    }
</style>
