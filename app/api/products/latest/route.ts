import { IProduct, productModel } from "@/models/product-model";
import { dbConnect } from "@/service/mongo";

// GET latest 8 products by date
export async function GET() {
  try {
    await dbConnect();

    const latestProducts = await productModel
      .find({})
      .sort({ date: -1 })
      .limit(8)
      .lean<IProduct[]>();

    return new Response(JSON.stringify(latestProducts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error fetching latest products:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}
