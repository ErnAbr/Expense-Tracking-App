import { useEffect, useState } from "react";
import { api } from "../../api/api";

export const SpendingPage = () => {
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.Test.allUSers();
        setUsers(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const localDate = new Date(users[1]?.birthDate);
  const formattedDate = localDate.toLocaleDateString("en-GB");
  console.log(formattedDate);

  return <h1>This Is Spending Page</h1>;
};
