// PlayablePay checkout config. Pick the network with ?net=<key> or change `active`.
// Mainnet is live. To change contract/service later, edit `bsc.contract` / `bsc.api`.
window.PLAYABLE_PAY_CONFIG = {
  active: "bsc",
  networks: {
    bsc: {
      label: "BNB Smart Chain", chainId: 56, rpc: "https://bsc-dataseed.bnbchain.org",
      explorer: "https://bscscan.com",
      usdt: "0x55d398326f99059fF775485246999027B3197955", // BSC-USD, 18 decimals
      contract: "0x6ee40eD93128db7022924980272101f9936bd334", // PlayablePay (deployed 2026-11-15, block 133684856)
      api: "https://198-200-43-220.sslip.io",                 // delivery service (VPS, Caddy HTTPS)
    },
    bscTestnet: {
      label: "BSC Testnet", chainId: 97, rpc: "https://bsc-testnet-rpc.publicnode.com",
      explorer: "https://testnet.bscscan.com",
      usdt: "",     // MockUSDT testnet address (fill after testnet deploy)
      contract: "", // PlayablePay testnet address (fill after testnet deploy)
      api: "",
    },
    local: { // anvil fork of BSC testnet used for the end-to-end run
      label: "Local anvil (BSC testnet fork)", chainId: 97, rpc: "http://127.0.0.1:8545",
      explorer: "",
      usdt: "__LOCAL_USDT__", contract: "__LOCAL_PAY__", api: "http://127.0.0.1:8787",
    },
  },
  games: [
    { id: "chroma-wells", name: "Chroma Wells — ball sort / 倒球分色" },
    { id: "bolt-haven",   name: "Bolt Haven — pin pull / 拔针解谜" },
    { id: "lumen-tiles",  name: "Lumen Tiles — match-3 / 三消" },
  ],
  tiers: [
    { id: 1, name: "Basic",    usd: 5, desc: "1 template, your store link, all ad networks" },
    { id: 2, name: "Standard", usd: 7, desc: "Basic + priority delivery" },
    { id: 3, name: "Premium",  usd: 9, desc: "Standard + commercial license" },
  ],
};
