import StampCode from "@/components/QrCodes/stampCode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faTicket,
  faUtensils,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import OverZoomIn from "@/components/Animations/Render/OverZoomIn";
import RollDown from "@/components/Animations/Render/RollDown";
import { Statistics } from "@/components/Statistics";
import FadeIn from "@/components/Animations/Render/FadeIn";
import { fetchSiteSetting } from "@/utils/ServerActions/siteSetting";
import getRole from "@/utils/getRole";
import Stamps from "@/components/stamps/Stamps";
import StampsInfo from "@/components/stamps/StampsInfo";
type NavigationLinkProps = {
  href: string;
  icon: IconDefinition;
  label: string;
  isExternal?: boolean;
};

/**
 * Represents a navigation link item for the home page.
 *
 * @component
 * @param {NavigationLinkProps} props - The props for the component.
 * @param {string} props.href - The URL for the link.
 * @param {React.ReactNode} props.icon - The icon for the link.
 * @param {string} props.label - The label for the link.
 * @param {boolean} [props.isExternal=false] - Indicates if the link is external.
 * @returns {JSX.Element} The rendered HomeLinkItem component.
 */
const HomeLinkItem: React.FC<NavigationLinkProps> = ({
  href,
  icon,
  label,
  isExternal = false,
}) => {
  const linkProps = isExternal ? { target: "_blank", href } : { href };

  return (
    <Link
      {...linkProps}
      className='flex flex-col items-center justify-center gap-2'
    >
      <FontAwesomeIcon icon={icon} className='h-7 sm:h-12' />
      <label>
        {label}{" "}
        {isExternal && (
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} size={"xs"} />
        )}
      </label>
    </Link>
  );
};

export default async function ProtectedPage() {
  const menuUrl = await fetchSiteSetting("menuUrl"); //fetch the food/drink menu url from the database
  const userRole = await getRole(); //get the current user's role

  return (
    <>
      <div className='flex flex-col items-center justify-center flex-grow w-full gap-2 sm:gap-5'>
        <FadeIn duration={0.8} className='w-full'>
          <Statistics />
        </FadeIn>
        <FadeIn
          className='flex flex-row flex-wrap w-full gap-2 justify-evenly white-container'
          duration={0.8}
        >
          <HomeLinkItem
            href='/client/vouchers'
            icon={faTicket}
            label='Vouchers'
          />
          <HomeLinkItem
            href={menuUrl?.value || "/error"}
            icon={faUtensils}
            label='Menu'
            isExternal={true}
          />
        </FadeIn>
        <div className={"flex flex-col justify-center"}>
          <OverZoomIn
            className='z-40 flex flex-col items-end gap-2'
            duration={0.8}
          >
            <StampsInfo />
            <div className='white-container-minimal-p'>
              <StampCode />
            </div>
          </OverZoomIn>
          <RollDown
            animateTop={[-150, 0]}
            className='flex justify-center w-full px-2 sm:px-4 top-full'
            delay={1}
            duration={0.4}
          >
            <Stamps />
          </RollDown>
        </div>
        {/*only show the admin dashboard button if the user is an owner or barista*/}
        {(userRole === "owner" || userRole === "barista") && (
          <Link href={"/admin"} className={"btn-primary"}>
            Admin Dashboard
          </Link>
        )}
      </div>
    </>
  );
}
