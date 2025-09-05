import { productModel, IProduct } from "@/models/product-model";
import { dbConnect } from "@/service/mongo";
import mongoose from "mongoose";

// Helper: Validate ID and connect DB
async function validateIdAndConnect(id: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ message: "Invalid product ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  await dbConnect();
  return null;
}

// GET single product
export async function GET(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  const errorResponse = await validateIdAndConnect(id);
  if (errorResponse) return errorResponse;

  try {
    const product = await productModel.findById(id).lean<IProduct>();
    if (!product) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(product), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// PATCH update product
export async function PATCH(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  const errorResponse = await validateIdAndConnect(id);
  if (errorResponse) return errorResponse;

  try {
    const body: Partial<IProduct> = await req.json();

    if (!Object.keys(body).length) {
      return new Response(JSON.stringify({ message: "No fields to update" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    ).lean<IProduct>();

    if (!updatedProduct) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(updatedProduct), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// DELETE product
export async function DELETE(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  const errorResponse = await validateIdAndConnect(id);
  if (errorResponse) return errorResponse;

  try {
    const deletedProduct = await productModel.findByIdAndDelete(id).lean<IProduct>();

    if (!deletedProduct) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "Product deleted successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
