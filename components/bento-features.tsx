import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import {
  BellIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
  BookmarkIcon,
  RocketIcon
} from "@radix-ui/react-icons";

const features = [
  {
    Icon: FileTextIcon,
    name: "AI Financial Advisor",
    description:
      "Get expert insights on investing, saving, and wealth-building strategies with FinLitera's AI Financial Advisor.",
    href: "/login",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: InputIcon,
    name: "Smart Investment Finder",
    description:
      "Discover stocks, ETFs, and mutual funds tailored to your goals using AI-powered recommendations.",
    href: "/login",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: BookmarkIcon,
    name: "Financial Literacy Hub",
    description:
      "Learn finance basics with interactive AI-driven lessons and clear explanations, all at your fingertips.",
    href: "/login",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: GlobeIcon,
    name: "AI Portfolio Optimizer",
    description:
      "Analyze and optimize your investment portfolio with AI-driven risk assessment and diversification insights.",
    href: "/login",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-2 lg:col-end-3 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: RocketIcon,
    name: "Finance Playground",
    description:
      "Learn by doing! Practice investing in a virtual stock market with real-world data and AI insights.",
    href: "/login",
    cta: "Start Investing",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: BellIcon,
    name: "AI Budget Planner",
    description:
      "Track spending, set savings goals, and receive personalized budgeting advice with FinLitera's AI-powered insights.",
    href: "/login",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-4",
  },
];

export async function BentoDemo() {
  return (
    <BentoGrid className="lg:grid-rows-3">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}
