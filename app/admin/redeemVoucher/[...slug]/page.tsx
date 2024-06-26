"use client";
import { useEffect, useMemo, useState } from "react";
import { fetchUsers } from "@/utils/ServerActions/user";
import { fetchAllVouchers } from "@/utils/ServerActions/voucher";
import RedeemVoucher from "../../vouchers/redeemVoucher";
import formatDateToFinnish from "@/utils/formatDateToFinnish";

/**
 * Page where owner/barista gets redirected to when scanning a voucher's QR code
 * @param param - URL parameters that come after admin/redeemVoucher. The param.slug contains voucher id and user id
 * @returns redeem voucher page on the admin side
 */
export default function Page({ params }: { params: { slug: string[] } }) {
  const [users, setUsers] = useState<any>();
  const [vouchers, setVouchers] = useState<any>();
  const [userId, setUserId] = useState<any>();
  const [voucherId, setVoucherId] = useState<any>();

  useEffect(() => {
    const getAndSet = async () => {
      setVoucherId(params.slug[0])
      setUserId(params.slug[1])
      await fetchUsers(1).then((data) => setUsers(data))
      await fetchAllVouchers().then((data) => setVouchers(data))
    }

    getAndSet();
  }, [params.slug[0], params.slug[1]])

  const user = useMemo(() => {
    if (users && userId) {
      return users.find((user: any) => user.id === userId);
    }
  }, [users])

  const voucher = useMemo(() => {
    if (vouchers && voucherId) {
      return vouchers.find((voucher: any) => voucher.id == voucherId);
    }
  }, [vouchers])

  return user && voucher ? (
    <div className='flex flex-col items-center justify-center flex-1 w-full gap-5 p-5'>
      <ul className="text-center">
        <li style={{ textTransform: "none" }}>Email: {user.email}</li>
        <li style={{ textTransform: "none" }}>ID: {user.id}</li>
      </ul>
      <h2 className="text-center">This user has redeemed a {voucher.voucher_type.name} voucher</h2>
      <div className={"flex gap-5 flex-col items-center md:flex-row"}>
        <RedeemVoucher
          redeemed_user_id={userId}
          voucher_id={voucherId}
          uses={voucher.used ? voucher.used : null}
          max_uses={voucher.voucher_type ? voucher.voucher_type.uses_per_voucher : null}
          voucher_user_id={voucher.user_id ? voucher.user_id : null}
          user_email={user ? user.email : null}
          times_used={voucher.used}
        />
      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center flex-1 w-full gap-5 p-5'>
      <p>Loading...</p>
    </div>
  );
}