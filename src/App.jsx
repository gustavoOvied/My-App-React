import React, {useState} from "react";
import Giphy from "./components/Giphy";
import "./App.css";
import "./estilos/them.css";
import { Button } from './button/button.js';


const App = () => {

    const [theme, setTheme] = useState('light');

    return(
        <div>
         <div><Giphy/></div>

         <div className={`App ${theme}`}>
      <h1>Hello World</h1>
      <Button label="Click Me" />
    </div >
    </div>
    
    )}


export default App;