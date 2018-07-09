export interface ExchangeRate {
    base: string;
    date: string;
    rates: {[id: string]: number }[];
}
