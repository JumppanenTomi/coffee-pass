import Image from "next/image";
import logo from "@/public/images/logo.png";
import Link from "next/link";
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import { fetchSiteSetting } from "@/utils/ServerActions/siteSetting";
import { UserIcon } from "@heroicons/react/24/solid";

export default async function Nav() {
  const logoUrl = await fetchSiteSetting("logoUrl");

  return (
    <nav className='flex items-center justify-between w-full sm:py-5 bg-background'>
      <Link href={"/client/faq"} className='p-3'>
        <QuestionMarkCircleIcon className={"h-7"} />
      </Link>
      <Link href={"/client"}>
        {logoUrl && logoUrl.value ? (
          <>
            <Image
              src={logoUrl.value}
              alt={"Logo"}
              width={100}
              height={50}
              layout={"intrinsic"}
            />
          </>
        ) : (
          <Image
            src={logo}
            alt={"Cafe AVA- Logo"}
            width={50}
            height={50}
            loading={"lazy"}
          />
        )}
      </Link>
      <Link href={"/client/settings"} className='p-3'>
        <UserIcon className={"h-7"} />
      </Link>
    </nav>
  );
}
