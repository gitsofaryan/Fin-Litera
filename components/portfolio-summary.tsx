import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Progress } from "@/components/ui/progress"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface PortfolioItem {
    symbol: string
    shares: number
    avgPrice: number
    currentPrice: number
    totalValue: number
    gain: number
    gainPercent: number
}

interface PortfolioSummaryProps {
    items: PortfolioItem[]
}

export function PortfolioSummary({ items }: PortfolioSummaryProps) {
    const totalValue = items.reduce((sum, item) => sum + item.totalValue, 0)
    const totalGain = items.reduce((sum, item) => sum + item.gain, 0)
    const totalGainPercent = (totalGain / (totalValue - totalGain)) * 100

    return (
        <Card>
            <CardHeader>
                <CardTitle>Portfolio Summary</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-muted-foreground">Total Value</p>
                            <h3 className="text-2xl font-bold">${totalValue.toLocaleString()}</h3>
                        </div>
                        <div className={`flex items-center ${totalGainPercent >= 0 ? "text-green-500" : "text-red-500"}`}>
                            {totalGainPercent >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                            <span className="font-medium">{totalGainPercent.toFixed(2)}%</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {items.map((item) => (
                            <div key={item.symbol} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium">{item.symbol}</span>
                                    <span>${item.totalValue.toLocaleString()}</span>
                                </div>
                                {/* <Progress value={(item.totalValue / totalValue) * 100} /> */}
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

