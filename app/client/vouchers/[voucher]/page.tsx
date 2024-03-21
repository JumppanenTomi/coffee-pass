import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Nav from "@/components/Nav";
import QrCodeGen from "@/components/QrCodeGen";
import short from "short-uuid";

export default async function SingleVoucherPage() {
	const supabase = createClient();
	const code = short().generate()
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/auth/login");
	}

	return (
		<div className="flex-1 w-full flex flex-col items-center">
			<Nav />
			<div className='voucher'>
				<QrCodeGen text={process.env.SITE_URL + '/client/vouchers/voucher' + code} width={300} />
				<div className="voucher-part">
					Free Coffee
				</div>
				<div className="circle1" />
				<div className="circle2" />
			</div>
		</div >
	);
}