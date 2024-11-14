import React, {useEffect, useState} from "react";

function App() {

   const [backendData, setBackenData] = useState([{}])
   
   useEffect(() => {
      fetch("/api").then(
         response => response.json()
      ).then(
         data => {
            setBackenData(data)
         }
      )
   }, [])

   return (
      <div>

         {(typeof backendData.users === "undefined") ? (
            <p>Loading...</p>
         ) : (
               backendData.users.map((user, i) => (
                  <p key={i}>{user}</p>
               ))
         )}

      </div>
   )
}

export default App;
