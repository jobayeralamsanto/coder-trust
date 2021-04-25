import React, { useEffect, useState } from 'react';
import { useHistory} from 'react-router-dom';
import tagService from '../../services/tag.service';


function CreateEditTag({match}) {
    const history = useHistory();
    const [ tag, setTag ] = useState({});
    const [ edit, setEdit ] = useState(false);

    useEffect( () => {
        const PK = match.params.pk;
        const SK = match.params.sk;
        if(PK && SK){
            tagService.tagDetails(PK, SK)
            .then(response => {
                setTag(response.data);
                console.log(response.data);
            })
            .catch(err => {
                console.log(err.response);
            })
            setEdit(true);
        }
        else {
            let tag = {
                TagName: ''
            }
            setTag(tag);
        }
    }, [])


    const onChange = (e) => {
        const {name, value} = e.target;
        setTag(prevState => ({
            ...prevState,
            [name]:value
        }))
    }

    const onBack = () => {
        history.push({pathname: `/taglist`})
    }


    const onUpdate = () => {
        tagService.updateTag(tag.SK, tag.Status, tag.PK, tag.TagName)
        .then(response => {
            console.log(response.data);
        })
        .catch(err => {
            console.log(err.response);
        })
    }

    const onCreate = () => {
        
        tagService.createTag(tag.TagName)
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
                <h2 className="float-left">Tag</h2>
            </div>
            <form>
                <div className="form-group">
                    <label className="pl-2"><strong>Tag Name</strong></label>
                    <input onChange={(e) => onChange(e)} value={tag.TagName} type="text" name="TagName" className="form-control"  placeholder="" />
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

export default CreateEditTag;