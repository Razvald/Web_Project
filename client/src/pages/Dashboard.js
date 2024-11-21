import React, { useEffect, useState } from "react";

function Dashboard() {
   const [userData, setUserData] = useState(null);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const token = localStorage.getItem("token");

            const response = await fetch("/api/auth/me", {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
               },
            });

            const data = await response.json();

            if (response.ok) {
               setUserData(data);
            } else {
               alert("Session expired, please log in again.");
               localStorage.removeItem("token");
               window.location.href = "/login";
            }
         } catch (error) {
            console.error("Failed to fetch user data:", error);
         }
      };

      fetchData();
   }, []);

   const handleLogout = () => {
      localStorage.removeItem("token");
      window.location.href = "/login";
   };

   return (
      <div>
         <h1>Welcome to your Dashboard</h1>
         {userData ? (
            <div>
               <p>Email: {userData.email}</p>
               <p>Role ID: {userData.roleId}</p>
               <button onClick={handleLogout}>Logout</button>
            </div>
         ) : (
            <p>Loading...</p>
         )}
      </div>
   );
}

export default Dashboard;
