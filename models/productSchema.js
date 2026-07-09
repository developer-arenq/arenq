import { models, model, Schema } from "mongoose";
import slugify from "slugify";
import Category from "./categorySchema";
import Brand from "./brandSchema";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    desc: { type: String, required: true },

    images: [{ type: String, required: true }],
    main_image: { type: String, default: null },

    alt_text: { type: String, default: "Product_image" },

    price: { type: Number, required: true },
    MRP: { type: Number, required: true },

    discount_id: { type: String },

    rating: { type: Number, default: 0, index: true },
    numReviews: { type: Number, default: 0 },

    structured_data: {
      ratingValue: { type: Number, default: 0 },
      reviewCount: { type: Number, default: 0 },
    },

    SKU: { type: String, required: true, index: true },

    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    brand_id: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },

    featured: { type: String, default: "new_arrival" },

    out_of_stock: { type: Boolean, default: false },

    active: { type: Boolean, default: true, index: true },

    seo: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      keywords: [{ type: String }],
      canonical: { type: String, default: "" },
    },

    short_desc: { type: String, default: "" },

    long_description: { type: String, default: "" },

    benefits: [{ type: String }],

    health_benefits: [{ type: String }],

    ingredients: [{ type: String }],

    how_to_use: [{ type: String }],

    storage_instructions: [{ type: String }],

    taste_profile: { type: String, default: "" },

    origin: { type: String, default: "" },

    region: { type: String, default: "" },

    state_of_origin: { type: String, default: "" },

    country_of_origin: {
      type: String,
      default: "India",
    },

    trust_badges: [{ type: String }],

    comparison_section: {
      type: String,
      default: "",
    },

    why_choose_section: {
      type: String,
      default: "",
    },

    expert_review: {
      type: String,
      default: "",
    },

    featured_snippet_content: {
      type: String,
      default: "",
    },

    ai_overview_content: {
      type: String,
      default: "",
    },

    semantic_keywords: [{ type: String }],

    voice_search_keywords: [{ type: String }],

    internal_links: [{ type: String }],

    related_blogs: [
      {
        title: String,
        slug: String,
      },
    ],

    youtube_video: {
      type: String,
      default: "",
    },

    instagram_reel: {
      type: String,
      default: "",
    },

    nutritional_info: {
      calories: { type: String, default: "" },
      protein: { type: String, default: "" },
      carbs: { type: String, default: "" },
      sugar: { type: String, default: "" },
      fat: { type: String, default: "" },
    },

    purchase_count: {
      type: Number,
      default: 0,
    },

    faq: [{ type: String }],

    videos: [{ type: String }],

    subcat: {
      type: String,
      default: "",
    },

    tax: {
      type: Number,
      default: 0,
    },

    oldSlugs: [{ type: String }],

    variants: [
      {
        type: {
          type: String,
          default: "",
        },

        value: {
          type: String,
          default: "",
        },

        price: Number,

        MRP: Number,

        SKU: String,

        stock: {
          type: Number,
          default: 0,
        },

        tax: {
          type: Number,
          default: 0,
        },
      },
    ],

    label: {
      type: String,
      enum: [
        "new_arrival",
        "new_launch",
        "trending_now",
        "hot_selling",
        "best_seller",
        "selling_fast",
        "limited_stock",
        "only_few_left",
        "big_savings",
        "flash_sale",
        "clearance_sale",
        "mega_discount",
        "festive_deals",
        "diwali_special",
        "christmas_sale",
        "premium_quality",
        "organic",
        "handcrafted",
        "luxury_pick",
        "none",
      ],
      default: "none",
    },
  },
  { timestamps: true }
);

productSchema.pre("validate", function (next) {
  if (!this.slug && this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

productSchema.pre("save", function (next) {
  this.structured_data = {
    ratingValue: this.rating || 0,
    reviewCount: this.numReviews || 0,
  };

  next();
});

const Product = models.Product || model("Product", productSchema);

export default Product;