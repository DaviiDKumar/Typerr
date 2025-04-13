import "./App.css"

import { Route, Routes } from "react-router-dom";
import Gamepage from "./Page/Gamepage";
import StartPage from "./Page/Startpage";
import Navbar from "./Components/Navbar";


function App() {



  return (<>

    <Navbar />
    <Routes>

      <Route path="/" element={<StartPage />} />
      <Route path="/gamePage" element={<Gamepage />} />


    </Routes>

  </>)
}

export default App;