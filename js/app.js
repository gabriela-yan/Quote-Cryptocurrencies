const cryptoSelect = document.querySelector('#criptomonedas');
const currencySelect = document.querySelector('#moneda');
const form = document.querySelector('#formulario');
const result = document.querySelector('#resultado');

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
    // URL of Toplist by Market Cap Full Data
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
    // console.log(objSearch);
}

function submitForm(e) {

    e.preventDefault();

    // Validate
    const { moneda, criptomoneda } = objSearch;

    if(moneda === '' || criptomoneda === ''){
        showAlert('Ambos campos son obligatorios');
        return;
    }

    //Consul API
    consultAPI();
}

function showAlert(message) {
    const existError = document.querySelector('.error');

    if(!existError){
        const divMessage = document.createElement('div');

        divMessage.classList.add('error');
        divMessage.textContent = message;

        form.appendChild(divMessage);

        setTimeout(() => {
            divMessage.remove();
        },3000);
    }
}

function consultAPI() {
    const { moneda, criptomoneda } = objSearch;
    // URL of Multiple Symbols Full Data
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    spinner();

    fetch(url)
        .then(response => response.json())
        .then(data => showQuoteHTML(data.DISPLAY[criptomoneda][moneda]));

}

function showQuoteHTML(quote) {

    cleanHTML();

    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE} = quote;

    const price = document.createElement('p');
    price.classList.add('precio');
    price.innerHTML = `El precio es: <span>${PRICE}</span>`;

    const highPrice = document.createElement('p');
    highPrice.innerHTML = `Precio más alto del día <span>${HIGHDAY}</span>`;

    const lowPrice = document.createElement('p');
    lowPrice.innerHTML = `Precio más bajo del día <span>${LOWDAY}</span>`;

    const lastHours = document.createElement('p');
    lastHours.innerHTML = `Variación de las últimas 24 horas <span>${CHANGEPCT24HOUR}%</span>`;

    const lastUpdate = document.createElement('p');
    lastUpdate.innerHTML = `Última actualización <span>${LASTUPDATE}</span>`;

    result.appendChild(price);
    result.appendChild(highPrice);
    result.appendChild(lowPrice);
    result.appendChild(lastHours);
    result.appendChild(lastUpdate);
}

function cleanHTML() {
    while(result.firstChild){
        result.removeChild(result.firstChild);
    }
}

function spinner(){
    cleanHTML();

    const spinner = document.createElement('div');
    spinner.classList.add('spinner');

    spinner.innerHTML = `
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    `;

    result.appendChild(spinner);
}