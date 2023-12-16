import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Body from "./Components/Body"
import Login from "./Components/Login"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">

          <Routes>
            <Route
              path="/"
              element={<Navigate to="/login" />}
            />
            <Route
              path="/user/:username"
              element={user ? <Body /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
