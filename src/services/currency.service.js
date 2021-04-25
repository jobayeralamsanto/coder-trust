import axios from 'axios';

const API_URL = "https://85fbk9jy61.execute-api.us-east-1.amazonaws.com/Prod/";

const currencyList = () => {
    return axios.get(API_URL + 'currency-list');
}

const createCurrency = (Country, ConversionRate, CurrencyName, Status, Symbol, CreatedAt) => {
    return axios.post(API_URL + 'currency-add', JSON.stringify({ 
        "Country": Country,
        "ConversionRate": ConversionRate,
        "CurrencyName": CurrencyName,
        "Status": Status,
        "Symbol": Symbol,
        "CreatedAt": toString(CreatedAt)
     })
    )
}

const currencyDetails = (Id, Status) => {
    const url = API_URL + 'currency-details/' + Id + '/' + Status;
    return axios.get(url);
}

const deleteCurrency = (Id, Status) => {
    const url = API_URL + 'currency-delete/' + Id + '/' + Status;
    return axios.delete(url);
}

const updateCurrency = (UpdatedAt, Country, ConversionRate, CurrencyName, Status, Id, Symbol, CreatedAt) => {
    const obj = JSON.stringify({
        "UpdatedAt": UpdatedAt,
        "Country": Country,
        "ConversionRate": ConversionRate,
        "CurrencyName": CurrencyName,
        "Status": Status,
        "Id": Id,
        "Symbol": Symbol,
        "CreatedAt": CreatedAt
    });
    console.log(obj);
    return axios.post(API_URL + 'currency-update', obj);
}

export default {
    currencyList,
    createCurrency,
    currencyDetails,
    deleteCurrency,
    updateCurrency
}