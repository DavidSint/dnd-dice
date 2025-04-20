import { ReactElement } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Footer } from "./Components";
import { LoadGamePage, Page } from "./Pages";

function App(): ReactElement {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoadGamePage />} />
        <Route path="/:gameId" element={<Page />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
