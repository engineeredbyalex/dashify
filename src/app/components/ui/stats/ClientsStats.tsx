"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { HiMiniUserGroup } from "react-icons/hi2";

export default function ClientsStats() {
  const [client, setClient] = useState([]);
  const [uniqueClientsCount, setUniqueClientsCount] = useState(0);

  useEffect(() => {
    axios
      .get("/api/orders")
      .then((response) => {
        setClient(response.data);
        const uniqueClients = new Set(
          response.data.map((client: { name: string }) => client.name)
        );
        setUniqueClientsCount(uniqueClients.size);
      })
      .catch((error) => console.error("Error fetching clients:", error));
  }, []);

  return (
    <div className="stat_card_small">
      <div className="w-full flex flex-row justify-between text-neutral-50">
        <p className="text-neutral-300">Total clients</p>
        <HiMiniUserGroup size={12} />
      </div>
      <h3 className="text-neutral-50"> {uniqueClientsCount} Clients</h3>
    </div>
  );
}
