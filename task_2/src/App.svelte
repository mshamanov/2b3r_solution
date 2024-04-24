<script lang="ts">
    import Card from "./components/Card.svelte";
    import CurrencyGroup from "./components/CurrencyGroup.svelte";
    import Copyright from "./components/Copyright.svelte";
    import Logo from "./components/Logo.svelte";
</script>

<main>
    <Card>
        <Logo />
    </Card>
    <Card>
        <CurrencyGroup />
    </Card>
    <Copyright />
</main>

<style>
    main {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 2rem;
    }
</style>
