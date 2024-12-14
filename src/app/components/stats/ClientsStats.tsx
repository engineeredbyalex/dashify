"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { HiMiniUserGroup } from "react-icons/hi2";

// Define the structure of the Order object
interface Order {
  _id: string;
  name: string; // Client's name
  // Add other fields as necessary
}

export default function ClientsStats() {
  const [uniqueClientsCount, setUniqueClientsCount] = useState(0);

  useEffect(() => {
    const fetchClients = async () => {
      const cacheKey = "clientsCache";
      const cachedData = localStorage.getItem(cacheKey);
      const cacheExpiry = 1000 * 60 * 5; // 5 minutes

      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < cacheExpiry) {
          console.log("Using cached data");
          processClients(data as Order[]);
          return;
        }
      }

      try {
        const response = await axios.get("/api/orders");
        const data: Order[] = response.data;

        // Cache the response
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ data, timestamp: Date.now() })
        );

        processClients(data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    const processClients = (data: Order[]) => {
      const uniqueClients = new Set(data.map((client) => client.name));
      setUniqueClientsCount(uniqueClients.size);
    };

    fetchClients();
  }, []);

  return (
    <div className="stat_card_small">
      <div className="w-full flex flex-row justify-between text-neutral-50">
        <p className="text-neutral-300">Total clients</p>
        <HiMiniUserGroup size={16} />
      </div>
      <h3 className="text-neutral-50">{uniqueClientsCount} Clients</h3>
    </div>
  );
}
