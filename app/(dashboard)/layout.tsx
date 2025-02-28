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
  
      <aside className="w-64 bg-black text-white h-screen p-4 space-y-4 fixed">
        <h2 className="text-lg font-bold">Finance Dashboard</h2>
        <nav className="space-y-2">
          <Link
            href='https://finlitera.streamlit.app/'
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "mt-sm-2",
              "cursor-pointer",
              "hover:bg-gradient-to-r",
              "hover:from-purple-400",
              "hover:via-pink-500",
              "hover:to-yellow-500",
              "transition-all",
              "duration-300",
              "ease-in-out",
              "transform",
              "hover:scale-105",
              "hover:translate-y-1",
              "hover:text-white"
            )}
          >
      Paper Trading
          </Link>    
          <Link href="/chat" className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "mt-sm-2",
              "cursor-pointer",
              "hover:bg-gradient-to-r",
              "hover:from-purple-400",
              "hover:via-pink-500",
              "hover:to-yellow-500",
              "transition-all",
              "duration-300",
              "ease-in-out",
              "transform",
              "hover:scale-105",
              "hover:translate-y-1",
              "hover:text-white"
            )}>FinLitera AI Chat</Link>
          
          <Link href="/smart-investment-finder" className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "mt-sm-2",
              "cursor-pointer",
              "hover:bg-gradient-to-r",
              "hover:from-purple-400",
              "hover:via-pink-500",
              "hover:to-yellow-500",
              "transition-all",
              "duration-300",
              "ease-in-out",
              "transform",
              "hover:scale-105",
              "hover:translate-y-1",
              "hover:text-white"
            )}>Smart Investment Finder</Link>
          <Link href="/finance-playground" className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "mt-sm-2",
              "cursor-pointer",
              "hover:bg-gradient-to-r",
              "hover:from-purple-400",
              "hover:via-pink-500",
              "hover:to-yellow-500",
              "transition-all",
              "duration-300",
              "ease-in-out",
              "transform",
              "hover:scale-105",
              "hover:translate-y-1",
              "hover:text-white"
            )}>Finance Playground</Link>
          <Link href="/financial-literacy-hub" className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "mt-sm-2",
              "cursor-pointer",
              "hover:bg-gradient-to-r",
              "hover:from-purple-400",
              "hover:via-pink-500",
              "hover:to-yellow-500",
              "transition-all",
              "duration-300",
              "ease-in-out",
              "transform",
              "hover:scale-105",
              "hover:translate-y-1",
              "hover:text-white"
            )}>Financial Literacy Hub</Link>
          <Link href="/ai-portfolio-optimizer" className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "mt-sm-2",
              "cursor-pointer",
              "hover:bg-gradient-to-r",
              "hover:from-purple-400",
              "hover:via-pink-500",
              "hover:to-yellow-500",
              "transition-all",
              "duration-300",
              "ease-in-out",
              "transform",
              "hover:scale-105",
              "hover:translate-y-1",
              "hover:text-white"
            )}>AI Portfolio Optimizer</Link>
          <Link href="/ai-budget-planner" className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "mt-sm-2",
              "cursor-pointer",
              "hover:bg-gradient-to-r",
              "hover:from-purple-400",
              "hover:via-pink-500",
              "hover:to-yellow-500",
              "transition-all",
              "duration-300",
              "ease-in-out",
              "transform",
              "hover:scale-105",
              "hover:translate-y-1",
              "hover:text-white"
            )}>AI Budget Planner</Link>
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
