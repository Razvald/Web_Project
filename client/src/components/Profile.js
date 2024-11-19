// src/components/Profile.js
function Profile({ user }) {
   if (!user) return <p>Пожалуйста, войдите в систему.</p>;

   return (
      <div>
         <h1>Личный кабинет</h1>
         <p>Добро пожаловать, {user}!</p>
      </div>
   );
}

export default Profile;
