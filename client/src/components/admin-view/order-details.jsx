// import dependencies
import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { useToast } from "@/hooks/use-toast";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const toast = useToast();

  function handleUpdateStatus(event) {
    event.preventDefault();
    console.log(formData);
    const { status } = formData;
    console.log(orderDetails, "orderDetails");

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      console.log(data, "data123");
      dispatch(getOrderDetailsForAdmin(orderDetails?._id));
      dispatch(getAllOrdersForAdmin());
      setFormData(initialFormData);
      toast({
        title: "Order Status updated",
      });
    });
  }

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-4 text-sm">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Payment Method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>
              <Badge
                className={`py-1 px-2 ${
                  orderDetails?.paymentStatus === "paid"
                    ? "bg-blue-600"
                    : "bg-black"
                }`}
              >
                {orderDetails?.paymentStatus}
              </Badge>
            </Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-2 ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-blue-600"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-500"
                    : "bg-black"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="gird gap-2">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3 text-sm">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <li
                      key={item?.productId}
                      className="flex items-center justify-between"
                    >
                      <span>Title: {item?.title}</span>
                      <span>Quantity: {item?.quantity}</span>
                      <span>Price: ${item?.price}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="gird gap-2">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid text-muted-forground text-sm">
              <span>User Name: {user?.userName}</span>
              <span>Address: {orderDetails?.addressInfo?.address}</span>
              <span>City: {orderDetails?.addressInfo?.city}</span>
              <span>Pincode: {orderDetails?.addressInfo?.pincode}</span>
              <span>Phone: {orderDetails?.addressInfo?.phone}</span>
              <span>Notes: {orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
