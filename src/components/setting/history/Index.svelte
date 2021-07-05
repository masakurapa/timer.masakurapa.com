<div class="wrapper">
    <h3>Local Settings</h3>
    <div>
    {#each localSettings as data (data.id)}
        <div class="setting-row">
            <div class="icon-text-wrapper">
                <div class="using-mark-wrapper">
                    {#if using === data.id}
                        <i class="fas fa-check-circle fa-2x"></i>
                    {/if}
                </div>
                <div class="setting-name-wrapper">{data.name}</div>
            </div>
            <div class="btn-wrapper">
                <button class="load-btn">Load</button>
                <div class="trash-btn-wrapper">
                    <i class="fas fa-trash-alt fa-2x"></i>
                </div>
            </div>
        </div>
    {/each}
    </div>
</div>

<div class="wrapper">
    <h3>Shared Settings</h3>
    <div>
    {#each sharedSettings as data (data.id)}
        <div class="setting-row">
            <div class="icon-text-wrapper">
                <div class="using-mark-wrapper">
                    {#if using === data.id}
                        <i class="fas fa-check-circle fa-2x"></i>
                    {/if}
                </div>
                <div class="owner-mark-wrapper">
                    {#if data.owner}
                        <i class="fas fa-user-edit fa-2x"></i>
                    {:else}
                        <i class="fas fa-history fa-2x"></i>
                    {/if}
                </div>
                <div class="setting-name-wrapper">{data.name}</div>
            </div>
            <div class="btn-wrapper">
                <button class="load-btn">Load</button>
                <button class="copy-btn">Copy URL</button>
                <div class="trash-btn-wrapper">
                    <i class="fas fa-trash-alt fa-2x"></i>
                </div>
            </div>
        </div>
    {/each}
    </div>
</div>

<script lang="ts">
    const using = '1';

    const localSettings = [
        {id: '1', name: 'Setting1'},
        {id: '2', name: 'Setting2'},
        {id: '3', name: 'Setting3'},
    ];
    const sharedSettings = [
        {id: '4', name: 'Setting4', owner: true},
        {id: '5', name: 'Setting5', owner: false},
        {id: '6', name: 'Setting6', owner: true},
    ];
</script>

<style>
    .wrapper {
        margin-bottom: 32px;
        max-width: 600px;
    }

    .setting-row {
        display: flex;
        min-height: 50px;
        border: 1px solid #000000;
        padding: 12px;
    }
    .setting-row:first-child {
        border-radius: 8px 8px 0 0;
    }
    .setting-row:not(:first-child) {
        border-top: none;
    }
    .setting-row:last-child {
        border-radius: 0 0 8px 8px;
    }

    .icon-text-wrapper {
        display: flex;
        align-items: center;
    }

    .using-mark-wrapper {
        width: 32px;
        margin-right: 12px;
        color: #00AE95;
    }
    .owner-mark-wrapper {
        width: 32px;
        margin-right: 12px;
        color: #87ceeb;
    }
    .setting-name-wrapper {
        margin-right: 12px;
        word-break: break-all;
    }

    .btn-wrapper {
        display: flex;
        margin-left: auto;
        align-items: center;
    }
    .trash-btn-wrapper {
        cursor: pointer;
        color: #DC143C;
    }

    .load-btn {
        background-color: #FFFFFF;
        color: #000000;
        width: 60px;
        height: 40px;
        margin-right: 12px;
    }
    .copy-btn {
        background-color: #FFFFFF;
        color: #000000;
        width: 80px;
        height: 40px;
        margin-right: 12px;
    }

    button:hover {
        background-color: #DDDDDD;
    }
    button:disabled {
        background-color: #999999;
        cursor: default;
    }

    @media (max-width: 500px) {
        .setting-row {
            display: block;
        }
        .icon-text-wrapper {
            margin-bottom: 12px;
        }
        .btn-wrapper {
            justify-content: flex-end;
        }
    }
</style>
