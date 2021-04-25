import React, { useEffect, useState } from 'react';
import tagService from '../../services/tag.service';
import { useHistory, Link } from 'react-router-dom';

function TagList() {
    const [ tagList, setTagList] = useState([]);
    const history = useHistory();

    useEffect( () => {
        tagService.tagList()
        .then(response => {
            setTagList(response.data);
        })
        .catch(err => {
            console.log(err.response);
        })
    }, []);

    const onEdit = (tag) => {
        history.push({pathname: `/taglist/${tag.PK}/${tag.SK}`})
    }


    return (
        <div>
            <nav className="navbar navbar-light bg-light justify-content-between">
                <h3 className="navbar-brand float-left">Currency Lists</h3>
                <button className="float-right btn btn-primary bg-dark">
                    <Link to="/taglist/create-new">
                        create new
                    </Link>
                </button>
            </nav>
            <div className="container">
            {
                tagList.map((tag, idx) =>(
                    <li key={idx} className="ml-3 mr-3 m-3 pt-3 row border-top border-left border-right radius">
                        <div className="col-8">
                            <label>
                                {tag.TagName}
                            </label>
                        </div>
                        <div className="col-2">
                            <button onClick={() => onEdit(tag)} className="btn btn-primary col-11">edit</button>
                        </div>
                    </li>
                ))
            }
            </div>

        </div>
    )
}

export default TagList;
