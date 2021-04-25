import React, { useEffect, useState } from 'react';
import { useHistory} from 'react-router-dom';
import currencyService from '../../services/currency.service';


function CreateEditCurrency({match}) {
    const history = useHistory();
    const [ currency, setCurrency ] = useState({});
    const [ edit, setEdit ] = useState(false);

    useEffect( () => {
        const Id = match.params.id;
        const Status = match.params.status;
        if(Id && Status){
            currencyService.currencyDetails(Id, Status)
            .then(response => {
                setCurrency(response.data);
            })
            .catch(err => {
                console.log(err.response);
            })
            setEdit(true);
        }
        else {
            let curr = {
                Country: "",
                ConversionRate: "",
                CurrencyName: "",
                Status: "",
                Symbol: "",
                CreatedAt: ""
            }
            setCurrency(curr);
        }
    }, [])


    const onChange = (e) => {
        const {name, value} = e.target;
        setCurrency(prevState => ({
            ...prevState,
            [name]:value
        }))
    }

    const onBack = () => {
        history.push({pathname: `/currencylist`})
    }

    const currentDate = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = mm + '-' + dd + '-' + yyyy;

        return today;
    }

    const onUpdate = () => {
        const today = currentDate();
        currencyService.updateCurrency(today, currency.Country, currency.ConversionRate, currency.CurrencyName, currency.Status, currency.Id, currency.Symbol, currency.CreatedAt)
        .then(response => {
            console.log(response.data);
        })
        .catch(err => {
            console.log(err.response);
        })
    }

    const onCreate = () => {
        const today = currentDate();
        
        currencyService.createCurrency(currency.Country, currency.ConversionRate, currency.CurrencyName, currency.Status, currency.Symbol, today)
        .then(response => {
            console.log(response.data);
        })
        .catch(err => {
            console.log(err.response);
        })
    }


    return (
        <div className="container border rounded">
            <div className="page-header d-flex justify-content-around pb-5 rounded">
                <h2 className="float-left">Currency State</h2>
            </div>
            <form>
                <div className="form-group">
                    <label className="pl-2"><strong>Country</strong></label>
                    <input onChange={(e) => onChange(e)} value={currency.Country} type="text" name="Country" className="form-control"  placeholder="" />
                </div>
                <div className="form-group">
                    <label className="pl-2"><strong>Conversion Rate</strong></label>
                    <input onChange={(e) => onChange(e)} value={currency.ConversionRate} type="text" name="ConversionRate" className="form-control"  placeholder="" />
                </div>
                <div className="form-group">
                    <label className="pl-2"><strong>Currency Name</strong></label>
                    <input onChange={(e) => onChange(e)} value={currency.CurrencyName} type="text" name="CurrencyName" className="form-control"  placeholder="" />
                </div>
                <div className="form-group">
                    <label className="pl-2"><strong>Status</strong></label>
                    <input onChange={(e) => onChange(e)} value={currency.Status} type="text" name="Status" className="form-control"  placeholder="" />
                </div>
                <div className="form-group">
                    <label className="pl-2"><strong>Symbol</strong></label>
                    <input onChange={(e) => onChange(e)} value={currency.Symbol} type="text" name="Symbol" className="form-control"  placeholder="" />
                </div>
            </form>
            <div className="d-flex mb-5 mt-5">
                <button onClick={() => onBack()} className="btn btn-secondary col-5 mr-2 ml-4">Back</button>
                {
                    edit ? <button onClick={() => onUpdate()} className="btn btn-warning col-5 mr-2 ml-5">Update</button> : <button onClick={() => {onCreate()}} className="btn btn-primary col-6 mr-2 ml-3">Create</button>
                }
            </div>
        </div>
    )
}

export default CreateEditCurrency;