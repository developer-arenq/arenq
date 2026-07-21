import Head from "next/head";
import dbConnect from "../../database/conn";
import ProductModel from "../../models/productSchema";
import Category from "../../models/categorySchema";
import dynamic from "next/dynamic";

const Product = dynamic(() => import("../../components/card"), {
  ssr: true,
});

export async function getStaticPaths() {
  await dbConnect();

  const categories = await Category.find({ active: true }).lean();

  return {
    paths: categories.map((cat) => ({
      params: {
        slug: cat.slug.toLowerCase(),
      },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  await dbConnect();

  const category = await Category.findOne({
    slug: new RegExp(`^${params.slug}$`, "i"),
  }).lean();

  if (!category) {
    return {
      notFound: true,
    };
  }

  const products = await ProductModel.find(
    {
      category_id: category._id,
    },
    "name price MRP main_image slug rating numReviews alt_text label out_of_stock category_id"
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
  const title = `${category.name} | Arenq Energy Storage Solutions`;

  const description = `Explore ${category.name} from Arenq. High-performance lithium batteries and advanced energy storage solutions for industrial, commercial, residential, telecom, EV, UPS, renewable energy, and battery energy storage applications.`;

  const url = `https://arenq.co.in/collections/${category.slug.toLowerCase()}`;

  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name="description" content={description} />

        <meta
          name="keywords"
          content={`${category.name}, lithium battery, energy storage, industrial battery, EV battery, UPS battery, solar battery, telecom battery, Arenq`}
        />

        <link rel="canonical" href={url} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />

        {products[0]?.main_image && (
          <>
            <meta property="og:image" content={products[0].main_image} />
            <link
              rel="preload"
              as="image"
              href={products[0].main_image}
            />
          </>
        )}

        {/* Collection Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: category.name,
              description,
              url,
            }),
          }}
        />

        {/* Product List Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement: products.map((product, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: `https://arenq.co.in/products/${product.slug}`,
                name: product.name,
              })),
            }),
          }}
        />
      </Head>

      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        {/* Hero */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {category.name}
          </h1>

          <h2 className="mt-3 text-xl font-semibold text-gray-700">
            Advanced Energy Storage Solutions
          </h2>

          <p className="mt-4 max-w-4xl text-gray-600 leading-7">
            Explore Arenq's premium{" "}
            <strong>{category.name.toLowerCase()}</strong> designed to deliver
            reliable, efficient, and long-lasting power solutions for
            residential, commercial, industrial, telecom, renewable energy,
            electric mobility, and mission-critical applications.
          </p>
        </header>

        {/* Products */}
        <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.length ? (
            products.map((item) => (
              <Product
                key={item._id}
                product={{
                  _id: item._id,
                  title: item.name,
                  price: item.price,
                  MRP: item.MRP,
                  category: category.name,
                  image: item.main_image,
                  slug: item.slug,
                  rating: item.rating,
                  numReviews: item.numReviews,
                  out_of_stock: item.out_of_stock,
                  label: item.label || "none",
                  alt_text:
                    item.alt_text ||
                    `${item.name} - Arenq ${category.name}`,
                }}
              />
            ))
          ) : (
            <div className="col-span-full py-16 text-center">
              <h3 className="text-xl font-semibold text-gray-700">
                No Products Available
              </h3>

              <p className="mt-2 text-gray-500">
                Products will be available soon.
              </p>
            </div>
          )}
        </section>

        {/* Internal Links */}
        <section className="mt-10 flex flex-wrap gap-4">
          <a
            href="/products"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            Explore All Products
          </a>

          <a
            href="/collections/bess-battery"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            Battery Energy Storage Systems
          </a>

          <a
            href="/collections/industrial-ups-battery"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            Industrial UPS Batteries
          </a>
        </section>

        {/* SEO Content */}
        <section className="mt-14 max-w-5xl">
          <h2 className="text-2xl font-semibold mb-5">
            Why Choose Arenq {category.name}?
          </h2>

          <div className="space-y-5 text-gray-700 leading-8">
            <p>
              Arenq develops innovative energy storage solutions using advanced
              lithium battery technology to deliver exceptional performance,
              safety, and long operational life. Our{" "}
              {category.name.toLowerCase()} are engineered to meet demanding
              power requirements while maximizing efficiency and minimizing
              maintenance.
            </p>

            <p>
              Whether you need dependable backup power, renewable energy
              storage, electric mobility solutions, telecom infrastructure
              support, or industrial energy systems, Arenq provides reliable
              battery technologies tailored to your application.
            </p>

            <p>
              Every product is manufactured with a focus on quality,
              sustainability, and innovation, ensuring consistent performance
              across residential, commercial, industrial, healthcare,
              agriculture, marine, robotics, logistics, and utility sectors.
            </p>

            <p>
              Discover the future of energy storage with Arenq and choose
              intelligent battery solutions that power your business and everyday
              life with confidence.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}