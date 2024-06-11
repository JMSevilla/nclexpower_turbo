import jwt_decode, { JwtPayload } from "jwt-decode";

type AccessToken = JwtPayload & { token_id: string };

export function isValid(token: string) {
  const obj: AccessToken = jwt_decode(token);
  return obj.exp! * 1000 >= Date.now();
}

export function parseTokenId(token: string) {
  const obj: AccessToken = jwt_decode(token);
  return obj.token_id;
}
