import Image from "next/image";
import logo from "@/public/logo.png";
import AuthButton from "@/components/AuthButton";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function Index() {
	const supabase = createClient();
	const {
		data: {user},
	} = await supabase.auth.getUser();

	if (user) {
		return redirect("/client");
	}

	return (
		<div className="flex flex-col items-center flex-1 w-full">
			<div className="flex flex-col items-center justify-center gap-5 p-5 w-full flex-grow bg-[url('/coffee.jpg')] bg-cover bg-top">
				<Image src={logo} alt={"ava logo"} width={100} />
			</div>
			<div className="flex flex-col items-center justify-center w-full max-w-screen-sm gap-5 p-5 py-16">
				<h1 className={'font-bold text-3xl'}>Welcome!</h1>
				<p className={'text-center font-medium max-w-screen-sm'}>Welcome to our Digital Coffee Pass! Start your digital coffee journey with us today!</p>
				<AuthButton />
			</div>
		</div>
	);
}
