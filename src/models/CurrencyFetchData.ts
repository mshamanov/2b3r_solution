import currencies from "../stores/currencies.json";

export type CurrencyFetchData = {
    base_code: string;
    result: string;
    rates: { [key: string]: number }
}