import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Account from "./pages/account";
import Mint from "./pages/mint";
import Header from "./components/header";
import Footer from "./components/footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/mint" element={<Mint />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
