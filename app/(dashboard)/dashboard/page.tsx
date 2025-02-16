// "use client";

// import { useState } from "react";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { cn } from "@/lib/utils";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// function DashboardPage() {
//   const [tag, setTag] = useState("");
//   const [quotes, setQuotes] = useState([]);
//   const [specialQuote, setspecialQuote] = useState([]);

//   const getQuotes = async () => {
//     const response = await axios.get(`/api/scrapper?tag=${tag}`);
//     setQuotes(response.data.quotes);
//     setspecialQuote(response.data.specialQuote);
//   };

//   return (
//     <div className={cn("grid gap-6 my-2 justify-center w-9/12 mx-auto")}>
//       <div className="grid gap-2">
//         <div className="grid">
//           <Label className="sr-only" htmlFor="Mood">
//             Enter your Mood 👇🏻
//           </Label>
//           <Input
//             id="tag"
//             placeholder="Inspirational..."
//             type="text"
//             autoCapitalize="none"
//             autoCorrect="off"
//             required
//             value={tag}
//             onChange={(e) => setTag(e.target.value)}
//           />
//         </div>
//         <Button onClick={getQuotes}>Get Today&apos;s Quotes</Button>
//       </div>

//       {/* Special Quote */}
//       <div className="grid justify-center mx-auto items-center w-8/12">
//         <Card>
//           <CardHeader>
//             <CardTitle>{specialQuote}</CardTitle>
//             <CardDescription>
//               <a href="https://www.goodreads.com/quotes/tag/inspirational">Today&apos;s Special Quote for you</a>
//             </CardDescription>
//           </CardHeader>
//         </Card>
//         </div>
//       <div className="md:grid md:grid-cols-2 md:gap-3 lg:grid lg:grid-cols-3 lg:gap-4 relative justify-center mx-auto">
        
//         {quotes.map((quote, index) => (

          
            
//           <Card key={index} className="w-[350px]">
//             <CardHeader>
//               <CardTitle>{quote}</CardTitle>
//               <CardDescription>
//                 <a href="https://www.goodreads.com/quotes/tag/inspirational">Visit this website for daily quotes</a>
//               </CardDescription>
//             </CardHeader>
//             {/* @ts-ignore */}
//             {/* <CardContent> */}
//                {/* @ts-ignore */}
//               {/* <p key={index}>{quote}</p>
//             </CardContent> */}
//           </Card>
         
//         ))}
       
//          </div>
//       </div>
   
//   );
// }

// export default DashboardPage;

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  BrainCircuit,
  Activity,
  TrendingUp,
  DollarSign,
  BarChart4,
  GitGraph,
  PieChart
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Returns</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+$2,350</div>
            <p className="text-xs text-muted-foreground">
              +4.5% this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Moderate</div>
            <p className="text-xs text-muted-foreground">
              Based on your portfolio composition
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Recommendations</CardTitle>
            <BrainCircuit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              New investment opportunities
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Portfolio Performance Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border rounded">
              <GitGraph className="h-20 w-20" />
            </div>
          </CardContent>
        </Card>

        {/* Asset Allocation */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border rounded">
              <PieChart className="h-40 w-40" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Bought AAPL</p>
                      <p className="text-sm text-muted-foreground">March {i}, 2024</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">+$420.00</p>
                    <p className="text-sm text-muted-foreground">10 shares</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>AI Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "Portfolio diversification could be improved",
                "Consider increasing bond allocation",
                "Tech sector is overweight"
              ].map((insight, i) => (
                <div key={i} className="p-4 border rounded flex items-start space-x-4">
                  <BrainCircuit className="h-5 w-5 mt-0.5" />
                  <p className="text-sm">{insight}</p>
                </div>
              ))}
              <Button className="w-full">View All Insights</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}