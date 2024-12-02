import { Link } from "@solidjs/meta";
import { pwaInfo } from "virtual:pwa-info";

export const Manifest = () => {
  if (pwaInfo && pwaInfo.webManifest) {
    const { href, useCredentials } = pwaInfo.webManifest;
    return useCredentials
      ? <Link rel="manifest" href={href} crossOrigin="use-credentials" />
      : <Link rel="manifest" href={href} />;
  }

  return undefined;
};
