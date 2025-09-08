"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

interface Order {
  _id: string;
  name?: string;
  email?: string;
  productTitle?: string;
  description?: string;
  price?: number;
  productImg?: string;
  category?: string;
  date?: string;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  createdAt?: string;
  updatedAt?: string;
}

const OrderPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("/api/orders");

      if (!response.ok)
        throw new Error(`Failed to fetch orders: ${response.status}`);

      const data = await response.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (
    orderId: string,
    newStatus: Order["status"]
  ) => {
    try {
      setUpdatingOrderId(orderId);
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error("Failed to update order status");

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update order");
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Invalid date";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        <span className="ml-3 text-gray-600">Loading orders...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
        <button
          onClick={fetchOrders}
          className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <p className="text-gray-500 text-lg">No orders found</p>
        <button
          onClick={fetchOrders}
          className="mt-4 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded cursor-pointer"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="px-4">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Order Management
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          View and manage all customer orders
        </p>
      </div>

      {/* Desktop table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Order",
                "Customer",
                "Product",
                "Price",
                "Status",
                "Date",
                "Update Status",
              ].map((header) => (
                <th
                  key={header}
                  className="px-3 py-2 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr
                key={order._id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-3 py-2 align-middle text-sm md:text-base font-medium text-gray-900 truncate max-w-[120px]">
                  #{order._id?.slice(-6).toUpperCase() || "N/A"}
                </td>
                <td className="px-3 py-2 align-middle">
                  <div className="truncate max-w-[200px]">
                    <div className="text-sm md:text-base text-gray-900 font-semibold truncate">
                      {order.name || "Unknown Customer"}
                    </div>
                    <div className="text-xs md:text-sm text-gray-500 truncate">
                      {order.email || "No email"}
                    </div>
                  </div>
                </td>
                <td className="px-3 py-2 align-middle">
                  <div className="flex items-center gap-3">
                    {order.productImg && (
                      <Image
                        src={order.productImg}
                        alt={order.productTitle || "Product Title"}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-md object-cover border border-gray-200"
                      />
                    )}
                    <div className="truncate max-w-[200px]">
                      <div className="text-sm md:text-base text-gray-900 font-medium truncate">
                        {order.productTitle || "Unknown Product"}
                      </div>
                      <div className="text-xs md:text-sm text-gray-500 truncate">
                        {order.category || "No category"}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-2 align-middle text-sm md:text-base font-semibold text-gray-900">
                  ${order.price?.toFixed(2) || "0.00"}
                </td>
                <td className="px-3 py-2 align-middle">
                  <span
                    className={`inline-flex px-2 py-1 text-xs md:text-sm font-medium rounded-full ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-3 py-2 align-middle text-xs md:text-sm text-gray-500 truncate max-w-[160px]">
                  {formatDate(order.date || order.createdAt)}
                </td>
                <td className="px-3 py-2 align-middle min-w-[120px]">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(
                        order._id,
                        e.target.value as Order["status"]
                      )
                    }
                    disabled={updatingOrderId === order._id}
                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  {updatingOrderId === order._id && (
                    <div className="mt-1 text-xs text-gray-500 text-center">
                      Updating...
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card layout with image */}
      <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex items-start gap-4"
          >
            {order.productImg && (
              <div className="flex-shrink-0">
                <Image
                  src={order.productImg}
                  alt={order.productTitle || "Product"}
                  width={60}
                  height={60}
                  className="w-16 h-16 rounded-md object-cover border border-gray-200"
                />
              </div>
            )}
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-sm">{`#${order._id
                  ?.slice(-6)
                  .toUpperCase()}`}</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>
              <div className="mt-1 text-sm font-medium text-gray-900">
                {order.productTitle}
              </div>
              <div className="mt-0.5 text-xs text-gray-500">
                {order.category}
              </div>
              <div className="mt-0.5 text-sm font-semibold">
                ${order.price?.toFixed(2)}
              </div>
              <div className="mt-0.5 text-xs text-gray-500">
                {order.name} - {order.email}
              </div>
              <div className="mt-0.5 text-xs text-gray-500">
                {formatDate(order.date || order.createdAt)}
              </div>
              <div className="mt-2">
                <select
                  value={order.status}
                  onChange={(e) =>
                    updateOrderStatus(
                      order._id,
                      e.target.value as Order["status"]
                    )
                  }
                  disabled={updatingOrderId === order._id}
                  className="block w-full py-1 px-2 border border-gray-300 bg-white rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                {updatingOrderId === order._id && (
                  <div className="mt-1 text-xs text-gray-500 text-center">
                    Updating...
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
