const cryptoSelect = document.querySelector('#criptomonedas');

// Create Promise
const getCrypto = cryptocurrencies => new Promise( resolve => {
    resolve(cryptocurrencies);
});

document.addEventListener('DOMContentLoaded', () => {
    consultCryptocurrencies();
});

function consultCryptocurrencies() {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

    fetch(url)
        .then(response => response.json())
        .then(data => getCrypto(data.Data))
        .then( cryptocurrencies => cryptocurrenciesSelect(cryptocurrencies))
}

function cryptocurrenciesSelect(cryptocurrencies) {
    cryptocurrencies.forEach( crypto => {
        const { FullName, Name } = crypto.CoinInfo;
        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;

        cryptoSelect.appendChild(option);
    })
}