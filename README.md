# FlintAi

FlintAi is the same plugin marketplace, on Solana. Browse plugins, publish one, and open the publisher dashboard. The wallet is Solana, through Reown AppKit.

The coin itself is created on [pump.fun](https://pump.fun) from `/app`. The header and the footer show **$FLINTAI**, X, Telegram, and the contract address.

The wallet is Solana mainnet only, through Reown AppKit. Email and social login are off. X and Telegram are links in the header and the footer, next to the **$FLINTAI** ticker.

## Pages

| Page | What it does |
| --- | --- |
| `/` | Landing |
| `/connect` | Connect a Solana wallet |
| `/app` | Balance and pump.fun link once `NEXT_PUBLIC_CA` is set. Before that, Strike. |

Strike shows a summary first: name, ticker, mainnet, first buy, and priority fee. The transaction is sent only after you confirm and the wallet signs. The mint keypair is created in the tab for that signature and is not stored.

## Setup

```bash
pnpm install
cp apps/web/.env.example apps/web/.env.local
pnpm dev
```

Public env:

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_REOWN_PROJECT_ID` | Reown project id. Connect stays disabled until this is set. |
| `NEXT_PUBLIC_SOLANA_RPC_URL` | Solana mainnet RPC. Defaults to the public mainnet endpoint. |
| `NEXT_PUBLIC_CA` | Contract address. Empty until the coin is struck. |
| `NEXT_PUBLIC_X_URL` | X profile. Hidden when empty. |
| `NEXT_PUBLIC_TELEGRAM_URL` | Telegram. Hidden when empty. |
| `NEXT_PUBLIC_APP_URL` | Site URL written into token metadata. |

`PINATA_JWT` stays on the server. It uploads the coin image and metadata to IPFS. Do not put it in a `NEXT_PUBLIC_` variable.

After a successful strike, copy the mint into `NEXT_PUBLIC_CA` and restart the app. The header chip then shows the address, and `/app` links to pump.fun.
