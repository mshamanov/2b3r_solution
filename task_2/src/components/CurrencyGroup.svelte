<script lang="ts">
    import type {Currency} from "../models/Currency";
    import CurrencyForm from "./CurrencyForm.svelte";
    import type {CurrencyAmount} from "../models/CurrencyAmount";
    import type {CurrencyFetchData} from "../models/CurrencyFetchData";
    import {CurrenciesStore} from "../stores/currencies";
    import {createEventDispatcher, onMount} from "svelte";

    const dispatch = createEventDispatcher();

    const usd: Currency =
        $CurrenciesStore.data.find(item => item.code === "USD")!;

    let fetchedData: CurrencyFetchData;
    let status: "pending" | "loading" | "error" | "success" = "pending";
    let swapClass = "";

    let primaryData: CurrencyAmount = {amount: 1, currency: usd};
    let secondaryData: CurrencyAmount = {amount: 1, currency: usd};

    $: rates = !fetchedData ? null :
        `1 ${primaryData.currency.code} = ${fetchedData.rates[secondaryData.currency.code]} ${secondaryData.currency.code}`;

    const primaryHandler = async (value: CurrencyAmount) => {
        primaryData = value;
        await loadPrimaryCurrencyData();
    }

    const secondaryHandler = (value: CurrencyAmount) => {
        const previousSecondaryCode = secondaryData.currency.code;
        const currentSecondaryCode = value.currency.code;
        secondaryData = value;

        if (currentSecondaryCode === previousSecondaryCode) {
            primaryData.amount =
                secondaryData.amount / fetchedData.rates[currentSecondaryCode];
        } else {
            secondaryData.amount =
                primaryData.amount * fetchedData.rates[currentSecondaryCode];
        }
    }

    const swapCurrencies = async () => {
        swapClass = "swap";

        [primaryData, secondaryData] = [secondaryData, primaryData];
        await loadPrimaryCurrencyData();

        setTimeout(() => swapClass = "", 1000);
    }

    async function loadPrimaryCurrencyData() {
        try {
            fetchedData = await fetchRatesFromApi(primaryData.currency);
            const code = secondaryData.currency.code;
            secondaryData.amount = primaryData.amount * fetchedData.rates[code];
        } catch (error) {
            status = "error";
            dispatch("show-error", error);
        }
    }

    const fetchRatesFromApi = async (currency: Currency) => {
        status = "loading";

        if (fetchedData && fetchedData["base_code"] === currency.code) {
            status = "success";
            return fetchedData;
        }

        const api = $CurrenciesStore.api;
        const fetchUrl = api.replace("{currencyId}", currency.code);
        const response = await fetch(fetchUrl);
        if (response.ok) {
            status = "success";
            return response.json();
        } else {
            throw Error(`Fetch data error: ${response.statusText} (status: ${response.status})`);
        }
    }

    onMount(async () => await loadPrimaryCurrencyData());
</script>

<div class="content">
    {#if rates}
        <div class="currency-rate-info">
            {rates}
        </div>
    {/if}
    <CurrencyForm amount={primaryData.amount.toFixed(2)}
                  selected={primaryData.currency}
                  onChange={primaryHandler} />
    <button type="button"
            disabled={status === "loading" || swapClass !== ""}
            class={`swap-btn ${status === "loading" ? "scale" : ""} ${swapClass}`}
            title="Swap currencies" aria-label="Swap currencies"
            on:click={swapCurrencies}>
        <svg xmlns="http://www.w3.org/2000/svg"
             width="50"
             height="50"
             fill="currentColor"
             class="bi bi-arrow-down-up"
             viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5" />
        </svg>
    </button>
    <CurrencyForm amount={secondaryData.amount.toFixed(2)}
                  selected={secondaryData.currency}
                  onChange={secondaryHandler} />
</div>

<style>
    .content {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        gap: 15px;
    }

    .currency-rate-info {
        font-size: 0.8rem;
        background-color: #646cff;
        color: #fff;
        padding: 0 20px;
        border-radius: 5px;
        margin-bottom: 15px;
    }

    .swap-btn {
        margin: 10px 0 15px;
        border: none;
        background: none;
    }

    .swap-btn:not(:disabled):hover {
        color: #535bf2;
        cursor: pointer;
    }

    .swap {
        animation: rotate-180-r 1s none;
    }

    .scale {
        animation: scale 0.5s infinite linear;
    }

    @keyframes rotate-180-r {
        to {
            transform-origin: 50% 47%;
            transform: rotate(180deg);
        }
    }

    @keyframes scale {
        33% {
            transform: scale(1.1);
            color: #747bff;
        }

        100% {
            transform: scale(0.9);
            color: #535bf2;
        }
    }
</style>