import { BentoDemo } from "@/components/bento-features";
import { Icons } from "@/components/icons";
import BlurIn from "@/components/magicui/blur-in";
import { BorderBeam } from "@/components/magicui/border-beam";
import ShineBorder from "@/components/magicui/shine-border";
import { Companies } from "@/components/social-proof";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "@/node_modules/next/link";
import React from "react";

function HeroPage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-20">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center sm:mb-10 lg:mb-20 md:sm-20">
          {/* <Link
            href="https://twitter.com/kathanmehtaa"
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
            target="_blank"
          > */}


          <ShineBorder
            className="text-center capitalize bg-muted px-4 py-1.5 text-lg font-medium absolute"
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          >
            Introducing FinLitera ✨
          </ShineBorder>

          {/* </Link> */}

          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl mt-20">

            Your AI-powered assistant for smarter investing and financial insights


          </h2>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Empowering Financial Decisions with AI & Knowledge
          </p>
          <div className="space-x-4">
            <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started
            </Link>

            <Link
              href='https://finlitera.streamlit.app/' target="_blank"
              className={cn(
              buttonVariants({ variant: "outline", size: "lg" }), 
              "mt-sm-2",
              "cursor-pointer",
              "bg-gradient-to-r",
              "from-purple-400",
              "via-pink-500",
              "to-yellow-500",
              "transition-all",
              "duration-300",
              "ease-in-out",
              "transform",
              "hover:scale-105",
              "hover:translate-y-1",
              
              )}
            >
              Stream Demo
            </Link>    
            <a
              href="/#features"

              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "mt-sm-2")}
            >
              Let&apos;s Explore 👇🏻
            </a>

          </div>
        </div>
        <div className="flex items-center justify-center flex-row space-x-4">

        </div>
        <div className="relative rounded-xl mx-auto justify-center flex flex-col items-center lg:max-w-[1000px] ">
          <iframe src="https://finlitera.streamlit.app/?embed=true&embed_options=show_toolbar&embed_options=show_padding&embed_options=show_footer&embed_options=show_colored_line"  height={600} width={1000} frameBorder={0}></iframe>
          <BorderBeam size={300} />
        </div>

        <div className="relative rounded-xl mx-auto justify-center flex flex-col items-center lg:max-w-[1000px] overflow-hidden overscroll-none">
          <img
            src="/darkoutput.png"
            alt="Hero Image"
            className="hidden lg:max-w-[1000px]  rounded-[inherit] border object-contain shadow-lg dark:block overflow-hidden md:overflow-auto lg:overflow-auto"
          />
          <img
            src="/lightoutput.png"
            alt="Hero Image"
            className="block lg:max-w-[1000px]  rounded-[inherit] border object-contain shadow-lg dark:hidden overflow-hidden md:overflow-auto lg:overflow-auto"
          />

          <BorderBeam size={250} />
        </div>
      </section>

      {/* <Companies /> */}

      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-10"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h3 className="text-center text-sm font-semibold text-gray-500 pb-2">
            FEATURES
          </h3>
        </div>
        <BentoDemo />
      </section>
      <section id="open-source" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            FinLitera - Unlock the Wisdom
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Let&apos;s Try Now - {" "}
            <a
              href="/login"

              className="underline underline-offset-4"
            >
              Get Started
            </a>
            .{" "}
          </p>
        </div>
      </section>
    </>
  );
}

export default HeroPage;
