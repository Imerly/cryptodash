# CryptoDash 📈

Dashboard de criptomonedas en tiempo real con precios, gráficos y estadísticas de mercado.

## Demo

🔗 https://cryptodash-delta.vercel.app/

## ¿Qué hace?

Muestra los precios en tiempo real de las 20 principales criptomonedas con actualización automática cada 30 segundos. Incluye gráficos de precio de los últimos 7 días, filtros por tendencia y búsqueda en tiempo real.

## Stack

- **Next.js 15** — framework fullstack con App Router
- **TypeScript** — tipado estático
- **Recharts** — gráficos interactivos
- **CoinGecko API** — datos de mercado en tiempo real
- **Tailwind CSS + shadcn/ui** — estilos y componentes
- **Vercel** — deploy y hosting

## Features

- Precios en tiempo real de top 20 criptomonedas
- Gráfico de precio de los últimos 7 días
- Actualización automática cada 30 segundos
- Filtros por criptos en alza / en baja
- Búsqueda por nombre o símbolo
- Estadísticas globales de mercado
- Sparklines de tendencia en cada card

## Correr localmente

```bash
git clone https://github.com/Imerly/cryptodash.git
cd cryptodash
npm install
npm run dev
```

No requiere variables de entorno — la API es de CoinGecko.
