import React from "react";
import { Link } from "react-router-dom";

import blog09 from "../../images/blog/img09.jpg";
import blog10 from "../../images/blog/img10.jpg";
import blog11 from "../../images/blog/img11.jpg";

import img01 from "../../images/blog/img01.jpg";
import img02 from "../../images/blog/img02.jpg";
import img03 from "../../images/blog/img03.jpg";

export const BLOG_SLUGS = [
  "seo-guide",
  "chatbot-vs-human",
  "ai-ecommerce",
] as const;

export type BlogSlug = (typeof BLOG_SLUGS)[number];

export interface BlogPost {
  slug: string;
  pageTitle: string;
  pageSub: string;
  metaDescription: string;
  heroImage: string;
  itemDetails: {
    metaTag: string;
    lastUpdate: string;
    title: string;
    intro: string;
  };
  body: React.ReactNode;
}

function SeoGuideBody() {
  return (
    <>
      <div className="post_audio">
        <button className="audio_play_btn xb-border" type="button">
          <i className="fas fa-play"></i>
          <span className="time">5:12</span>
          <span>Listen to this article!</span>
        </button>
      </div>

      <h3 className="item_details_info_heading mb-35">
        Local SEO and technical SEO work together to <br /> bring the right people to your site.
      </h3>

      <div className="row mb-35 mt-none-30">
        <div className="col-md-6 col-sm-6 mt-30">
          <div className="single-item-image">
            <img src={blog09} alt="Local search and map results" />
          </div>
        </div>
        <div className="col-md-6 col-sm-6 mt-30">
          <div className="single-item-image">
            <img src={blog10} alt="Technical SEO audit" />
          </div>
        </div>
      </div>

      <p>
        Local SEO helps nearby customers find you when they search on Google Maps or “near me” queries. That means accurate business information, reviews, and location signals—not just keywords on a page. Technical SEO is the foundation: fast load times, clean crawl paths, structured data, and mobile-friendly layouts so search engines can index and rank your content reliably.
      </p>

      <p className="mt-35">
        When both are in place, you are not guessing—you are building discoverability in your market and a site that performs for users and bots. Start with an audit of Core Web Vitals and index coverage, then align your local listings and on-page content with the services you actually deliver.
      </p>

      <div className="blog-details-video mt-75">
        <iframe
          width="890"
          height="440"
          src="https://www.youtube.com/embed/HISRUrJsD08?si=_cI2X3hO3nluIWHV"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      <h3 className="item_details_info_heading mb-20">
        Why technical health matters for local rankings.
      </h3>

      <p className="mb-40">
        Google still needs to crawl and understand your site. Broken links, duplicate URLs, and slow pages can limit how well your local signals translate into visibility. Fix crawl errors, use consistent NAP (name, address, phone) data, and add schema where it helps—not as a gimmick, but to clarify what your business offers.
      </p>

      <div className="row mb-45 align-items-center mt-none-30">
        <div className="col-md-6 mt-30">
          <img src={blog11} alt="SEO checklist" className="single-item-image" />
        </div>

        <div className="col-md-6 mt-30">
          <ul className="iconlist_block">
            <li><span className="iconlist_text">Google Business Profile accuracy.</span></li>
            <li><span className="iconlist_text">Page speed and mobile usability.</span></li>
            <li><span className="iconlist_text">Internal linking to service pages.</span></li>
            <li><span className="iconlist_text">Structured data for services and FAQs.</span></li>
            <li><span className="iconlist_text">Clean XML sitemap and robots rules.</span></li>
            <li><span className="iconlist_text">HTTPS and secure hosting.</span></li>
          </ul>
        </div>
      </div>

      <h3 className="item_details_info_heading mb-25">3 priorities for sustainable SEO.</h3>

      <ul className="iconlist_block numlist_block list-unstyled">
        <li><span className="iconlist_text">1. Match content to real search intent in your area.</span></li>
        <li><span className="iconlist_text">2. Keep technical basics solid as you add pages.</span></li>
        <li><span className="iconlist_text">3. Measure rankings, traffic, and leads—not vanity metrics alone.</span></li>
      </ul>
    </>
  );
}

function ChatbotVsHumanBody() {
  return (
    <>
      <div className="post_audio">
        <button className="audio_play_btn xb-border" type="button">
          <i className="fas fa-play"></i>
          <span className="time">7:03</span>
          <span>Listen to this article!</span>
        </button>
      </div>

      <h3 className="item_details_info_heading mb-35">
        AI chatbots and human agents solve different <br /> parts of the customer journey.
      </h3>

      <div className="row mb-35 mt-none-30">
        <div className="col-md-6 col-sm-6 mt-30">
          <div className="single-item-image">
            <img src={blog10} alt="Chatbot conversation" />
          </div>
        </div>
        <div className="col-md-6 col-sm-6 mt-30">
          <div className="single-item-image">
            <img src={blog09} alt="Human support team" />
          </div>
        </div>
      </div>

      <p>
        Chatbots shine at instant answers, triage, and high-volume FAQs—especially outside business hours. Humans excel at empathy, negotiation, and complex cases where trust and nuance matter. The best setups blend both: automation for speed and consistency, with clear handoff paths when the conversation needs a person.
      </p>

      <p className="mt-35">
        Cost is only one lens. Also weigh resolution time, customer satisfaction, brand risk, and how much training your team needs. A chatbot that sounds robotic or blocks escalation can hurt loyalty; a well-designed flow with human backup usually outperforms either extreme.
      </p>

      <div className="blog-details-video mt-75">
        <iframe
          width="890"
          height="440"
          src="https://www.youtube.com/embed/HISRUrJsD08?si=_cI2X3hO3nluIWHV"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      <h3 className="item_details_info_heading mb-20">
        When to prioritize automation—and when not to.
      </h3>

      <p className="mb-40">
        Automate predictable, repetitive questions: order status, hours, pricing tiers, and how-to steps. Reserve human teams for complaints, high-value sales, medical or legal sensitivity, and anything where tone and judgment drive outcomes. Document your escalation rules so customers never feel stuck in a loop.
      </p>

      <div className="row mb-45 align-items-center mt-none-30">
        <div className="col-md-6 mt-30">
          <img src={blog11} alt="Support workflow" className="single-item-image" />
        </div>

        <div className="col-md-6 mt-30">
          <ul className="iconlist_block">
            <li><span className="iconlist_text">24/7 coverage for common questions.</span></li>
            <li><span className="iconlist_text">Consistent answers from approved knowledge.</span></li>
            <li><span className="iconlist_text">Lower wait times at peak hours.</span></li>
            <li><span className="iconlist_text">Handoff to live chat or phone when needed.</span></li>
            <li><span className="iconlist_text">Analytics on drop-off and satisfaction.</span></li>
            <li><span className="iconlist_text">Multilingual support at scale.</span></li>
          </ul>
        </div>
      </div>

      <h3 className="item_details_info_heading mb-25">3 questions before you choose.</h3>

      <ul className="iconlist_block numlist_block list-unstyled">
        <li><span className="iconlist_text">1. What percentage of tickets are truly repetitive?</span></li>
        <li><span className="iconlist_text">2. Where do customers abandon self-service today?</span></li>
        <li><span className="iconlist_text">3. What does “success” look like in CSAT and revenue?</span></li>
      </ul>
    </>
  );
}

function AiEcommerceBody() {
  return (
    <>
      <div className="post_audio">
        <button className="audio_play_btn xb-border" type="button">
          <i className="fas fa-play"></i>
          <span className="time">4:51</span>
          <span>Listen to this article!</span>
        </button>
      </div>

      <h3 className="item_details_info_heading mb-35">
        AI helps eCommerce brands personalize journeys <br /> and recover revenue across the funnel.
      </h3>

      <div className="row mb-35 mt-none-30">
        <div className="col-md-6 col-sm-6 mt-30">
          <div className="single-item-image">
            <img src={blog11} alt="Product recommendations" />
          </div>
        </div>
        <div className="col-md-6 col-sm-6 mt-30">
          <div className="single-item-image">
            <img src={blog09} alt="Shopping experience" />
          </div>
        </div>
      </div>

      <p>
        From search and browse to cart and post-purchase, AI can predict what shoppers are likely to want next, tune merchandising in real time, and flag churn risk before it hits your bottom line. The goal is not gimmicks—it is measurable lift in conversion, average order value, and repeat purchases when the experience still feels on-brand.
      </p>

      <p className="mt-35">
        Practical wins include dynamic product recommendations, smarter site search, inventory-aware promotions, and email or SMS triggers based on behavior—not batch blasts. Start with one funnel stage, establish a baseline, then expand once you trust the data pipeline and guardrails.
      </p>

      <div className="blog-details-video mt-75">
        <iframe
          width="890"
          height="440"
          src="https://www.youtube.com/embed/HISRUrJsD08?si=_cI2X3hO3nluIWHV"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      <h3 className="item_details_info_heading mb-20">
        Connect AI outputs to merchandising and ops.
      </h3>

      <p className="mb-40">
        Models are only as good as the signals you feed them—product attributes, margins, returns, and seasonality. Integrate recommendations with stock levels so you do not push out-of-season items, and review fairness and privacy: be transparent about personalization and honor opt-outs where required.
      </p>

      <div className="row mb-45 align-items-center mt-none-30">
        <div className="col-md-6 mt-30">
          <img src={blog10} alt="Ecommerce analytics" className="single-item-image" />
        </div>

        <div className="col-md-6 mt-30">
          <ul className="iconlist_block">
            <li><span className="iconlist_text">Behavior-based product grids.</span></li>
            <li><span className="iconlist_text">Cart and browse abandonment flows.</span></li>
            <li><span className="iconlist_text">Demand forecasting for inventory.</span></li>
            <li><span className="iconlist_text">Visual search and similar-item matching.</span></li>
            <li><span className="iconlist_text">Customer segmentation for campaigns.</span></li>
            <li><span className="iconlist_text">Testing frameworks for AI-driven UX.</span></li>
          </ul>
        </div>
      </div>

      <h3 className="item_details_info_heading mb-25">3 metrics to watch first.</h3>

      <ul className="iconlist_block numlist_block list-unstyled">
        <li><span className="iconlist_text">1. Conversion rate by traffic source and device.</span></li>
        <li><span className="iconlist_text">2. Revenue per session after personalization.</span></li>
        <li><span className="iconlist_text">3. Repeat purchase rate and time to second order.</span></li>
      </ul>
    </>
  );
}

export const blogPosts: Record<BlogSlug, BlogPost> = {
  "seo-guide": {
    slug: "seo-guide",
    pageTitle: "Local & technical SEO guide",
    pageSub: "SEO",
    metaDescription:
      "Why local SEO and technical SEO matter for rankings, crawl health, and measurable growth.",
    heroImage: img01,
    itemDetails: {
      metaTag: "#seo",
      lastUpdate: "Last Update: 03/24/2025",
      title: "Why Local SEO and Technical SEO Are Non-Negotiable for Your Website",
      intro:
        "Search visibility is a system: local signals bring nearby demand, and technical SEO ensures search engines can crawl, understand, and rank what you publish. Here is how to think about both without chasing shortcuts.",
    },
    body: <SeoGuideBody />,
  },
  "chatbot-vs-human": {
    slug: "chatbot-vs-human",
    pageTitle: "AI chatbots vs human support",
    pageSub: "Chatbots",
    metaDescription:
      "Compare AI chatbots and human support—when to automate, when to escalate, and what to measure.",
    heroImage: img02,
    itemDetails: {
      metaTag: "#chatbots",
      lastUpdate: "Last Update: 04/27/2025",
      title: "AI Chatbots vs Human Support — Which Fits Your Business?",
      intro:
        "Automation and people are not opposites. The right mix depends on your volume, risk, and what customers expect when something goes wrong. Use this framework to decide where chatbots help—and where humans should lead.",
    },
    body: <ChatbotVsHumanBody />,
  },
  "ai-ecommerce": {
    slug: "ai-ecommerce",
    pageTitle: "AI in eCommerce",
    pageSub: "eCommerce",
    metaDescription:
      "How eCommerce brands use AI for recommendations, retention, and smarter merchandising.",
    heroImage: img03,
    itemDetails: {
      metaTag: "#ecommerce ai",
      lastUpdate: "Last Update: 03/17/2025",
      title: "How eCommerce Brands Use AI to Increase Sales and Loyalty",
      intro:
        "AI can personalize the path from discovery to checkout—if you connect models to real product data and clear KPIs. Below are practical ways brands apply AI without losing trust or control.",
    },
    body: <AiEcommerceBody />,
  },
};

export function getStaticBlogPost(slug: string): BlogPost | null {
  if (!(slug in blogPosts)) return null;
  return blogPosts[slug as BlogSlug];
}
