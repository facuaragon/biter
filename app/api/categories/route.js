import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { NextResponse } from "next/server";
import { isAdminRequest } from "../auth/[...nextauth]/route";

export async function GET(req, res) {
  try {
    // const admin = await isAdminRequest(req, res);
    // if (admin.status != 200) throw new Error("Not an admin");
    await mongooseConnect();
    const categories = await Category.find();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ message: `Error: ${error}` }, { status: 400 });
  }
}
export async function POST(req, res) {
  const { name } = await req.json();

  try {
    const admin = await isAdminRequest(req, res);
    if (admin.status != 200) throw new Error("Not an admin");
    await mongooseConnect();
    const oldCategory = await Category.findOne({ name });
    if (!oldCategory) {
      const newCategory = await Category.create({ name });
      return NextResponse.json({ newCategory });
    } else {
      return NextResponse.json({ message: "Category already exists" });
    }
  } catch (error) {
    return NextResponse.json({ message: `Error: ${error}` }, { status: 400 });
  }
}
export async function PUT(req, res) {
  const { name, _id } = await req.json();
  try {
    const admin = await isAdminRequest(req, res);
    if (admin.status != 200) throw new Error("Not an admin");
    await mongooseConnect();
    const categoryUpdate = await Category.updateOne({ _id }, { name });
    return NextResponse.json({ categoryUpdate });
  } catch (error) {
    return NextResponse.json({ message: `Error: ${error}` }, { status: 400 });
  }
}
export async function DELETE(req, res) {
  const { searchParams } = new URL(req.url);
  const _id = searchParams.get("_id");

  try {
    const admin = await isAdminRequest(req, res);
    if (admin.status != 200) throw new Error("Not an admin");
    await mongooseConnect();
    const category = await Category.deleteOne({ _id });
    return NextResponse.json({ message: "Category Deleted" });
  } catch (error) {
    return NextResponse.json({ message: `Error: ${error}` }, { status: 400 });
  }
}
