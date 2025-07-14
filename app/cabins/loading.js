import Spinner from "../_components/Spinner";
export default function loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-sl text-primary-200">Loading Cabins Data...</p>
    </div>
  );
}
