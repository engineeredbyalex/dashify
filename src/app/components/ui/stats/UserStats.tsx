"use client";
import axios from "axios";
import { useState, useEffect } from "react";

export default function UserStats() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.error("Error fetching Users:", error));
  });
  return (
    <div className="stat_card_small">
      <div className="w-full flex flex-row justify-between text-neutral-50">
        <p className="text-neutral-300">Total users</p>
      </div>
      <h3 className="text-neutral-50"> {users.length} Users</h3>
    </div>
  );
}
