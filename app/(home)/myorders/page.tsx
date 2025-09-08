"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import MyOrderLoading from "@/components/loading/MyOrderLoading";
import { useRouter } from "next/navigation";

export default function MyOrdersPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  if (status === "unauthenticated") {
    router.push("/");
  }

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchOrders = async () => {
      try {
        const res = await fetch(`/api/orders/myOrder/${session.user.id}`);
        const data: Order[] = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [session]);

  if (!session) {
    return <p className="text-center py-20">Please log in to view orders.</p>;
  }

  return (
    <div className="py-20 px-4">
      {/* Title & Description */}
      <div className="text-center mb-8 px-4 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          My <span className="text-teal-600">Orders</span>
        </h1>
        <p className="text-gray-600 text-lg">
          Here you can view all the products you have ordered. Track their
          status, see purchase dates, and review your order history.
        </p>
      </div>

      {loading ? (
        <MyOrderLoading />
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Purchase Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-t border-gray-300 hover:bg-gray-50"
                  >
                    <td className="p-3 font-medium">#{order._id.slice(-6)}</td>
                    <td className="p-3 flex items-center gap-3">
                      <Image
                        src={order.productImg}
                        alt={order.productTitle}
                        width={40}
                        height={40}
                        className="rounded-md"
                      />
                      {order.productTitle}
                    </td>
                    <td className="p-3">${order.price}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-700"
                            : order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3">
                      {new Date(order.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
