const { Schema, model, models, default: mongoose } = require("mongoose");

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number },
    category: { type: mongoose.Types.ObjectId, ref: "Category" },
    serving: [
      {
        type: Object,
      },
    ],
  },
  { timestamps: true }
);

export const Product = models.Product || model("Product", ProductSchema);
