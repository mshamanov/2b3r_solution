<script lang="ts">
    import type {Currency} from "../models/Currency";
    import CurrencyForm from "./CurrencyForm.svelte";
    import type {CurrencyAmount} from "../models/CurrencyAmount";
    import type {CurrencyFetchData} from "../models/CurrencyFetchData";
    import {CurrenciesStore} from "../stores/currencies";
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

    const usd: Currency =
        $CurrenciesStore.data.find(item => item.code === "USD")!;

    let fetchedData: CurrencyFetchData | null = null;
    let status: "pending" | "loading" | "error" | "success" = "pending";

    let primaryData: CurrencyAmount = {amount: 1, currency: usd};
    let secondaryData: CurrencyAmount = {amount: 1, currency: usd};

    $: rates = !fetchedData ? null :
        `1 ${primaryData.currency.code} = ${fetchedData.rates[secondaryData.currency.code]} ${secondaryData.currency.code}`;

    const primaryHandler = (value: CurrencyAmount) => {
        primaryData = value;

        fetchCurrencyData(primaryData.currency).then(data => {
            fetchedData = data;
            const currId = secondaryData.currency.code;
            if (fetchedData) {
                secondaryData.amount = primaryData.amount * fetchedData.rates[currId];
            }
        });
    }

    const secondaryHandler = (value: CurrencyAmount) => {
        let oldSecondaryData = secondaryData;
        secondaryData = value;

        if (fetchedData === null) {
            fetchCurrencyData(primaryData.currency).then(data => {
                fetchedData = data;
                if (fetchedData) {
                    const currId = secondaryData.currency.code;
                    primaryData.amount = secondaryData.amount / fetchedData.rates[currId];
                }
            });
        } else if (oldSecondaryData.currency.code === secondaryData.currency.code) {
            const currId = secondaryData.currency.code;
            primaryData.amount = secondaryData.amount / fetchedData.rates[currId];
        } else {
            const currId = secondaryData.currency.code;
            secondaryData.amount = primaryData.amount * fetchedData.rates[currId];
        }
    }

    const fetchCurrencyData = async (currency: Currency) => {
        status = "loading";

        if (fetchedData && fetchedData["base_code"] === currency.code) {
            status = "success";
            return fetchedData;
        }

        const api = $CurrenciesStore.api;
        const fetchUrl = api.replace("{currencyId}", currency.code);
        try {
            const response = await fetch(fetchUrl);
            if (response.ok) {
                status = "success";
                return response.json();
            } else {
                throw Error(`Fetch data error: ${response.statusText} (status: ${response.status})`);
            }
        } catch (error) {
            status = "error";
            dispatch("show-error", error);
        }
    }
</script>

<div class="content">
    {#if rates}
        <div class="currency-rate-info">
            {rates}
        </div>
    {/if}
    <CurrencyForm amount={primaryData.amount.toString()}
                  selected={primaryData.currency}
                  onChange={primaryHandler} />
    <div class={`arrows ${status === "loading" ? "scale" : ""}`}>
        <svg xmlns="http://www.w3.org/2000/svg"
             width="50"
             height="50"
             fill="currentColor"
             class="bi bi-arrow-down-up"
             viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5" />
        </svg>
    </div>
    <CurrencyForm amount={secondaryData.amount.toString()}
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


    .spin {
        animation: spin 1s infinite linear;
    }

    .scale {
        animation: scale 0.5s infinite linear;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
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