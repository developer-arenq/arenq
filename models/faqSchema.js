import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const faqSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const FAQ = models.FAQ || model("FAQ", faqSchema);

export default FAQ;