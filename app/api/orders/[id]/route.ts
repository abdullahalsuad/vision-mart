import { orderModel } from "@/models/orders-model";
import { dbConnect } from "@/service/mongo";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

// Get single order by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params; // await params because it's a Promise

    if (!id) {
      return Response.json({ error: "Order ID is required" }, { status: 400 });
    }

    const order = await orderModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $addFields: {
          userObjectId: { $toObjectId: "$userID" },
          productObjectId: { $toObjectId: "$productID" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userObjectId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $lookup: {
          from: "products",
          localField: "productObjectId",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $project: {
          _id: 1,
          productID: "$product._id",
          userID: "$user._id",
          name: "$user.name",
          email: "$user.email",
          productTitle: "$product.productTitle",
          description: "$product.description",
          price: "$product.price",
          productImg: "$product.productImg",
          category: "$product.category",
          date: "$date",
          status: 1,
          number: 1,
          address: 1,
        },
      },
    ]);

    if (order.length === 0) {
      return Response.json({ error: "Order not found" }, { status: 404 });
    }

    return Response.json(order[0]);
  } catch (error) {
    console.error("Error fetching order:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Delete order by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;

    if (!id) {
      return Response.json({ error: "Order ID is required" }, { status: 400 });
    }

    const deletedOrder = await orderModel.findByIdAndDelete(id);

    if (!deletedOrder) {
      return Response.json({ error: "Order not found" }, { status: 404 });
    }

    return Response.json({
      message: "Order deleted successfully",
      deletedOrder,
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Update order status by ID
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;
    const { status } = await req.json();

    if (!id) {
      return Response.json({ error: "Order ID is required" }, { status: 400 });
    }

    if (
      !status ||
      !["Pending", "Shipped", "Delivered", "Cancelled"].includes(status)
    ) {
      return Response.json(
        {
          error:
            "Valid status is required (Pending, Shipped, Delivered, Cancelled)",
        },
        { status: 400 }
      );
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return Response.json({ error: "Order not found" }, { status: 404 });
    }

    return Response.json({
      message: "Order status updated successfully",
      updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
