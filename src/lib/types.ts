export interface Coin {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  price_change_percentage_24h: number
  price_change_24h: number
  market_cap: number
  total_volume: number
  high_24h: number
  low_24h: number
  sparkline_in_7d: {
    price: number[]
  }
}

export interface CryptoState {
  coins: Coin[]
  selectedCoin: Coin | null
  filter: 'all' | 'gainers' | 'losers'
  search: string
}