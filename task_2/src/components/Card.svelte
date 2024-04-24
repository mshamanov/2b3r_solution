<script lang="ts">
    export let style = '';
</script>

<div class="card" style={style}>
    <slot></slot>
</div>

<style>
    .card {
        padding: 20px;
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        text-align: center;
    }
</style>