import StampsClient from "./client";
import { fetchStamps, fetchStampsCount } from "./server";

export default async function StampsPage({
  searchParams = {},
}: {
  searchParams?: {
    query?: string;
    sort?: string;
    page?: string;
  };
}) {
  const { query = '', sort = 'stamp_log_id', page } = searchParams;
  const currentPage = Number(page) || 1;

  const [stamps, count] = await Promise.all([
    fetchStamps(query, sort, currentPage),
    fetchStampsCount(query),
  ]);

  return <StampsClient stamps={stamps} count={count} />;
}