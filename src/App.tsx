import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Echo from "./pages/Echo";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="echo" element={<Echo />} />
                <Route path="*" element={<p>Page is not found</p>} />
            </Route>
        </Routes>
    );
}

export default App;
