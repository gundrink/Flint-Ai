# FlintAi

FlintAi is a coin on Solana mainnet. This repo is the site: a landing page, a Solana wallet, and the contract address. The coin is launched on pump.fun.

There is no 0G chain, no plugin catalog, and no on-site program. The only chain call that spends funds is Strike, and it waits for a wallet signature.

## What a person sees

The header and the footer share one mark:

- **$FLINTAI**, read from `site.ticker`
- X and Telegram, when those URLs are set
- A contract chip. Before launch it reads “Not struck yet”. After `NEXT_PUBLIC_CA` is set, a click copies the full address.
- The footer also says **Solana**

Connect opens Reown with the Solana adapter on mainnet only. A wallet on another cluster is asked to switch before Strike can send.

## Strike

1. The form takes a first buy in SOL (default 0) and a coin image.
2. Review shows the name FlintAi, the ticker, Solana mainnet, the first buy, and a priority fee of 0.00005 SOL.
3. Confirm stays off until a mainnet wallet is connected, Pinata is configured, and an image is attached.
4. The server uploads the image and metadata JSON to IPFS with `PINATA_JWT`.
5. The browser asks pump.fun’s local trade API for an unsigned create transaction.
6. The transaction is simulated. If that fails, nothing is sent.
7. The mint keypair signs in the tab. The wallet signs as the creator. A second simulation runs, then the transaction is sent.
8. The mint address is shown so it can be copied into `NEXT_PUBLIC_CA`.

The mint secret is not written to disk, env, or browser storage.

## Env

See the table in `README.md`. Cluster is mainnet because pump.fun coins live there.
