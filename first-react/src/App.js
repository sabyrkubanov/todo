import './App.css';
import TodoList from './page/TodoList/TodoList';
import React, { useState, useEffect, useRef } from 'react'
import NET from 'vanta/dist/vanta.net.min'
import * as THREE from 'three'

function App() {
    const [vantaEffect, setVantaEffect] = useState(0)
    const myRef = useRef(null)
    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(NET({
                el: myRef.current,
                THREE: THREE,
                color: 0x7dbe85,
                backgroundColor: 0x48386b,
                // 0x8486af
                maxDistance: 21.00,
                spacing: 19.00
            }))
        }  return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect])
    return (

    <div className="App" ref={myRef}>
      <TodoList />
    </div>
  );
}

export default App;


////