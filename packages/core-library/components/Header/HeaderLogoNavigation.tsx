import { Link } from "../Link";

interface Props {
  id?: string;
  href?: string;
  shouldNavigateToNewTab: boolean;
}

export const HeaderLogoNavigation: React.FC<React.PropsWithChildren<Props>> = ({
  id,
  href,
  shouldNavigateToNewTab,
  children,
}) => {
  return (
    <Link
      naked
      href={href}
      as={href}
      target={shouldNavigateToNewTab ? "_blank" : "_self"}
    >
      {children}
    </Link>
  );
};
