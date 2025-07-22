import {useState} from 'react'
import './App.css'
import Home from "./components/Home.jsx";

function App() {
    const [displayHome, setDisplayHome] = useState(true)

    return (
        <div className="main-container">
            {displayHome && (
                <Home/>
            )}
        </div>
    )
}

export default App
