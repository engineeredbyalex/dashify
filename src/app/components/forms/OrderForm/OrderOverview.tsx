interface SelectedValue {
  value: string;
}

interface LineItem {
  _id: string;
  price: number;
  quantity: number;
  productId: string;
  selectedValues: SelectedValue[];
  promoCode: string;
  productName: string;
}

interface OrderOverviewProps {
  productData: {
    line_items: LineItem[];
  } | null;
}

export default function OrderOverview({ productData }: OrderOverviewProps) {
  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-6 py-6 border-[1px] border-neutral-600 rounded-lg gap-3 flex flex-col ">
      <div className="pb-2 border-b-[1px] border-neutral-600">
        <h4 className="text-neutral-50">Ordered items</h4>
        <p className="text-neutral-600">All products were shipped.</p>
      </div>
      <div>
        <div>
          {productData.line_items.map((item: LineItem) => (
            <div
              className="text-neutral-50 flex flex-row justify-between"
              key={item._id}
            >
              <div className="gap-5 flex">
                <div className="w-16 h-16 bg-white"></div>
                <div>
                  <h6>Product id: {item.productName}</h6>
                  <h6>Product name: {item.productId}</h6>
                </div>
              </div>
              <h6>Product price: {item.price}</h6>
              <h6>Product quantity: {item.quantity}</h6>
              <h6>
                Selected values:{" "}
                {item.selectedValues.map((value) => value.value).join(", ")}
              </h6>
              <h6>Promo code: {item.promoCode}</h6>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
