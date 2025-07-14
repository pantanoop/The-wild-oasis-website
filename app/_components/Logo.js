import SmartLink from "./SmartLink";
import Image from "next/image";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <SmartLink href="/" className="flex items-center gap-4 z-10">
      {/* <Image src="/logo.png" height="60" width="60" alt="The Wild Oasis logo" /> */}
      <Image
        src={logo}
        height="60"
        width="60"
        alt="The Wild Oasis logo"
        quality={100}
      />

      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </SmartLink>
  );
}

export default Logo;
