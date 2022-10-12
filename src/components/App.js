import React, { useState, useEffect } from 'react'
import Editor from './Editor'
import useLocalStorage from '../hooks/useLocalStorage'

function App() {
  const starterHtml = `
  <!-- JUST SOME STARTUP HTML CODE WRITTEN BY ME

  ================================================  -->


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="./styles.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loading....</title>
</head>
<body>
    <!-- spinners -->
    <div class="spinner">
        <div></div>
        <div></div>
    </div>

    <!-- bouncer -->
    <div class="bouncer">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>

    <!-- flipping squares -->
    <div class="square">
        <div></div>
        <div></div>
    </div>

</body>
</html>  
  `
  const starterCss = `
  /* JUST SOME STARTUP CSS CODE WRITTEN BY ME

================================================  */

  body {
    max-width: 960px;
    margin: 200px auto;
    display: flex;
    justify-content: space-around;
  }
  
  .spinner {
    height: 100px;
    width: 100px;
    position: relative;
  }
  
  .spinner div {
    height: 100%;
    width: 100%;
    position: absolute;
    border: 10px solid transparent;
    border-top: 10px solid #ad60f5;
    border-radius: 50%;
    animation: spinnerOne 0.6s linear infinite;
  }
  
  .spinner div:nth-child(2) {
    border: 10px solid transparent;
    border-bottom: 10px solid #ad60f5;
    animation: spinnerTwo 0.6s linear infinite;
  }
  
  @keyframes spinnerOne {
    0% {
      transform: rotate(0deg);
      border-width: 10px;
    }
    50% {
      transform: rotate(180deg);
      border-width: 1px;
    }
    100% {
      transform: rotate(360deg);
      border-width: 10px;
    }
  }
  @keyframes spinnerTwo {
    0% {
      transform: rotate(0deg);
      border-width: 1px;
    }
    50% {
      transform: rotate(180deg);
      border-width: 10px;
    }
    100% {
      transform: rotate(360deg);
      border-width: 1px;
    }
  }
  
  /* bouncer */
  .bouncer {
    display: flex;
    height: 100px;
    width: 100px;
    justify-content: space-around;
    align-items: flex-end;
  }
  
  .bouncer div {
    height: 20px;
    width: 20px;
    background: #0077ff;
    border-radius: 50%;
    animation: bounce 0.6s ease infinite alternate;
  }
  
  .bouncer div:nth-child(2) {
    animation-delay: 0.15s;
  }
  .bouncer div:nth-child(3) {
    animation-delay: 0.25s;
  }
  .bouncer div:nth-child(4) {
    animation-delay: 0.35s;
  }
  
  @keyframes bounce {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(-100px);
      opacity: 0;
    }
  }
  
  /* flipping squares */
  .square {
    height: 100px;
    width: 100px;
    position: relative;
    perspective: 200px;
  }
  
  .square div {
    height: 50px;
    width: 50px;
    transform-origin: bottom right;
    background: coral;
    position: absolute;
    animation: flip 2s linear infinite;
  }
  
  .square div:nth-child(2) {
    animation-delay: 1s;
  }
  
  @keyframes flip {
    0% {
      transform: rotateX(0deg) rotateY(0deg);
    }
    25% {
      transform: rotateX(0deg) rotateY(180deg);
      opacity: 0.5;
    }
    50% {
      transform: rotateX(180deg) rotateY(180deg);
      opacity: 0.3;
    }
    75% {
      transform: rotateX(180deg) rotateY(0deg);
      opacity: 0.5;
    }
    100% {
      transform: rotateX(0deg) rotateY(0deg);
    }
  }
  
  `
  const [html, setHtml] = useLocalStorage('html', starterHtml)
  const [css, setCss] = useLocalStorage('css', starterCss)
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(
        `
        <html>
         <body>${html}</body>
         <style>${css}</style>
         <script>${js}</script>
        <html>
        `
      )
    }, 250)
    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <>
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  )
}

export default App;

