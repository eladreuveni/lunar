import React from "react";
import styles from "./page.module.css";

interface User {
  id: number;
  name: string;
}

const UsersPage = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users",
    // { next: { revalidate: 10 } }
    { cache: 'no-store' }
  );
  const users: User[] = await res.json();

  return (
    <>
      <h1 className={styles.userLi} >Users</h1>
      <ul>
        {users.map((user) => (
          <li className='p-1 m-1' key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
};

export default UsersPage;
