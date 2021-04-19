/*import React, {useState, useEffect} from 'react';
import RichTextEditor from 'react-rte';
import {useHistory} from 'react-router-dom';*/

import React, {Component} from 'react';
import RichTextEditor from 'react-rte';
import PropTypes from 'prop-types';
// import { EditorState, convertToRaw } from "draft-js";

class EmailTemp extends Component {
  static propTypes = {
    onChange: PropTypes.func
  };

  state = {
    value: RichTextEditor.createEmptyValue()
  }

  onChange = (value) => {
    this.setState({value});
    console.log(value)
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onChange(
        value.toString('html')
      );
      // console.log(value.toString('html'));
    }
  };

  render () {
    const toolbarConfig = {
        // Optionally specify the groups to display (displayed in the order listed).
        display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
        INLINE_STYLE_BUTTONS: [
            {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
            {label: 'Italic', style: 'ITALIC'},
            {label: 'Underline', style: 'UNDERLINE'}
        ],
        BLOCK_TYPE_DROPDOWN: [
            {label: 'Normal', style: 'unstyled'},
            {label: 'Heading Large', style: 'header-one'},
            {label: 'Heading Medium', style: 'header-two'},
            {label: 'Heading Small', style: 'header-three'},
            {label: 'Code Block', style: 'code-block'}
        ],
        BLOCK_TYPE_BUTTONS: [
            {label: 'UL', style: 'unordered-list-item'},
            {label: 'OL', style: 'ordered-list-item'}
        ]
    };
    return (
    <div>
        <div className="col-md-9">
            <div className="box box-primary">
                <div className="box-header with-border">
                    <h3 className="box-title">Compose New Template</h3>
                </div>
                <div className="box-body">
                    <div className="form-group">
                        <input className="form-control" placeholder="To:"/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" placeholder="Subject:"/>
                    </div>
                    <div className="form-group">
                        <RichTextEditor placeholder="Body" toolbarConfig={toolbarConfig} value={this.state.value} onChange={this.onChange} />
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
}


/*function EmailTemp() {
    const [value, setValue] = useState(RichTextEditor.createEmptyValue()); 

    const history = useHistory();

    const onChange = (value) => {
        setValue({value});
        if (history.props.onChange) {
            history.props.onChange(
                value.toString('html')
            );
        }

        console.log(value);
    };

    return (
        <div>
            <div className="col-md-9">
          <div className="box box-primary">
            <div className="box-header with-border">
              <h3 className="box-title">Compose New Message</h3>
            </div>
            <div className="box-body">
              <div className="form-group">
                <input className="form-control" placeholder="To:"/>
              </div>
              <div className="form-group">
                <input className="form-control" placeholder="Subject:"/>
              </div>
              <div className="form-group">
                    <RichTextEditor value={value} onChange={onChange} />
              </div>
              <div className="form-group">
                <div className="btn btn-default btn-file">
                  <i className="fa fa-paperclip"></i> Attachment
                  <input type="file" name="attachment"/>
                </div>
                <p className="help-block">Max. 32MB</p>
              </div>
            </div>
            <div className="box-footer">
              <div className="pull-right">
                <button type="button" className="btn btn-default"><i className="fa fa-pencil"></i> Draft</button>
                <button type="submit" className="btn btn-primary"><i className="fa fa-envelope-o"></i> Send</button>
              </div>
              <button type="reset" className="btn btn-default"><i className="fa fa-times"></i> Discard</button>
            </div>
          </div>
        </div>
            
        </div>
        
    )
}
*/
export default EmailTemp
