// 📄 middleware.ts (à la RACINE du projet)
import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

export const config = {
  matcher: [
    // Ignore Next.js internals and static files
    '/((?!_next|.*\\.(?:ico|png|jpg|jpeg|svg|css|js|woff|woff2|ttf|eot)).*)',
    '/(api|trpc)(.*)',
  ],
}
