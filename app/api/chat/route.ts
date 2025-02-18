import { NextResponse } from 'next/server';
import axios from 'axios';

// Helper function to fetch real-time stock data
async function getStockData(symbol: string) {
    try {
        // Using Alpha Vantage API for stock data (you'll need an API key)
        const response = await axios.get(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching stock data:', error);
        return null;
    }
}

function formatFinancialResponse(content: string, stockData: any[]): string {
    let formattedResponse = `## ${getResponseTitle(content)}\n\n`;
    
    // Add main content with better formatting
    formattedResponse += formatMainContent(content);

    // Add stock data section if available
    if (stockData.length > 0) {
        formattedResponse += '\n\n### 📈 Real-Time Market Analysis\n';
        stockData.forEach((data) => {
            if (data && data['Global Quote']) {
                const quote = data['Global Quote'];
                const price = parseFloat(quote['05. price']);
                const change = parseFloat(quote['09. change']);
                const changePercent = parseFloat(quote['10. change percent']);
                const volume = parseInt(quote['06. volume']);
                
                // Add technical analysis insights
                formattedResponse += `
#### ${quote['01. symbol']} Market Analysis
* **Current Price:** $${formatNumber(price)}
* **Daily Change:** ${formatNumber(change)} (${formatNumber(changePercent)}%)
* **Volume:** ${formatNumber(volume)}
* **Trading Signals:**
  * Momentum: ${change > 0 ? '🟢 Positive' : '🔴 Negative'}
  * Volume Analysis: ${volume > 1000000 ? '📊 High Trading Activity' : '📉 Normal Trading Volume'}
  * Volatility: ${Math.abs(changePercent) > 2 ? '⚠️ High' : '✅ Normal'}
`;
            }
        });
    }

    // Add educational resources section
    formattedResponse += `
### 📚 Learning Resources

#### Investment Education
* [Investopedia](https://www.investopedia.com) - Comprehensive investment education
* [Khan Academy - Finance](https://www.khanacademy.org/economics-finance-domain) - Free financial education
* [Wall Street Survivor](https://www.wallstreetsurvivor.com) - Interactive trading courses

#### Market Research
* [TradingView](https://www.tradingview.com) - Technical analysis platform
* [Finviz](https://finviz.com) - Stock screener and visualization
* [Seeking Alpha](https://seekingalpha.com) - Investment research and analysis

#### Financial Data
* [Yahoo Finance](https://finance.yahoo.com) - Comprehensive market data
* [MarketWatch](https://www.marketwatch.com) - Financial news and analysis
* [Morningstar](https://www.morningstar.com) - Investment research

#### Official Resources
* [SEC EDGAR](https://www.sec.gov/edgar) - Official company filings
* [Federal Reserve Economic Data](https://fred.stlouisfed.org) - Economic indicators
* [Treasury Direct](https://www.treasurydirect.gov) - Government securities

### 💡 Key Investment Concepts
1. **Diversification:** Spread investments across different assets
2. **Risk Management:** Use stop-loss orders and position sizing
3. **Market Analysis:** Combine technical and fundamental analysis
4. **Long-term Perspective:** Focus on sustainable growth
5. **Cost Management:** Consider fees and tax implications

### ⚠️ Risk Management Guidelines
* Never invest more than you can afford to lose
* Maintain a diversified portfolio
* Use stop-loss orders to limit potential losses
* Keep emergency funds separate from investments
* Consider your investment timeline and risk tolerance

### 📊 Portfolio Management Tips
1. Regular rebalancing
2. Tax-efficient investing
3. Dollar-cost averaging
4. Risk-adjusted returns analysis
5. Regular performance review

### ⚖️ Legal Disclaimer
*This information is for educational purposes only. Always conduct thorough research and consult with qualified financial professionals before making investment decisions. Past performance does not guarantee future results.*
`;

    return formattedResponse;
}

function getResponseTitle(content: string): string {
    // Extract a relevant title from the content or use a default
    if (content.toLowerCase().includes('portfolio')) {
        return '📊 Portfolio Analysis';
    } else if (content.toLowerCase().includes('stock')) {
        return '🎯 Stock Market Insights';
    } else if (content.toLowerCase().includes('crypto')) {
        return '₿ Cryptocurrency Overview';
    }
    return '💰 Financial Analysis';
}

function formatMainContent(content: string): string {
    // Split content into sections and format them
    const sections = content.split('\n\n');
    let formatted = '';
    
    sections.forEach(section => {
        if (section.trim()) {
            // Add section headers
            if (section.toLowerCase().includes('analysis:')) {
                formatted += `### 📈 ${section}\n\n`;
            } else if (section.toLowerCase().includes('recommendation:')) {
                formatted += `### 💡 ${section}\n\n`;
            } else if (section.toLowerCase().includes('risk:')) {
                formatted += `### ⚠️ ${section}\n\n`;
            } else {
                formatted += `${section}\n\n`;
            }
        }
    });

    return formatted;
}

function formatNumber(value: string | number): string {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(num);
}

export async function POST(req: Request) {
    try {
        const { content } = await req.json();
        
        // Extract previous conversation and current question
        const [previousConversation, currentQuestion] = content.split('Current question:').map((str: string) => str.trim());
        
        const enhancedPrompt = `
You are an expert financial advisor, investment educator, and market analyst. Please provide a comprehensive, structured response that:

1. EXPLAINS concepts clearly for beginners
2. PROVIDES advanced insights for experienced investors
3. INCLUDES specific examples and real-world applications
4. EMPHASIZES risk management and best practices
5. OFFERS actionable steps and recommendations

Consider these aspects in your response:
- Technical Analysis: Price trends, patterns, and indicators
- Fundamental Analysis: Company financials, industry trends, economic factors
- Risk Management: Position sizing, stop-loss strategies, portfolio diversification
- Market Psychology: Sentiment analysis, behavioral finance principles
- Educational Value: Clear explanations, relevant examples, learning resources

Previous conversation context:
${previousConversation}

Query to address: ${currentQuestion}

Format your response with clear sections, bullet points, and emphasis on key concepts.
`;

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{ text: enhancedPrompt }],
                        },
                    ],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 2048,
                    },
                }),
            }
        );

        const data = await response.json();
        
        // Extract stock symbols from the response if any
        const stockSymbols = extractStockSymbols(data.candidates[0]?.content?.parts?.[0]?.text || '');
        
        // Fetch real-time data for mentioned stocks
        const stockData = await Promise.all(
            stockSymbols.map(symbol => getStockData(symbol))
        );

        // Enhance response with real-time data
        const enhancedResponse = formatFinancialResponse(
            data.candidates[0]?.content?.parts?.[0]?.text || '',
            stockData
        );

        return NextResponse.json({
            ...data,
            candidates: [{
                content: {
                    parts: [{ text: enhancedResponse }]
                }
            }]
        });
    } catch (error) {
        console.error('Chat API Error:', error);
        return NextResponse.json(
            { error: 'Failed to process request' },
            { status: 500 }
        );
    }
}

function extractStockSymbols(text: string): string[] {
    // Basic regex to find stock symbols (can be improved)
    const symbolRegex = /\$([A-Z]{1,5})\b/g;
    const matches = text.match(symbolRegex) || [];
    return matches.map(match => match.substring(1));
} 