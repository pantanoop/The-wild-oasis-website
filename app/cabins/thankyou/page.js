import SmartLink from "../../_components/SmartLink";

export default function Page() {
  return (
    <div className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">
        Thank you for your reservation!
      </h1>
      <SmartLink
        href="/account/reservations"
        className="underline text-xl text-accent-500 inline-block"
      >
        Manage your reservations &rarr;
      </SmartLink>
    </div>
  );
}
