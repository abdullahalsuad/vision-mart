import { orderModel } from "@/models/orders-model";
import { dbConnect } from "@/service/mongo";

// Get orders for a specific user by userID
export async function GET(
  request: Request,
  { params }: { params: { userID: string } }
) {
  try {
    await dbConnect();

    const { userID } = params;

    // Validate userID
    if (!userID || userID.trim() === "") {
      return Response.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Get orders for this specific user only
    const orders = await orderModel.aggregate([
      // First, filter orders by the requested userID
      { $match: { userID: userID } },
      
      // Convert productID string to ObjectId for lookup
      {
        $addFields: {
          productObjectId: { $toObjectId: "$productID" }
        }
      },
      
      // Lookup product details
      {
        $lookup: {
          from: "products",
          localField: "productObjectId",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      
      // Project only the fields you want to return
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

    // Return the orders for this user
    return Response.json(orders);
    
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}