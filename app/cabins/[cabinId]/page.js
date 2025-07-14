import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin } from "@/app/_lib/data-service";
import { Suspense } from "react";

// export const metadata = {
//   title: "Cabin",
// };

export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);
  return { title: `Cabin ${name}` };
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);
  const { name } = cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div>
        <Cabin cabin={cabin} />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-4xl sm:text-5xl font-semibold text-center mb-12 text-accent-400">
          Reserve {name} today.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
