import { useRouter } from "next/router";
import Link from "next/link";
import { Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export const BreadCrumbs = () => {
  const router = useRouter();
  const { pathname } = router;

  if (!pathname.startsWith("/hub")) {
    return null;
  }

  const pathArray = pathname
    .split("/")
    .filter((segment) => segment && segment !== "hub");

  const breadcrumbs = pathArray.map((segment, index) => {
    const routeTo = `/hub/${pathArray.slice(0, index + 1).join("/")}`;
    const breadcrumbLabel = segment.charAt(0).toUpperCase() + segment.slice(1);

    return index === pathArray.length - 1 ? (
      <Typography key={routeTo} color="white" sx={{ fontWeight: "bold" }}>
        {breadcrumbLabel}
      </Typography>
    ) : (
      <Link key={routeTo} href={routeTo} passHref>
        <Typography
          component="a"
          color="white"
          sx={{
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          {breadcrumbLabel}
        </Typography>
      </Link>
    );
  });

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextIcon fontSize="small" sx={{ color: "white" }} />}
    >
      {breadcrumbs}
    </Breadcrumbs>
  );
};
