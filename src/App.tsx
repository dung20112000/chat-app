import axios from 'axios';
import React,{useEffect} from 'react';
import {callApi} from "./server-interaction/api.services";

function App() {
  useEffect(() => {
    callApi(`https://608bab9d737e470017b7514e.mockapi.io/users`,"get").then((res: any) => console.log(res))
  })
  return (
    <div className="App">

    </div>
  );
}

export default App;
