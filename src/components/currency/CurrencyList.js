import React, { useEffect, useState } from 'react';
import currencyService from '../../services/currency.service';
import { useHistory, Link } from 'react-router-dom';

function CurrencyList() {
    const [ currencyList, setCurrencyList] = useState([]);
    const history = useHistory();

    useEffect( () => {
        currencyService.currencyList()
        .then(response => {
            setCurrencyList(response.data);
        })
        .catch(err => {
            console.log(err.response);
        })
    }, []);

    const onEdit = (currency) => {
        history.push({pathname: `/currencylist/${currency.Id}/${currency.Status}`})
    }

    const onDelete = (currency) => {
        currencyService.deleteCurrency(currency.Id, currency.Status)
        .then(response =>{
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        })
    }


    return (
        <div>
            <nav className="navbar navbar-light bg-light justify-content-between">
                <h3 className="navbar-brand float-left">Currency Lists</h3>
                <button className="float-right btn btn-primary bg-dark">
                    <Link to="/currencylist/create-new">
                        create new
                    </Link>
                </button>
            </nav>
            <div className="container">
            {
                currencyList.map((currency, idx) =>(
                    <li key={idx} className="ml-3 mr-3 m-3 pt-3 row border-top border-left border-right radius">
                        <div className="col-8">
                            <label>
                                {currency.CurrencyName}
                            </label>
                        </div>
                        <div className="col-2">
                            <button onClick={() => onEdit(currency)} className="btn btn-primary col-11">edit</button>
                        </div>
                        <div className="col-2">
                            <button onClick={() => onDelete(currency)} className="btn btn-danger col-11">delete</button>
                        </div>
                    </li>
                ))
            }
            </div>
        </div>
    )
}

export default CurrencyList
