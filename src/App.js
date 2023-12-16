import { useAuthContext } from './Hooks/useAuthContext'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Body from "./Components/Body"
import Login from "./Components/Login"

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">

          <Routes>
            <Route
              path="/"
              element={user ? <Body /> : <Login />}
            />
            <Route
              path="/user/:username"
              element={user ? <Body /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={user ? <Body /> : <Login />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
