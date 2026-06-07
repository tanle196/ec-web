/* ── Figma assets (expire 7 days) ─────────────────────────────────── */
const IMG_BOSE     = "https://www.figma.com/api/mcp/asset/8e882b0a-45f4-47bc-aa99-6c5cc821602e";
const IMG_PHONE    = "https://www.figma.com/api/mcp/asset/0790c298-8a7a-4e5c-a0ec-dfaa7b771429";
const IMG_TV       = "https://www.figma.com/api/mcp/asset/70a19f33-9134-4513-8475-4ba500f8f006";
const IMG_SAMSUNG  = "https://www.figma.com/api/mcp/asset/fdcfb5ce-7cb0-4b7f-9632-46de224b3144";
const IMG_GALAXY   = "https://www.figma.com/api/mcp/asset/598b8e3d-be16-4e0a-86cc-b63eacd8ca9c";
const IMG_SONY_CAM = "https://www.figma.com/api/mcp/asset/7f80337d-1fb9-4792-9dfe-8af6c1661d5e";
const IMG_WASHER   = "https://www.figma.com/api/mcp/asset/8b2b8a44-28b8-4614-8f76-22eca617725c";
const IMG_SONY2    = "https://www.figma.com/api/mcp/asset/c1a08de8-c3eb-4ab9-84a8-b17b1ce2b32f";
const IMG_DELL     = "https://www.figma.com/api/mcp/asset/e14da4c7-817d-4ab9-b20e-d3a9b8a1b3b0";
const IMG_TOZO     = "https://www.figma.com/api/mcp/asset/f1c75db8-3360-459d-8c25-7d403e14e899";
const IMG_JBL      = "https://www.figma.com/api/mcp/asset/0904fe43-d34a-409b-a7ce-bbea628578a8";
const IMG_WYZE     = "https://www.figma.com/api/mcp/asset/70394220-2944-400b-805a-27d1c59086fc";

interface MiniProduct { img: string; name: string; price: string; }

const COLUMNS: { title: string; products: MiniProduct[] }[] = [
  {
    title: "FLASH SALE TODAY",
    products: [
      { img: IMG_BOSE,  name: "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear…", price: "$1,500" },
      { img: IMG_PHONE, name: "Simple Mobile 4G LTE Prepaid Smartphone",                      price: "$1,500" },
      { img: IMG_TV,    name: "4K UHD LED Smart TV with Chromecast Built-in",                  price: "$1,500" },
    ],
  },
  {
    title: "BEST SELLERS",
    products: [
      { img: IMG_SAMSUNG,  name: "Samsung Electronics Samsung Galaxy S21 5G",              price: "$1,500" },
      { img: IMG_GALAXY,   name: "Simple Mobile 5G LTE Galaxy 12 Mini 512GB Gaming Phone", price: "$1,500" },
      { img: IMG_SONY_CAM, name: "Sony DSCHX8 High Zoom Point & Shoot Camera",             price: "$1,500" },
    ],
  },
  {
    title: "TOP RATED",
    products: [
      { img: IMG_WASHER, name: "Portable Washing Machine, 11lbs capacity Model 18NMF…", price: "$1,500" },
      { img: IMG_SONY2,  name: "Sony DSCHX8 High Zoom Point & Shoot Camera",             price: "$1,500" },
      { img: IMG_DELL,   name: "Dell Optiplex 7000x7480 All-in-One Computer Monitor",    price: "$1,500" },
    ],
  },
  {
    title: "NEW ARRIVAL",
    products: [
      { img: IMG_TOZO, name: "TOZO T6 True Wireless Earbuds Bluetooth Headpho…",         price: "$1,500" },
      { img: IMG_JBL,  name: "JBL FLIP 4 - Waterproof Portable Bluetooth Speaker…",     price: "$1,500" },
      { img: IMG_WYZE, name: "Wyze Cam Pan v2 1080p Pan/Tilt/Zoom Wi-Fi Indoor Smar…",  price: "$1,500" },
    ],
  },
];

function MiniProductCard({ product }: { product: MiniProduct }) {
  return (
    <div className="bg-white border border-gray-100 rounded-sm flex items-center gap-3 p-3">
      <div className="w-20 h-20 shrink-0 relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.img} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-2 min-w-0">
        <p className="text-body-sm text-gray-900 line-clamp-2 leading-5">{product.name}</p>
        <span className="text-body-sm font-semibold text-secondary-500">{product.price}</span>
      </div>
    </div>
  );
}

export function MiniLists() {
  return (
    <section className="bg-white py-18">
      <div className="max-w-330 mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-4 gap-6">
          {COLUMNS.map(({ title, products }) => (
            <div key={title} className="flex flex-col gap-4">
              <h3 className="text-body-md font-semibold text-gray-900">{title}</h3>
              {products.map((p) => (
                <MiniProductCard key={p.name} product={p} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
