import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


class TemplateEmail extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  }

  onEditorStateChange = (editorState) => {
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
        <div>
            <div className="col-md-9 border">
                <div className="box box-primary">
                    <div className="box-header with-border">
                        <h3 className="box-title">Compose New Template</h3>
                    </div>
                    <div className="box-body">
                        <div className="form-group">
                            <input className="form-control" placeholder="Template:"/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" placeholder="Subject:"/>
                        </div>
                        <div className="form-group">
                        <Editor
                            editorState={editorState}
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            onEditorStateChange={this.onEditorStateChange}
                            placeholder="Body"
                        />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default TemplateEmail;