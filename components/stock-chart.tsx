"use client"

import { Line } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface StockChartProps {
    symbol: string
    data: number[]
    labels: string[]
}

export function StockChart({ symbol, data, labels }: StockChartProps) {
    const chartData = {
        labels,
        datasets: [
            {
                label: symbol,
                data,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    }

    return (
        <div className="p-4 bg-card rounded-lg">
            <Line
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: "top" as const,
                        },
                        title: {
                            display: true,
                            text: `${symbol} Price History`,
                        },
                    },
                }}
            />
        </div>
    )
}

