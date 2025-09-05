import { IProduct, productModel } from "@/models/product-model";
import { dbConnect } from "@/service/mongo";

const allowedCategories = ["Electronics", "Fashion", "Supplies", "Beauty", "Sports", "Groceries"] as const;

type ProductPayload = Omit<IProduct, "_id" | "date">;

// GET all products
export async function GET() {
  try {
    await dbConnect();
    const products = await productModel.find({}).lean<IProduct>();
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}

// POST create a product
export async function POST(req: Request) {
  try {
    const body: ProductPayload = await req.json();

    const { productTitle, description, price, productImg, category } = body;

    if (!productTitle || !description || !price || !productImg || !category) {
      return new Response(JSON.stringify({ message: "All fields are required." }), { status: 400 });
    }

    if (!allowedCategories.includes(category)) {
      return new Response(JSON.stringify({ message: "Invalid category" }), { status: 400 });
    }

    await dbConnect();

    const product = await productModel.create(body);

    return new Response(JSON.stringify({ message: "Product created successfully", id: product._id }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}
