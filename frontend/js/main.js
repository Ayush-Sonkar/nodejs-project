document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('http://localhost:5000/api/tickers');
  const data = await response.json();

  const coinImages = {
    btc: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=010',
    eth: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=010',
    xrp: 'https://cryptologos.cc/logos/xrp-xrp-logo.png?v=010',
    ltc: 'https://cryptologos.cc/logos/litecoin-ltc-logo.png?v=010',
    bnb: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png?v=010',
    usdt: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=010',
    doge: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png?v=010',
    ada: 'https://cryptologos.cc/logos/cardano-ada-logo.png?v=010',
    dot: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png?v=010',
    sol: 'https://cryptologos.cc/logos/solana-sol-logo.png?v=010',
    // Add more coin logos as needed
  };

  const tableBody = document.getElementById('ticker-table');
  data.forEach(ticker => {
    const row = document.createElement('tr');
    row.classList.add('bg-gray-800', 'border-b', 'border-gray-700');
    const coinImage = coinImages[ticker.base_unit] || 'https://cryptologos.cc/logos/placeholder.png?v=010';
    row.innerHTML = `
      <td class="px-4 py-2"><img src="${coinImage}" alt="${ticker.base_unit}" class="w-6 h-6 inline-block"></td>
      <td class="px-4 py-2">${ticker.name}</td>
      <td class="px-4 py-2">${ticker.last}</td>
      <td class="px-4 py-2">${ticker.buy}</td>
      <td class="px-4 py-2">${ticker.sell}</td>
      <td class="px-4 py-2">${ticker.volume}</td>
      <td class="px-4 py-2">${ticker.base_unit}</td>
    `;
    tableBody.appendChild(row);
  });
});
