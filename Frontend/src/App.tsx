import { BrowserRouter,Routes,Route, useNavigate } from "react-router-dom"
import { Body } from "./components/Body"
import { Sign } from "./SignUp"

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sign sign="Sign Up" />} />
        <Route path="/signup" element={<Sign sign="Sign Up" />} />
        <Route path="/signin" element={<Sign sign="Sign In" />} />
        <Route path="/Dashboard" element={<Body />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
