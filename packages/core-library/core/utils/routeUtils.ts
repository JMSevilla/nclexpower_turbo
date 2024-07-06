export const generateNestedRoutes = (
  baseRoute: string,
  subRoutes: string[]
): string[] => {
  return subRoutes.map((subRoute) => `${baseRoute}${subRoute}`);
};
