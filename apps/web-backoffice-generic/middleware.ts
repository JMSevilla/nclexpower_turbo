import { NextResponse, NextRequest } from "next/server";
import { config as processConfig } from "core-library/config";

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};

export const generateNestedRoutes = (
  baseRoute: string,
  subRoutes: string[]
): string[] => {
  return subRoutes.map((subRoute) => `${baseRoute}${subRoute}`);
};

async function routesCb(accountId: string) {
  const response = await fetch(
    `${processConfig.value.API_URL}/api/v2/internal/baseInternal/internal-auth-routes?accountId=${accountId}`,
    {
      headers: {
        "x-api-key": processConfig.value.XAPIKEY,
        "Content-Type": "application/json",
        "X-Environment": processConfig.value.SYSENV,
      },
    }
  );

  const data = await response.json();
  console.log("test", data);

  const subRoutes = data.map((route: { value: string }) => route.value);
  const baseRoutes = processConfig.value.BASEHUB;

  return generateNestedRoutes(baseRoutes, subRoutes);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accountIdCookie = req.cookies.get("accountId");
  const accountId = accountIdCookie ? accountIdCookie.value : "default-account";

  const allowedRoutes = await routesCb(accountId);

  const isRouteAllowed = allowedRoutes.includes(pathname);

  if (!isRouteAllowed) {
    return NextResponse.redirect(new URL("/404", req.url));
  }

  return NextResponse.next();
}
