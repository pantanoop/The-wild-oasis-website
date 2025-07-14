import SmartLink from "./SmartLink";

function LoginMessage() {
  return (
    <div className="grid bg-primary-800 ">
      <p className="text-center text-xl py-12 self-center">
        Please{" "}
        <SmartLink href="/login" className="underline text-accent-500">
          login
        </SmartLink>{" "}
        to reserve this
        <br /> cabin right now
      </p>
    </div>
  );
}

export default LoginMessage;
