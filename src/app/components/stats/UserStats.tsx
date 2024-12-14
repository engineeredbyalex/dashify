"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { HiMiniUserGroup } from "react-icons/hi2";

export default function UserStats() {
  const [users, setUsers] = useState<any[]>([]);

  // Fetch users with caching
  useEffect(() => {
    const fetchUsers = async () => {
      const cacheKey = "usersCache";
      const cachedData = localStorage.getItem(cacheKey);
      const cacheExpiry = 1000 * 60 * 5;

      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < cacheExpiry) {
          console.log("Using cached data");
          setUsers(data);
          return;
        }
      }
      try {
        const response = await axios.get("/api/users");
        const data = response.data;

        // Cache the response
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ data, timestamp: Date.now() })
        );

        setUsers(data); // Set the state with fetched data
      } catch (error) {
        console.error("Error fetching Users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="stat_card_small">
      <div className="w-full flex flex-row justify-between text-neutral-50">
        <p className="text-neutral-300">Total users</p>
        <HiMiniUserGroup size={16} />
      </div>
      <h3 className="text-neutral-50">{users.length} Users</h3>
    </div>
  );
}
