<div class="wrapper">
    <h3>Local Settings</h3>
    {#each localSettings as data (data.id)}
        <div class="setting-row">
            <div class="using-mark-wrapper">
                {#if using === data.id}
                    <i class="fas fa-check-circle fa-2x"></i>
                {/if}
            </div>
            <div class="setting-name-wrapper">{data.name}</div>
            <div class="btn-wrapper">
                <div class="load-btn-wrapper">
                    <button class="load-btn">Load</button>
                </div>
                <div class="trash-btn-wrapper">
                    <i class="fas fa-trash-alt fa-2x"></i>
                </div>
            </div>
        </div>
    {/each}
</div>


<script lang="ts">
    const using = '1';

    const localSettings = [
        {id: '1', name: 'Setting1'},
        {id: '2', name: 'Setting2'},
        {id: '3', name: 'Setting3'},
    ];
    const sharedSettings = [
        {id: '4', name: 'Setting1', owner: true},
        {id: '5', name: 'Setting2', owner: false},
        {id: '6', name: 'Setting3', owner: true},
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
        align-items: center;
        border: 1px solid #000000;
        padding: 12px;
    }

    .using-mark-wrapper {
        width: 32px;
        margin-right: 12px;
        color: #00AE95;
    }
    .setting-name-wrapper {
        margin-right: 12px;
        word-break: break-all;
    }

    .btn-wrapper {
        display: flex;
        margin-left: auto;
    }
    .load-btn-wrapper {
        margin-right: 12px;
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
    }
    .load-btn:hover {
        background-color: #DDDDDD;
    }
    .load-btn:disabled {
        background-color: #999999;
        cursor: default;
    }

</style>
