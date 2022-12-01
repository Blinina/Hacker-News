import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Main from "./components/Main";
import Story from "./components/Story";
import Nav from "./components/Nav";
import NotFound from "./components/NotFound";
function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/story" element={<Story />}>
              <Route path=":id" element={<Story />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
