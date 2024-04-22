import Image from "next/image";
import logo from "@/public/images/logo.png";
import maker from "@/public/images/maker.png";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import SocialLogin from "@/components/Inputs/buttons/SocialLogin";
import { fetchSiteSetting } from "@/utils/ServerActions/siteSetting";
import FadeIn from "@/components/Animations/Render/FadeIn";

export default async function Index() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/client");
  }

  const greetings = await fetchSiteSetting("welcomeText");
  const logoUrl = await fetchSiteSetting("logoUrl");

  return (
    <FadeIn duration={1} className='flex flex-1 w-full'>
      <div className='flex flex-col items-center flex-1 w-full'>
        <div className="flex flex-col items-center justify-center gap-5 p-5 w-full flex-grow bg-[url('/coffee.jpg')] bg-cover bg-top">
          <Image src={logo} alt={"ava logo"} width={100} />
        </div>
        <div className='flex flex-col items-center justify-center w-full max-w-screen-sm gap-5 p-5 py-16'>
          <h1 className={"font-bold text-3xl"}>Welcome!</h1>
          <p className={"text-center font-medium max-w-screen-sm"}>
            Welcome to our Digital Coffee Pass! Start your digital coffee
            journey with us today!
          </p>
          <SocialLogin />
          <div className={"flex flex-wrap w-full md:w-4/6 gap-5 items-center"}>
            <hr className={"flex-grow border-black"} />
            <p>or</p>
            <hr className={"flex-grow border-black"} />
          </div>
          <div className={"flex items-center w-full gap-4"}>
            <Link href='/auth/login' className='w-full btn-primary'>
              Login
            </Link>
            <Link href='/auth/register' className='w-full btn-secondary'>
              Register
            </Link>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
