import SmartLink from "./SmartLink";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  const session = await auth();
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <SmartLink
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </SmartLink>
        </li>
        <li>
          <SmartLink
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </SmartLink>
        </li>
        <li>
          {session?.user?.image ? (
            <SmartLink
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              <img
                src={session.user.image}
                className="h-8 rounded-full"
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
              <span>Guest area</span>
            </SmartLink>
          ) : (
            <SmartLink
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </SmartLink>
          )}
        </li>
      </ul>
    </nav>
  );
}
