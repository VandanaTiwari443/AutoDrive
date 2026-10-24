import { SignJWT, jwtVerify } from "jose";

function getSecretKey() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is missing from backend/.env");
  }

  return new TextEncoder().encode(secret);
}

export async function createToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretKey());
}

export async function verifyToken(token) {
  const { payload } = await jwtVerify(token, getSecretKey());
  return payload;
}
