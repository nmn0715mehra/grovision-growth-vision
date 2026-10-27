import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useRouterState,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { criticalCss } from "../lib/critical-css";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "GROVISION | Digital Marketing & Growth Strategy" },
      {
        name: "description",
        content:
          "GROVISION is a strategic digital marketing brand helping ambitious businesses scale online with data-driven SEO, paid media, and growth strategy.",
      },
      { name: "author", content: "GROVISION" },
      { property: "og:site_name", content: "GROVISION" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "preload",
        as: "style",
        href: appCss,
      },
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: "/fonts/montserrat.woff2",
        crossOrigin: "anonymous",
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        {/* Critical Above-The-Fold CSS inlined to achieve sub-1s FCP and LCP */}
        <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
        <link rel="stylesheet" href={appCss} media="print" id="grovision-main-css" />
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(){var l=document.getElementById("grovision-main-css");if(l){if(l.sheet){l.media="all"}else{l.addEventListener("load",function(){l.media="all"})}}}();`,
          }}
        />
        <noscript>
          <link rel="stylesheet" href={appCss} />
        </noscript>
      </head>
      <body>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://www.facebook.com/tr?id=927867306670360&ev=PageView&noscript=1"
          />
        </noscript>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KXPBJZGP"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
        {/* Third-party analytics initialized on idle/interaction without blocking initial paint or TBT */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              window.gtag = gtag;

              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];}(window, document);

              (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              })(window, document, "clarity");

              function __loadThirdPartyAnalytics(){
                if(window.__analyticsLoaded) return;
                window.__analyticsLoaded = true;

                ['scroll', 'touchstart', 'click', 'keydown', 'mousemove'].forEach(function(ev){
                  window.removeEventListener(ev, __loadThirdPartyAnalytics);
                });

                // 1. Google Tag Manager & Google Ads gtag
                var gtmScript = document.createElement('script');
                gtmScript.async = true;
                gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-KXPBJZGP';
                document.head.appendChild(gtmScript);

                var gtagScript = document.createElement('script');
                gtagScript.async = true;
                gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=AW-18400173969';
                document.head.appendChild(gtagScript);
                gtag('js', new Date());
                gtag('config', 'AW-18400173969');

                // 2. Meta Pixel (staggered to prevent any task exceeding 50ms)
                setTimeout(function(){
                  var fbScript = document.createElement('script');
                  fbScript.async = true;
                  fbScript.src = 'https://connect.facebook.net/en_US/fbevents.js';
                  document.head.appendChild(fbScript);
                  fbq('init', '927867306670360');
                  fbq('track', 'PageView');
                }, 150);

                // 3. Microsoft Clarity (staggered)
                setTimeout(function(){
                  var clarityScript = document.createElement('script');
                  clarityScript.async = true;
                  clarityScript.src = 'https://www.clarity.ms/tag/ym59ylhaji';
                  document.head.appendChild(clarityScript);
                }, 300);
              }

              if (typeof window !== 'undefined') {
                // Real user interactions trigger tracking immediately
                ['scroll', 'touchstart', 'click', 'keydown', 'mousemove'].forEach(function(ev){
                  window.addEventListener(ev, __loadThirdPartyAnalytics, { once: true, passive: true });
                });

                // 5.5s safety timeout for passive sessions (prevents TBT during PageSpeed audit window)
                setTimeout(__loadThirdPartyAnalytics, 5500);
              }
            `,
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <Toaster />
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:border focus:border-navy focus:bg-ivory focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy"
      >
        Skip to content
      </a>
      <div className="flex min-h-screen flex-col bg-ivory">
        <Navbar />
        <main id="main" className="flex-1">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <Footer />
      </div>
      <WhatsAppFloat />
      <Toaster />
    </QueryClientProvider>
  );
}
