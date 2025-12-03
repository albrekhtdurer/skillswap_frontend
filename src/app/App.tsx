import { useEffect, useState } from "react";
import type { User, SkillCategory } from "../entities/types";
import { api } from "../api";
import { UserCard } from "../widgets/UserCard/UserCard";
import styles from "./App.module.css";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [categories, setCategories] = useState<SkillCategory[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const [usersData, categoriesData] = await Promise.all([
        api.getAllUsers(),
        api.getCategories(),
      ]);

      setUsers(usersData);
      setCategories(categoriesData);
    };

    loadData();
  }, []);

  return (
    <main className={styles.page}>
      <section className={styles.cardsGrid}>
        {users.map((user) => (
          <UserCard key={user.id} user={user} categories={categories} />
        ))}
      </section>
    </main>
  );
}

export default App;
