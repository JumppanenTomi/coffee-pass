import { createClient } from "@/utils/supabase/server";
import AuthButton from "@/components/Inputs/buttons/AuthButton";
import ToggleButton from "@/components/Inputs/buttons/ToggleButton";
import LinkButton from "@/components/Inputs/buttons/LinkButton";
import GetDataButton from "@/components/Inputs/buttons/GetDataButton";
import { getUser } from "@/utils/ServerActions/user";

export default async function SettingsPage() {
	const user = await getUser()

	return (
		<div className="flex flex-col items-start md:items-center md:justify-center">
			<div className="flex flex-col gap-3">
				<div>
					<LinkButton link="/auth/updateEmail" buttonText="Update Email address" />
					<p className="text-sm text-gray-500">Currently logged in as {user ? user.email : ""}</p>
				</div>
				<div className="flex flex-row">
					<p className="font-bold pr-2">Receive Emails</p>
					<ToggleButton />
				</div>
				<div className="w-full">
					<GetDataButton />
				</div>
				<div>
					<AuthButton />
				</div>
			</div>
		</div>
	);
}
