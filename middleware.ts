import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
 
export default authMiddleware({
    publicRoutes:["/"],
    afterAuth(auth, req) {
      if (auth.userId && auth.isPublicRoute) {
        let path = '/select-org';

        if (auth.orgId) {
          path = `/organization/${auth.orgId}`
        };

        const orgSelection = new URL(path, req.url);
        return NextResponse.redirect(orgSelection);
      }
      
    }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 