<script lang="ts">
    import Card from './Card.svelte';
</script>

<Card>
    <p class="copy">Developed by Mikhail Shamanov &copy;
        {new Date().getFullYear()}</p>
    <p class="copy">using <a href="https://www.exchangerate-api.com">Rates
        By Exchange Rate API</a></p>
</Card>

<style>
    .copy {
        font-size: 0.8rem;
    }
</style>