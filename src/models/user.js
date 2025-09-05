const { Schema, default: mongoose } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dwc3gwskl/image/upload/v1721379013/samples/ecommerce/fiiijyy4cq1nrcp7t4zz.jpg",
      required: true,
    },

    form: {
      type: Object,
      default: {},
    },

    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate model registration in hot reload
const User = mongoose.models.User || mongoose.model("User", schema);
export default User;
