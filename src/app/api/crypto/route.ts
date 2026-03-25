import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=24h',
      {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 30 }
      }
    )

    if (!response.ok) {
      throw new Error('Error fetching crypto data')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error al obtener datos' }, { status: 500 })
  }
}