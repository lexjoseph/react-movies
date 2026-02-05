import { useState, useEffect } from "react";
import React from 'react'


const App = () => {


  function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 5000);
  });

  return <h1>I've rendered {count} times!</h1>;
}
  return (
    <main>
      <div className="pattern"/>
      <div className="wrapper">

    
      <header>
        <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
        <Timer />
      </header>
      
      <p>Search</p>

      </div>
    </main>
  )
}

export default App