import Link from 'next/link'
import Image from 'next/image'

function ProductCard({ id, images, name, slug, variants }) {
  const [primaryImage] = images
  const [primaryVariant] = variants

  return (
    <article key={id}>
      <Link href={`/products/${slug}`}>
        <a className="group no-underline w-full h-full flex">
          <div className="bg-gray-50 rounded-lg cursor-pointer w-full overflow-hidden relative px-3 py-6 md:px-6">
            {primaryImage ? (
              <Image
                src={primaryImage.url}
                height={primaryImage.height}
                width={primaryImage.width}
                alt={name}
                title={name}
              />
            ) : null}

            <div className="pt-3 md:pt-6 text-center">
              <p className="text-gray-800 font-semibold text-lg group-hover:text-indigo-600 mb-1">
                {name}
              </p>
              {primaryVariant ? (
                <p className="text-gray-400 text-sm">
                  {primaryVariant.formattedPrice}
                </p>
              ) : null}
            </div>
          </div>
        </a>
      </Link>
    </article>
  )
}

export default ProductCard
