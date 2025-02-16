// // 

// // "use client";
// import { notFound } from "next/navigation";
// import { getCurrentUser } from "@/lib/session";
// import { SiteFooter } from "@/components/site-footer";
// import { UserAccountNav } from "@/components/user-account-nav";
// import { getAuthSession } from "@/lib/auth";
// import Link from "@/node_modules/next/link";
// import { LoggedInNav } from "@/components/loggedin-nav";
// import { ModeToggle } from "@/components/toggle";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";

// interface DashboardLayoutProps {
//   children?: React.ReactNode;
// }

// export default async function DashboardLayout({ children }: DashboardLayoutProps) {
//   const user = await getCurrentUser();
//   const session = await getAuthSession();

//   if (!user) {
//     return notFound();
//   }

//   return (
//     <div className="flex min-h-screen flex-col space-y-6">
//       <header className="sticky top-0 z-40 border-b bg-background">
//         <div className="container flex h-16 items-center py-4 justify-between">
//           <LoggedInNav />
//           <div className="flex items-center gap-4 mx-2">
//             {/* Features Dropdown */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="text-white">Features</Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="start" className="bg-gray-900 text-white">
//                 <DropdownMenuItem>
//                   <Link href="/ai-financial-advisor">AI Financial Advisor</Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                   <Link href="/smart-investment-finder">Smart Investment Finder</Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                   <Link href="/finance-playground">Finance Playground</Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                   <Link href="/financial-literacy-hub">Financial Literacy Hub</Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                   <Link href="/ai-portfolio-optimizer">AI Portfolio Optimizer</Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                   <Link href="/ai-budget-planner">AI Budget Planner</Link>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//             <ModeToggle />
//             <UserAccountNav
//               user={{
//                 name: user.name,
//                 image: user.image,
//                 email: user.email,
//               }}
//             />
//           </div>
//         </div>
//       </header>
//       <main className="flex w-full flex-1 flex-col justify-center">{children}</main>
//       <SiteFooter className="border-t" />
//     </div>
//   );
// }

// "use client";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { SiteFooter } from "@/components/site-footer";
import { UserAccountNav } from "@/components/user-account-nav";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { LoggedInNav } from "@/components/loggedin-nav";
import { ModeToggle } from "@/components/toggle";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/more-icons"
import { HomeIcon } from "lucide-react";


interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const user = await getCurrentUser();
  const session = await getAuthSession();

  if (!user) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar Navigation */}
        <Link
          href="/#"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute left-4 top-4 md:left-8 md:top-8"
          )}
        >
          <>
            <Icons.chevronLeft className="mr-2 h-4 w-4" />
            Back
          </>
        </Link>
      <aside className="w-64 bg-black text-white h-screen p-4 space-y-4 fixed mt-20">
        <h2 className="text-lg font-bold">Finance Dashboard</h2>
        <nav className="space-y-2">
          <Link href="/chat" className="block p-2 rounded hover:bg-gray-700">FinLitera AI</Link>
          <Link href="/smart-investment-finder" className="block p-2 rounded hover:bg-gray-700">Smart Investment Finder</Link>
          <Link href="/finance-playground" className="block p-2 rounded hover:bg-gray-700">Finance Playground</Link>
          <Link href="/financial-literacy-hub" className="block p-2 rounded hover:bg-gray-700">Financial Literacy Hub</Link>
          <Link href="/ai-portfolio-optimizer" className="block p-2 rounded hover:bg-gray-700">AI Portfolio Optimizer</Link>
          <Link href="/ai-budget-planner" className="block p-2 rounded hover:bg-gray-700">AI Budget Planner</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-40 border-b bg-background flex justify-between items-center p-4">
          <LoggedInNav />
          <div className="flex items-center gap-4 mx-2">
            <ModeToggle />
            <UserAccountNav
              user={{
                name: user.name,
                image: user.image,
                email: user.email,
              }}
            />
          </div>
        </header>
        <main className="flex w-full flex-1 flex-col justify-center p-6">{children}</main>
        <SiteFooter className="border-t" />
      </div>
    </div>
  );
}
