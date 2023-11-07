import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  const _id = searchParams.get("id");
  // console.log(_id);
  try {
    await mongooseConnect();
    if (_id) {
      const product = await Product.findById(_id);
      return NextResponse.json(product);
    } else {
      const products = await Product.find();
      return NextResponse.json(products);
    }
  } catch (error) {
    return NextResponse.json({ message: `Error: ${error}` }, { status: 400 });
  }
}
export async function POST(req, res) {
  const { name, description, price, images, category, serving } =
    await req.json();
  try {
    await mongooseConnect();
    const product = await Product.create({
      name,
      description,
      price,
      images,
      category,
      serving,
    });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ message: `Error: ${error}` }, { status: 400 });
  }
}
export async function PUT(req, res) {
  const { name, description, price, images, category, serving, _id } =
    await req.json();
  try {
    await mongooseConnect();
    const productUpdate = await Product.updateOne(
      { _id },
      { name, description, price, images, category, serving }
    );
    return NextResponse.json({ productUpdate });
  } catch (error) {
    return NextResponse.json({ message: `Error: ${error}` }, { status: 400 });
  }
}
export async function DELETE(req, res) {
  const { searchParams } = new URL(req.url);
  const _id = searchParams.get("id");

  try {
    await mongooseConnect();
    const product = await Product.deleteOne({ _id });
    return NextResponse.json({ message: "Product Deleted" });
  } catch (error) {
    return NextResponse.json({ message: `Error: ${error}` }, { status: 400 });
  }
}
