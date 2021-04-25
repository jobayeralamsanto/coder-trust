import axios from 'axios';

const API_URL = "https://jxrvyuttnf.execute-api.us-east-1.amazonaws.com/Prod/";

const templateList = () => {
    return axios.get(API_URL + 'templates');
}

const createTemplate = (TemplateName, Message, text, Subject, Datetime) => {
    return axios.post(API_URL + 'template-add', {
        TemplateName,
        Message,
        text,
        Subject,
        Datetime
    })
}

const templateDetails = (id, datetime) => {
    return axios.get(API_URL + 'template-details/' + id + '/' + datetime)
}

const deleteTemplate = (id, datetime, template) => {
    return axios.delete(API_URL + 'template-delete' + id + '/' + datetime + '/' + template)
}

const updateTemplate = (TemplateName, text, Message, Id, Datetime, Subject) => {
    return axios.post(API_URL + 'template-update', {
        TemplateName,
        text,
        Message,
        Id,
        Datetime,
        Subject
    })
}

export default {
    templateList,
    createTemplate,
    templateDetails,
    deleteTemplate,
    updateTemplate
}