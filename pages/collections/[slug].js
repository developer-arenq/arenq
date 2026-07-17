import Head from "next/head";
import dbConnect from "../../database/conn";
import ProductModel from "../../models/productSchema";
import Category from "../../models/categorySchema";
import dynamic from "next/dynamic";

const Product = dynamic(() => import("../../components/card"), { ssr: true });

export async function getStaticPaths() {
  await dbConnect();

  const categories = await Category.find({ active: true }).lean();

  return {
    paths: categories.map((cat) => ({
      params: { slug: cat.slug.toLowerCase() },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  await dbConnect();

  const category = await Category.findOne({
    slug: new RegExp(`^${params.slug}$`, "i"),
  }).lean();

  if (!category) return { notFound: true };

  const products = await ProductModel.find(
    { category_id: category._id },
    "name price MRP main_image slug rating numReviews alt_text label out_of_stock"
  )
    .limit(12)
    .lean();

  return {
    props: {
      category: JSON.parse(JSON.stringify(category)),
      products: JSON.parse(JSON.stringify(products)),
    },
    revalidate: 60,
  };
}

export default function CategoryPage({ category, products }) {
  const title = `${category.name} | Himalayan Organic Products - Arenq`;

  const description = `Buy ${category.name} from Himalayan region. Explore organic, handmade and natural products from Dharamshala at Arenq.`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="canonical"
          href={`https://www.arenq.co.in/collections/${category.slug.toLowerCase()}`}
        />

        {/* 🔥 Preload First Image (LCP BOOST) */}
        {products[0]?.main_image && (
          <link rel="preload" as="image" href={products[0].main_image} />
        )}

        {/* 🔥 Collection Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: category.name,
              description: description,
              url: `https://www.arenq.co.in/collections/${category.slug.toLowerCase()}`,
            }),
          }}
        />

        {/* 🔥 Product List Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement: products.map((p, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: `https://www.arenq.co.in/products/${p.slug}`,
                name: p.name,
              })),
            }),
          }}
        />
      </Head>

      <main className="px-4 md:px-6 lg:px-8 py-6 max-w-7xl mx-auto">

        {/* 🔥 HEADER */}
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">
            {category.name} - Himalayan Products
          </h1>

          <h2 className="text-lg font-semibold mt-2 text-gray-700">
            Buy Himalayan Organic {category.name} Online
          </h2>

          <p className="mt-3 text-gray-600 max-w-3xl text-sm leading-6">
            Discover authentic {category.name} sourced from Dharamshala,
            Himachal Pradesh. Natural, organic and handmade products crafted
            using traditional Himalayan techniques.
          </p>
        </header>

        {/* 🔥 PRODUCTS GRID */}
        <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.length > 0 ? (
            products.map((item) => (
              <Product
                key={item._id}
                product={{
                  _id: item._id,
                  title: item.name,
                  price: item.price,
                  MRP: item.MRP,
                  category: item.category_id?.name,
                  image: item.main_image,
                  alt_text:
                    item.alt_text ||
                    `${item.name} Himalayan organic product`,
                  out_of_stock: item.out_of_stock,
                  slug: item.slug,
                  rating: item.rating,
                  numReviews: item.numReviews,
                  label: item.label || "none",
                }}
              />
            ))
          ) : (
            <p>No products found</p>
          )}
        </section>

        {/* 🔥 INTERNAL LINK BOOST */}
        <div className="mt-8">
          <a
            href="/collections/Natural-Food-Products"
            className="text-blue-600 underline text-sm"
          >
            Explore more Himalayan Organic Products
          </a>
        </div>

        {/* 🔥 SEO CONTENT */}
        <section className="mt-10 max-w-4xl text-sm text-gray-700 leading-6">
          <h2 className="text-lg font-semibold mb-2">
            Why Choose {category.name}?
          </h2>

          <p>
            Himalayan {category.name} are known for their purity, eco-friendly
            production and authentic craftsmanship. These products are sourced
            directly from local artisans and farmers.
          </p>

          <p className="mt-2">
            Shop from Arenq to experience genuine Himalayan quality and
            support sustainable practices.
          </p>
        </section>
      </main>
    </>
  );
}