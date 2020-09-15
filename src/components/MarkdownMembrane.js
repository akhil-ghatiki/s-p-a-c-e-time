import React, { useState, useEffect,useRef,useCallback  } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import ReactMarkdown from 'react-markdown'

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    markdownText: {
        padding: 30
    }
}));

export default function MarkdownMembrane(props) {
    const classes = useStyles();

    const useResize = (myRef) => {
        const getWidth = useCallback(() => myRef.current.offsetWidth, [myRef]);
    
        const [width, setWidth] = useState(undefined);
    
        useEffect(() => {
            const handleResize = () => {
                setWidth(getWidth());
            };
    
            if (myRef.current) {
                setWidth(getWidth());
            }
    
            window.addEventListener('resize', handleResize);
    
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }, [myRef, getWidth]);
    
        return width && width > 25 ? width - 25 : width;
    };
    

  

    const [input, setInput] = useState('');
    useEffect(() => {
        fetch(props.markDownFilePath).then((response) => response.text()).then((text) => {
            setInput(text)
        })
    }, [props.markDownFilePath]);

    const divRef = useRef(null);
    const maxWidth = useResize(divRef);

    const renderers = {
        image: ({
            alt,
            src,
            title,
        }) => (
                <img
                    alt={alt}
                    src={src}
                    title={title}
                    style={{ maxWidth: maxWidth }} />
            ),
    };

    return (
        <div 
        ref={divRef}>
            <ReactMarkdown 
            source={input} 
            className={classes.markdownText} 
            renderers={renderers}
            maxWidth={maxWidth}>
            </ReactMarkdown>
        </div>
    );
}
