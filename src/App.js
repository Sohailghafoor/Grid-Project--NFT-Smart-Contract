import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Account from "./pages/account";
import Mint from "./pages/mint";
import Header from "./components/header";
import Footer from "./components/footer";
import {useState} from 'react'

function App() {
  const [accounts, setAccounts] = useState([]); 
  return (
    <Router>
      <Header accounts={accounts} setAccounts={setAccounts} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account accounts={accounts} setAccounts={setAccounts} />} />
        <Route path="/mint" element={<Mint accounts={accounts} setAccounts={setAccounts} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
