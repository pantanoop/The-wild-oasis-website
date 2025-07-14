import Image from "next/image";
import img1 from "@/public/about-1.jpg";
import img2 from "@/public/about-2.jpg";

export const metadata = {
  title: "About",
};

export default function Page() {
  return (
    <div className="grid grid-cols-5 gap-x-24 gap-y-32 text-lg items-center">
      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Welcome to The Wild Oasis
        </h1>

        <div className="space-y-8">
          <p>
            🌿 Welcome to The Wild Oasis Where the sacred rhythm of the Ganges
            meets the stillness of the Himalayan foothills. Nestled deep within
            the lush jungles of Rishikesh—India&apos;s spiritual heart—The Wild
            Oasis offers more than just a luxury escape. It&apos;s a
            soul-stirring experience where nature, comfort, and mindfulness come
            together.
          </p>
          <p>
            Step into one of our 8 handcrafted wooden cabins—each designed for
            tranquility and connection. Whether it&apos;s sipping chai on your
            private deck, listening to birdsong at dawn, or soaking in a hot tub
            under starlit skies, every moment here invites you to slow down and
            reconnect—with nature, your loved ones, and yourself.
          </p>
          <p>
            This isn&apos;t just a place to stay—it&apos;s a place to breathe
            deeply, wander mindfully through forest trails, dip your feet in the
            sacred Ganges, and feel grounded in the beauty around you. The Wild
            Oasis is your retreat into simplicity, serenity, and unforgettable
            moments—crafted not just for luxury, but for living fully in the
            now.
          </p>
        </div>
      </div>

      <div className="col-span-2">
        <Image
          src={img1}
          alt="Family sitting around a fire pit in front of cabin"
          placeholder="blur"
        />
      </div>

      <div className="relative col-span-2 aspect-square">
        <Image
          src="/about-2.jpg"
          fill
          className="object-cover"
          alt="Family that manages The Wild Oasis"
        />
      </div>

      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          🕉️ Rooted in Tradition, Since 2000&apos;s
        </h1>

        <div className="space-y-8">
          <p>
            For over six decades, The Wild Oasis has been more than just a
            retreat—it&apos;s been a labor of love passed down through
            generations. Established by our grandparents in 1962 along the
            sacred banks of the Ganges, our sanctuary has grown under the gentle
            care of our family, preserving its soulful spirit and deep
            connection to nature.
          </p>
          <p>
            Over the years, we&apos;ve maintained the essence of The Wild Oasis,
            blending the timeless beauty of the mountains with the personal
            touch only a family business can offer. Here, you&apos;re not just a
            guest you&apos;re part of our extended family. So join us at The
            Wild Oasis soon, where tradition meets tranquility, and every visit
            is like coming home.
          </p>

          <div>
            <a
              href="/cabins"
              className="inline-block mt-4 bg-accent-500 px-8 py-5 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Explore our luxury cabins
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
