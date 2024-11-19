import React from "react";

function Profile({ user }) {
   if (!user) {
      return <h1>Please login to view your profile</h1>;
   }

   return (
      <div>
         <h1>Welcome, {user}!</h1>
         <p>This is your profile page.</p>
      </div>
   );
}

export default Profile;
