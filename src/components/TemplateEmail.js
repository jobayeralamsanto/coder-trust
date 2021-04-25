import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import {Link} from 'react-router-dom';
import EmailService from './../services/email.service';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

var stateFromHTML = require('draft-js-import-html').stateFromHTML;

class TemplateEmail extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            editorState: EditorState.createEmpty(),
            template:{},
            edit: false,
        }
    }
    

    
    componentDidMount(){
        if (this.props.history.location.state){
            const template = this.props.history.location.state;
            this.setState({template: template, edit: true});
    
            // let value = ContentState.createFromText(`<div>${template.Message}</div>`);
            // const { editorState } = EditorState.createWithContent(value);
    
            
            const sont = stateFromHTML(template.Message.toString());
            const editorState = EditorState.createWithContent(sont);
            this.setState({editorState});
            console.log(this.state.edit)
        }
        else {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            today = mm + '-' + dd + '-' + yyyy;
            console.log(today);

            let template = {
                Datetime: today,
                Message: "",
                Subject: "",
                TemplateName: "",
                text: ""
            }
            this.setState({template});
        }
    }

    onEdit = () => {
        const {template} = this.state;
        if(window.confirm('Confirm to edit?')){
            EmailService.updateTemplate(template.TemplateName, template.text, template.Message, template.Id, template.Datetime, template.Subject)
            .then(response => {
                window.alert("success");
            })
            .catch(err => {
                console.log(err.response);
            })
        }
    }

    onCreate = () => {
        const {template} = this.state;
        if(window.confirm('Confirm to Create?')){
            EmailService.createTemplate(template.TemplateName, template.text, template.Message, template.Datetime, template.Subject)
            .then(response => {
                window.alert("Created");
            })
            .catch(err => {
                console.log(err.response);
            })
        }
    }

    onBack = () => {
        this.props.history.push({pathname:'/templatelist'});
    }

    onEditorStateChange = (editorState) => {
        console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
        this.setState({
        editorState,
        });
    };

    handleChange = (e) => {
        const { template } = this.state;
        template[e.target.name] = e.target.value;
        this.setState({template});
    }

  render() {
    const { editorState, template, edit } = this.state;
    console.log(this.state.edit);

    return (
        <div >
            <div className="col-md-9 border">
                <div className="box box-primary">
                    <div className="box-header with-border">
                        <h3 className="box-title">{edit ? 'Update Your' : 'Compose Your'} Template</h3>
                    </div>
                    <div className="box-body mt-3">
                        <div className="form-group">
                            <label>Template Name:</label>
                            <input onChange={(e) => {this.handleChange(e)}} name="TemplateName" className="form-control" value={template.TemplateName} placeholder="Template"/>
                        </div>
                        <div className="form-group">
                            <label>Subject:</label>
                            <input className="form-control" onChange={(e) => {this.handleChange(e)}} value={template.Subject} name="Subject" placeholder="Subject"/>
                        </div>
                        <div className="form-group">
                            <label>Text:</label>
                            <textarea cols="5" className="form-control" onChange={(e) => {this.handleChange(e)}} value={template.text} name="text" placeholder="Text"></textarea>
                        </div>
                        <div className="form-group">
                            <label>Body: </label>
                            <Editor
                                editorState={editorState}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={this.onEditorStateChange}
                                placeholder="Body"
                            />
                        </div>
                        <div className="form-group d-flex justify-content-around">
                            {
                                edit ? <button onClick={this.onEdit} className="btn btn-warning">Update</button> : <button onClick={this.onCreate} className="btn btn-primary">Create</button>}
                            <button onClick={this.onBack} className="btn btn-secondary">Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default TemplateEmail;