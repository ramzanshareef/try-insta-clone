import HomeLogin from "./components/HomeLogin";
import HomeSignup from "./components/HomeSignup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserState } from "./context/UserState";
import Home from "./components/Home";
import { PostState } from "./context/PostState";

function App() {
    return (
        <>
            <UserState>
                <PostState>
                    <Router>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<HomeLogin />} />
                            <Route path="/signup" element={<HomeSignup />} />
                        </Routes>
                    </Router>
                </PostState>
            </UserState>
        </>
    );
}

export default App;