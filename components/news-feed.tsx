import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
// import type { NewsItem } from "@/utils/types"

export interface NewsItem {
  id: string
  title: string
  source: string
  timestamp: Date
  category: "stocks" | "crypto" | "economy" | "general"
}

interface NewsFeedProps {
    news: NewsItem[]
}

export function NewsFeed({ news }: NewsFeedProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Financial News</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[300px]">
                    <div className="space-y-4">
                        {news.map((item) => (
                            <div key={item.id} className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <Badge
                                        variant={
                                            item.category === "stocks"
                                                ? "default"
                                                : item.category === "crypto"
                                                    ? "secondary"
                                                    : item.category === "economy"
                                                        ? "destructive"
                                                        : "outline"
                                        }
                                    >
                                        {item.category}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">{item.source}</span>
                                </div>
                                <p className="font-medium">{item.title}</p>
                                <p className="text-xs text-muted-foreground">{item.timestamp.toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}

