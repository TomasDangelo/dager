import Link from "next/link";
import ProductList from "@/components/products/ProductList";

export default function HomePage() {
  // Traer productos destacados desde props o fetcher si lo deseas

  return (
    <div className="relative flex min-h-screen flex-col bg-[var(--background-color)] font-['Lexend',sans-serif]">
      <main>
        {/* Hero */}
        <section className="flex min-h-[60vh] flex-col gap-6 bg-cover bg-center bg-no-repeat items-start justify-end px-4 pb-10 rounded-xl"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAL4Djq19ZV586MlZp8PshfXS_MR6lPsCvN3nq5Hcs3BFPbCaiJwYbzXcxhz_EEto4ylx171zUsro16W0ePdO3617wz8O7EJIO9P2oHSa5eaJz-jDJjfYKYl_2WPxo95NyPMR6KTFSSbTmTVpJMNaBBNPFZRJuKGGRuRMnBg-Zu-hifnLz8J9f5vQXB6v014TXmOOYnJ4egJ5roVHJ51U0MYEoEcTD1dR7Ad_5C3n34T81-06WzdNrJ3R0js9XxPPSTz7yXhKQvtXS-')"
          }}>
          <div className="flex flex-col gap-2 text-left">
            <h1 className="text-white text-5xl font-black leading-tight tracking-[-0.033em] animate-slide-in-bottom">Däger</h1>
            <h2 className="text-gray-200 text-base font-normal animate-slide-in-bottom animate-delay-1">Eleva tu performance.</h2>
          </div>
          <Link href="/productos"
            className="flex min-w-[84px] max-w-[480px] items-center justify-center rounded-full h-12 px-6 bg-[var(--primary-color)] text-white text-base font-bold leading-normal tracking-wider hover:bg-blue-600 transition-colors duration-300 transform hover:scale-105 animate-slide-in-bottom animate-delay-2"
          >
            Comprá ahora
          </Link>
        </section>

        {/* Featured Categories */}
        <section className="p-4">
          <h2 className="text-white text-2xl font-bold pb-3 pt-5 animate-slide-in-bottom animate-delay-3">Categorias populares</h2>
          <div className="flex overflow-x-auto py-4 gap-4 animate-slide-in-bottom animate-delay-4">
            {/*  mapear categorías reales aca */}
            {[
              { name: "Women's", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDx9TS2LKUrH05-nafKy49n7muG2igLd3tBtuBaxYoNan2hcs_9OkfndLDX_lVS4ey67we1JLMHo8i5uCuwqZp_qQzsEPzqpzlRDLDuuJ2kEVqzJGdMtj1CoX8wlcvrJ7ITzupx5kOGTjnx3JNPMotKJln9UnCU4QflhUzxiKQE9quOa9FI8dWJ5CUMF4tJFfX6RZiwEEXtDbsosmbj3yFlKY8Ii0Yy3kBsj8jDtCp9TeSFD_c6--NofX4y-U8w54eeWroAFYrU2g2z" },
              { name: "Men's", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwqPEnJziKk9viGDrl6D8MZ4uEacKfer496HdVusOCdFw7OaH_Duf_z6WUW3mImluhTpclZZ9WNcGGN6xgaUUwHs94aYxKdwrc9-WaqiesmPvbwqaBayfUEMJN4FSGrYATWZEahmRXeU3yDC7RIBJwyAmFSCe5lk-En4la9zq-ZsFVx7E4DYoCidMHMfw1Cr1cjm9B2rpzYzxIeG0FSGmPzrBxtZCfXsoz81Y-ROyW2RTlC00UwdSQ-wDkXJgdfqScVJg4iUwgKuq_" },
              { name: "Accessories", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVsr4ow9nLhOf1LpMURijDuT0mAXwoVboc9zq3SJo5j3xIcwnkJK09chOZaEwkbMupnq7Qoe1B7gmYEGuHKEABB-IKYDYmC8Z8gTinOcwf9sJdztvWchvFDyt6ztQtRikwIUgjjfEEkSPg0DD0AiH67scGPFm8hOeD-s5AGx1TdJfNAvuss4ZNNBENyeK4aDQTg3DTKkIKiDTRzdSr4XICRW1Zc41syF6l08AhKnh9cnOM58W3hzhsI99rEalhOQvBVILH9dQWEw2k" }
            ].map(cat => (
              <div key={cat.name} className="flex flex-col gap-3 rounded-lg min-w-64 flex-shrink-0 group">
                <div className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl flex flex-col overflow-hidden transform group-hover:scale-105 transition-transform duration-300"
                  style={{ backgroundImage: `url('${cat.img}')` }}>
                  <div className="mt-auto p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white text-xl font-bold">{cat.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* New Arrivals */}
        <section className="px-4">
          <h2 className="text-white text-2xl font-bold pb-3 pt-5">New Arrivals</h2>
          {/* Puedes usar ProductList y pasarle solo los nuevos */}
          <ProductList products={[]} limit={4} />
        </section>
      </main>

    </div>
  );
}