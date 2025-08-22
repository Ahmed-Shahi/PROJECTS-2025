import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  const [code, setCode] = useState(` function sum() {
  return 1 + 1
  }`
  )

  const [review, setReview] = useState(``)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  const [isLoading, setIsLoading] = useState(false);

  async function reviewCode() {

    try {
      setIsLoading(true);   // start loading
      console.log('loading...');
      const response = await axios.post('http://localhost:8000/api/review', { code });
      setReview(response.data);
      console.log('Done...');
    } catch (err) {
      console.error(err);
      setReview("⚠️ Error fetching review");
    } finally {
      setIsLoading(false);  // stop loading
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #000000ff",
                borderRadius: "5px",
                minHeight: "100%",
                width: "100%",
              }}
            />
          </div>
          <div
            onClick={reviewCode}
            className="review">Review</div>
        </div>
        <div className="right">
          {isLoading ? (
            <p style={{ color: "white" }}>⏳ Reviewing your code...</p>
          ) : (
            <Markdown rehypePlugins={[rehypeHighlight]}>
              {review}
            </Markdown>
          )}
        </div>
      </main>
    </>
  )
}



export default App