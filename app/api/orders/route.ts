import { orderModel } from "@/models/orders-model";
import { dbConnect } from "@/service/mongo";

// Get all orders
export async function GET() {
  try {
    await dbConnect();

    const orders = await orderModel.aggregate([
      
      {
        $addFields: {
          userObjectId: { $toObjectId: "$userID" },
          productObjectId: { $toObjectId: "$productID" }
        }
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

    return Response.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { userID, productID, number, address } = await req.json();

    // Basic validation
    if (!userID || !productID || !number || !address) {
      return new Response(
        JSON.stringify({ message: "All fields are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create new order
    const newOrder = await orderModel.create({
      userID,
      productID,
      number,
      address,
      status: "Pending",
    });

    return new Response(JSON.stringify(newOrder), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    console.error("Error creating order:", err);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        err
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}