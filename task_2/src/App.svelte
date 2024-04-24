<script lang="ts">
    import Card from "./components/Card.svelte";
    import CurrencyGroup from "./components/CurrencyGroup.svelte";
    import Copyright from "./components/Copyright.svelte";
    import Logo from "./components/Logo.svelte";
    import ErrorHandler from "./components/ErrorHandler.svelte";

    let error: Error | null = null;

    const onError = (event: { detail: Error }): void => {
        error = event.detail;
    }
</script>

<main>
    <Card>
        <Logo />
    </Card>
    <ErrorHandler {error} on:hide-error={() => error = null} />
    <Card>
        <CurrencyGroup on:show-error={onError} />
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
