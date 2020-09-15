import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import ReactMarkdown from 'react-markdown'

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    markdownText: {
        margin: 30
    }
}));

export default function MarkdownMembrane(props) {
    const classes = useStyles();
    const [input, setInput] = useState('');
    useEffect(() => {
        fetch(props.markDownFilePath).then((response) => response.text()).then((text) => {
            setInput(text)
        })
    },[props.markDownFilePath]);

    return (
        <div>
            <ReactMarkdown source = {input} className={classes.markdownText}>
            </ReactMarkdown>
        </div>
    );
}
