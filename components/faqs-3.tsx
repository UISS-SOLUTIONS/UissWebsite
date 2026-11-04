import Link from "next/link";
import { FAQAccordion, type FAQItem } from "@/components/ui/faq-accordion";

const faqs: FAQItem[] = [
  {
    question: "Who can join UISS?",
    answer: (
      <>
        Current University of Dar es Salaam students can{" "}
        <Link href="/membership" className="font-semibold text-ink underline underline-offset-4">
          apply for UISS membership
        </Link>
        . Tell us which club interests you. The UISS team will follow up by email.
      </>
    ),
  },
  {
    question: "Do I need technical experience to participate?",
    answer:
      "No. UISS is a learning community, so curiosity and a willingness to take part matter more than arriving with advanced experience.",
  },
  {
    question: "Which technical clubs can I explore?",
    answer:
      "UISS currently brings together Networking, Artificial Intelligence, Software Development, UI/UX and Graphics Design, Data Science, and Blockchain clubs.",
  },
  {
    question: "Where can I find upcoming activities?",
    answer:
      "Published workshops, meetups, and society activities appear on the Events page, while announcements and community stories appear on the Blog.",
  },
  {
    question: "How can I contact UISS?",
    answer: (
      <>
        Email{" "}
        <a
          href="mailto:udsmict1@gmail.com"
          className="font-semibold text-ink underline underline-offset-4"
        >
          udsmict1@gmail.com
        </a>{" "}
        with your question.
      </>
    ),
  },
];

export default function FAQs() {
  return (
    <section id="faq" className="uiss-section bg-canvas">
      <div className="uiss-container grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12">
        <div>
          <p className="uiss-eyebrow">FAQ</p>
          <h2 className="mt-4 uiss-section-title text-ink">Questions students often ask.</h2>
          <p className="mt-4 max-w-sm leading-7 text-muted">
            A quick guide to joining, finding a club, and keeping up with UISS. Still need help?{" "}
            <Link
              href="mailto:udsmict1@gmail.com"
              className="font-semibold text-ink underline underline-offset-4"
            >
              Contact UISS
            </Link>
            .
          </p>
        </div>
        <FAQAccordion items={faqs} />
      </div>
    </section>
  );
}
