import axios from 'axios';

const API_URL = "https://tnzomo7wvk.execute-api.us-east-1.amazonaws.com/Prod/";

const tagList = () => {
    return axios.get(API_URL + "tag-list");
}

const tagDetails = (pk, sk) => {
    return axios.get(`${API_URL}tag-details/${pk}/${sk}`);
}

const createTag = (TagName) => {
    return axios.post(API_URL + 'tag-add', {TagName});
}

const updateTag = (SK, Status, PK, TagName) => {
    return axios.put(API_URL+'tag-update', {
        SK,
        Status,
        PK,
        TagName
    })
}

export default {
    tagList,
    tagDetails,
    createTag,
    updateTag
}