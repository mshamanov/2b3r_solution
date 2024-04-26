<script lang="ts">
    import type {Currency} from "../models/Currency";
    import type {ChangeEventHandler} from "svelte/elements";
    import {CurrenciesStore} from "../stores/currencies";
    import type {CurrencyAmount} from "../models/CurrencyAmount";

    const currencies: Currency[] = $CurrenciesStore.data;

    export let onChange: (value: CurrencyAmount) => void;
    export let amount: string = "0";
    export let selected: Currency;

    const handleChange = () => {
        onChange({
            amount: Number(amount),
            currency: selected
        });
    }

    $: amount = trimByPattern(amount);

    function trimByPattern(amount: string) {
        return amount.replace(/[^0-9.]/g, '').replace(/(\.\d{1,5}).*|(\.)\.+/g, "$1$2");
    }

    const handleSelect: ChangeEventHandler<HTMLSelectElement> = (e) => {
        const val = (e.target as HTMLInputElement).value;
        const newSelected = currencies.find(item => item.code === val);

        if (!newSelected) {
            return;
        }

        selected = newSelected;
        handleChange();
    };

    let timeoutId: number | undefined = undefined;

    const inputHandler: ChangeEventHandler<HTMLInputElement> = () => {
        clearTimeout(timeoutId);

        if (!isFinite(Number(amount))) {
            return;
        }

        timeoutId = setTimeout(() => handleChange(), 1200);
    };
</script>

<div class="input-group">
    <label class="currency-label" for="amount">{selected.description}
        ({selected.country})</label>
    <input id="amount" type="text" inputmode="decimal" bind:value={amount}
           placeholder="0" min="0"
           pattern="[0-9.]*" on:input={inputHandler} />
    <select on:change={handleSelect}>
        {#each currencies as item (item.code)}
            <option value={item.code}
                    selected={selected.code === item.code}
                    title={item.description}
                    aria-label={item.description}
            >{item.code}</option>
        {/each}
    </select>
</div>

<style>
    .currency-label {
        position: absolute;
        top: -12px;
        font-size: 0.75rem;
        background: var(--background-color);
        border-radius: 5px;
        padding: 3px 10px;
    }

    .input-group {
        width: 100%;
        display: flex;
        position: relative;
        align-items: center;
        justify-content: space-between;
        padding: 15px 10px;
        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, 0.5);
    }

    input {
        flex-grow: 1;
        border: none;
        font-size: 16px;
        font-weight: bold;
        background: none;
    }

    input:focus {
        outline: none;
    }

    select {
        border: none;
        font-size: 16px;
        padding: 10px;
        border-radius: 5px;
    }
</style>