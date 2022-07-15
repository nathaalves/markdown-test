import { useState } from "react";
import ReactMarkdown from "react-markdown"
import remarkGfm from 'remark-gfm'
import styled from "styled-components";
import Button from "./shared/Button";

import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'

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
                <Preview children={markdownText} remarkPlugins={[remarkGfm]} components={{
                    code({node, inline, className, children, ...props}) {
                      const match = /language-(\w+)/.exec(className || '')
                      return !inline && match ? (
                        <SyntaxHighlighter
                          children={String(children).replace(/\n$/, '')}
                          style={dark}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        />
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      )
                    }
                  }}/> 
            : 
                <MarkdownTextArea value={markdownText} onChange={handleMarkdownText} components={{
      code({node, inline, className, children, ...props}) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
          <SyntaxHighlighter
            children={String(children).replace(/\n$/, '')}
            style={dark}
            language={match[1]}
            PreTag="div"
            {...props}
          />
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        )
      }
    }}/>
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