import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./assets/style/all.scss";

function App() {
  const [count, setCount] = useState(0);
  const env = import.meta.env;
  const { VITE_API_BASE, VITE_API_PATH } = env;
  return (
    <>
      <div className="container">
        <div>
          <a
            href="https://vite.dev"
            target="_blank"
          >
            <img
              src={viteLogo}
              className="logo"
              alt="Vite logo"
            />
          </a>
          <a
            href="https://react.dev"
            target="_blank"
          >
            <img
              src={reactLogo}
              className="logo react"
              alt="React logo"
            />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button
            className="btn btn-primary"
            onClick={() => setCount((count) => count + 1)}
          >
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
        <button className="btn btn-secondary">123</button>
        <button className="btn btn-taupe">123</button>
        <h1 className="cn-display-xl mb-32">晚上不是用來寂寞的</h1>
        <div className="container mt-5">
          {/* 測試中文標題 */}
          <h1 className="cn-display-xl text-primary">晚上不是用來寂寞的</h1>

          {/* 測試 Body 文字 */}
          <p className="cn-body-m-regular text-secondary">這段文字應該會呈現 Noto Sans TC (黑體)。</p>

          {/* 測試 Bootstrap 預設按鈕是否也吃到了 Noto Sans */}
          <button className="btn btn-primary">按鈕文字</button>
        </div>
        <div className="container">
          // 範例 1：大標題
          <h1 className="eng-display-xl">Night is not for loneliness</h1>
          // 範例 2：優雅的斜體標題
          <h2 className="eng-heading-italic-h1 text-primary">La Nuit Puff</h2>
          // 範例 3：小標籤
          <span className="eng-label-s">View More</span>
          <h1 className="eng-heading-italic-h1">La Nuit Puff</h1>
        </div>
      </div>
    </>
  );
}

export default App;
