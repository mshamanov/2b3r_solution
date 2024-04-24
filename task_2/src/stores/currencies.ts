import {readable} from "svelte/store";
import currenciesData from "./currencies.json";

export const CurrenciesStore = readable({
    api: "https://open.er-api.com/v6/latest/{currencyId}",
    data: currenciesData,
});