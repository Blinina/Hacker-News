import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import Main from "./components/Main";
import New from "./components/New";
import Nav from "./components/Nav";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/new" element={<New />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
