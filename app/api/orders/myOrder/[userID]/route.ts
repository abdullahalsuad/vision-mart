import { NextRequest } from "next/server";
import { orderModel } from "@/models/orders-model";
import { dbConnect } from "@/service/mongo";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ userID: string }> }
) {
  try {
    await dbConnect();

    const { userID } = await context.params;

    if (!userID || userID.trim() === "") {
      return Response.json({ error: "User ID is required" }, { status: 400 });
    }

    const orders = await orderModel.aggregate([
      { $match: { userID } },
      { $addFields: { productObjectId: { $toObjectId: "$productID" } } },
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
          userID: 1,
          productTitle: "$product.productTitle",
          description: "$product.description",
          price: "$product.price",
          productImg: "$product.productImg",
          category: "$product.category",
          date: 1,
          status: 1,
          number: 1,
          address: 1,
        },
      },
    ]);

    return Response.json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
