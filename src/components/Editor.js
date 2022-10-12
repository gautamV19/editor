import React, {useState} from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/css/css'
import 'codemirror/mode/javascript/javascript'
import {Controlled as ControlledEditor} from 'react-codemirror2'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCompressAlt, faExpandAlt} from '@fortawesome/free-solid-svg-icons'

export default function Editor(props) {
    const {
        displayName, 
        language,
        onChange,
        value
    } = props 
    const [open, setOpen] = useState(true)

    const handleChange = (data, editor, value) => {
        onChange(value)
    }

    return (
        <div className={`editor-container ${open ? '' : 'collapsed'}`}>
            <div className="editor-title">
                {displayName}
                <button className="expand-collapse-btn" type="button" onClick = {() => setOpen(prevOpen => !prevOpen)} >
                    <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt } />
                </button>
            </div>
            <ControlledEditor
                value = {value}
                onBeforeChange = {handleChange}
                className = "code-mirror-wrapper"
                options={{
                    mode:language,
                    lineNumbers:true,
                    lineWrapping:true,
                    lint:true,
                    theme:"material"
                }}
            />
        </div>
    )
}
