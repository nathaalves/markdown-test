import { useState } from "react";
import ReactMarkdown from "react-markdown"
import remarkGfm from 'remark-gfm'
import styled from "styled-components";
import Button from "./shared/Button";

export default function Note () {

    const [markdownText, setMarkdownText] = useState('');
    const [preview, setPreview] = useState(false);

    function handleMarkdownText (e) {
        const text = e.target.value;
        setMarkdownText(text)
    };
    
    return (
        <>
            <Title />
            {preview ? 
                <Preview children={markdownText} remarkPlugins={[remarkGfm]} /> 
            : 
                <MarkdownTextArea value={markdownText} onChange={handleMarkdownText} />
            }
            <MarkdownButton onClick={ () => setPreview(false)} >Markdown</MarkdownButton>
            <PreviewButton onClick={ () => setPreview(true)} >Preview</PreviewButton>
        </>
    );
};

const Title = styled.input`

    all: unset;

    width: 100vw;
    height: 100px;
    padding-left: 20px;
    background-color: azure;
`

const MarkdownTextArea = styled.textarea`
    all: unset;

    width: 100vw;
    height: calc(100vh - 100px);
    padding: 20px;
    padding-top: 0px;
    overflow-y: scroll;

    background-color: azure;
`;

const Preview = styled(ReactMarkdown)`
    width: 100vw;
    height: calc(100vh - 100px);
    padding: 20px;
    padding-top: 0px;
    overflow-y: scroll;
    background-color: azure;
`;

const MarkdownButton = styled(Button)`
    position: fixed;
    top: 20px;
    right: 150px;
`;

const PreviewButton = styled(Button)`
    position: fixed;
    top: 20px;
    right: 60px;
`;