import { NextResponse } from "next/server";

export function middleware(req) {
  const session = req.cookies.get("next-auth.session-token") || req.cookies.get("__Secure-next-auth.session-token");

  
  if (!session) {
    const keycloakLoginUrl = `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/auth
      ?client_id=${process.env.KEYCLOAK_ID}
      &redirect_uri=${process.env.NEXTAUTH_URL}
      &response_type=code
      &scope=openid`;

    return NextResponse.redirect(keycloakLoginUrl);
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/:path*"], 
};
