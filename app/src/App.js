import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Main from "./components/Main";
import New from "./components/New";
import Nav from "./components/Nav";
import { Footer } from "antd/es/layout/layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/news" element={<New/>}>
                    {/* <Route index element={<Main />} /> */}
                    <Route path=":id" element={<New  />} />
                </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
