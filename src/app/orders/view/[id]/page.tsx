"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import PageHeader from "@/app/components/ui/page-header";
import Header from "@/app/components/ui/header";
import OrderForm from "@/app/components/forms/OrderForm/OrderForm";

interface LineItem {
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  line_items: LineItem[];
  name: string;
  email: string;
  city: string;
  postalCode: string;
  streetAddress: string;
  country: string;
  paid: boolean;
  status: string;
  createdAt: string;
  total: string;
  paymentStatus: string;
  paymentMethod: string;
}

export default function OrderDetails({}) {
  const [orderInfo, setOrderInfo] = useState<Order | null>(null);
  const { id } = useParams();
  console.log("Order ID:", id);

  useEffect(() => {
    if (!id) {
      console.error("No product ID found.");
      return;
    }

    axios
      .get(`/api/orders?_id=${id}`)
      .then((response) => {
        console.log("Order data:", response.data);
        setOrderInfo(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching order:", error);
      });
  }, [id]);

  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="px-4 lg:mx-28 py-9">
        <div className="w-full">
          <PageHeader />
        </div>
        <div className="mt-9">
          <OrderForm orderData={orderInfo} />
        </div>
      </div>
    </div>
  );
}
