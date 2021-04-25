import React, {useState, useEffect} from 'react';
import EmailService from './../services/email.service';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function TemplateList() {
    const history = useHistory();
    const [emailList, setEmailList] = useState([]);

    useEffect(() => {
        EmailService.templateList()
        .then(response => {
            setEmailList(response.data);
            console.log(response.data);

        })
    }, []);

    const onDelete = (value) => {
        if (window.confirm('Confirm to delete?')){
            EmailService.deleteTemplate(value.Id, value.Datetime)
            .then(response => {
                window.alert("success")
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    const editTemplate = (value) => {
        history.push({pathname:`/templatelist/${value.Id}`, state:value})
        console.log(value);
    }

    const onCreate = () => {
        history.push({pathname:`/templatelist/create-new`})
    }

    return (
        <div className="container-fluid">
            <div className="page-header d-flex justify-content-around pb-5 bg-secondary rounded">
                <h1 className="mt-5">Template Email List</h1>
                <div className="row mt-5">
                    <button onClick={() => onCreate()} className="btn btn-primary block">Create New</button>
                </div>
            </div>
            
            <div className="row justify-content-center">
                {
                    emailList.map((value, index) => (
                        <div className="card col-sm-4 col-md-3 col-lg-2 m-4 rounded">
                            <h5 className="card-header">{value.TemplateName}</h5>
                            <div className="card-body">
                                <p className="card-text">{value.text.slice(0, 20)}{'...'}</p>
                            </div>
                            <div className="row justify-content-around">
                                <button onClick={() => editTemplate(value)} className="btn text-primary">edit</button>
                                <button onClick={() => onDelete(value)} className="btn text-danger">delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default TemplateList;
