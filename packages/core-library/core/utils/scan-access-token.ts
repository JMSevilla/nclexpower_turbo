import jwt, { JwtPayload } from "jsonwebtoken";

export interface JwtProps extends JwtPayload {
  exp?: number;
}

export function AccessTokenExpired(token: string | undefined): boolean {
  try {
    const decodedToken = jwt.decode(token ?? "") as JwtProps;
    if (decodedToken && typeof decodedToken.exp === "number") {
      const expiryTime = decodedToken.exp
        ? new Date(decodedToken.exp * 1000)
        : null;
      if (expiryTime) {
        const currentTime = new Date();
        return currentTime >= expiryTime; // Return true if current time is equal to or after expiry time
      }
    }
    return true; // Default to true for any decoding issues or missing expiry information
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // Return true in case of any errors
  }
}
