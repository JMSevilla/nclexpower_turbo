import { PreloadedGlobals } from "./global";
import { CmsTenant } from "./tenant";

export interface ServerProps {
  tenant: CmsTenant;
  preloadedGlobals: PreloadedGlobals;
  slug: string;
}
