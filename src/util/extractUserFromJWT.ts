import jwt from "jsonwebtoken";
import { Request } from "express";

export default function extractUserEmailFromRequest(request): string | undefined {
  // Step 1: Get the JWT token from the Authorization header
  const authHeader = request.headers.authorization;
  console.log("AUTH", authHeader)
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return undefined;
  }

  // Step 2: Decode the JWT token
  const token = authHeader.split(' ')[1];
  let decodedToken: any;

  try {
    // Step 3: Extract the payload from the decoded token
    decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as any;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return undefined;
  }

  // Step 4: Find the email field in the payload
  const userEmail = decodedToken.email;

  return userEmail;
}