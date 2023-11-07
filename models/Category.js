const { Schema, models, model, default: mongoose } = require("mongoose");

const CategorySchema = new Schema({
  name: {
    type: String,
    require: true,
  },
});

export const Category = models?.Category || model("Category", CategorySchema);
