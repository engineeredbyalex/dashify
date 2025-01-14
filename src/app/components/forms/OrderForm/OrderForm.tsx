import OrderOverview from "./OrderOverview";

export default function OrderForm({ orderData }: any) {
  return <OrderOverview productData={orderData} />;
}
