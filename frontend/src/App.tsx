import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import "./App.css";
import PageBase from "./components/pageBase/pageBase";
import PageRoutes from "./routes/routes";

function App() {
    return (
        <div className="App">
            <PageRoutes />;
        </div>
    );
}

export default App;
