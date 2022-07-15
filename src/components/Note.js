import { useState } from "react";
import ReactMarkdown from "react-markdown"
import remarkGfm from 'remark-gfm'
import styled from "styled-components";
import Button from "./shared/Button";
import { Prism } from 'react-syntax-highlighter'
import {dark, a11yDark, vs} from 'react-syntax-highlighter/dist/esm/styles/prism'

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
                        <Prism
                          children={String(children).replace(/\n$/, '')}
                          style={vs}
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
                  }}
                /> 
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

/* code highlighter Style 

a11yDark
a11yLight
agate
anOldHope
androidstudio
arduinoLight
arta
ascetic
atelierCaveDark
atelierCaveLight
atelierDuneDark
atelierDuneLight
atelierEstuaryDark
atelierEstuaryLight
atelierForestDark
atelierForestLight
atelierHeathDark
atelierHeathLight
atelierLakesideDark
atelierLakesideLight
atelierPlateauDark
atelierPlateauLight
atelierSavannaDark
atelierSavannaLight
atelierSeasideDark
atelierSeasideLight
atelierSulphurpoolDark
atelierSulphurpoolLight
atomOneDarkReasonable
atomOneDark
atomOneLight
brownPaper
codepenEmbed
colorBrewer
darcula
dark
defaultStyle
docco
dracula
far
foundation
githubGist
github
gml
googlecode
gradientDark
gradientLight
grayscale
gruvboxDark
gruvboxLight
hopscotch
hybrid
idea
irBlack
isblEditorDark
isblEditorLight
kimbieDark
kimbieLight
lightfair
lioshi
magula
monoBlue
monokaiSublime
monokai
nightOwl
nnfxDark
nnfx
nord
obsidian
ocean
paraisoDark
paraisoLight
pojoaque
purebasic
qtcreatorDark
qtcreatorLight
railscasts
rainbow
routeros
schoolBook
shadesOfPurple
solarizedDark
solarizedLight
srcery
stackoverflowDark
stackoverflowLight
sunburst
tomorrowNightBlue
tomorrowNightBright
tomorrowNightEighties
tomorrowNight
tomorrow
vs
vs2015
xcode
xt256
zenburn
*/