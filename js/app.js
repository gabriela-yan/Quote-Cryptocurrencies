const cryptoSelect = document.querySelector('#criptomonedas');
const currencySelect = document.querySelector('#moneda');
const form = document.querySelector('#formulario');

const objSearch = {
    moneda: '',
    criptomoneda: ''
}

// Create Promise
const getCrypto = cryptocurrencies => new Promise( resolve => {
    resolve(cryptocurrencies);
});

document.addEventListener('DOMContentLoaded', () => {
    consultCryptocurrencies();

    form.addEventListener('submit', submitForm);

    currencySelect.addEventListener('change', readValue);
    cryptoSelect.addEventListener('change', readValue);
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

function readValue(e){
    objSearch[e.target.name] = e.target.value;
    console.log(objSearch);
}

function submitForm(e) {

    e.preventDefault();

    // Validate
    const { moneda, criptomoneda } = objSearch;

    if(moneda === '' || criptomoneda === ''){
        showAlert('Ambos campos son obligatorios');
        return;
    }
}

function showAlert(message) {
    console.log(message);
}