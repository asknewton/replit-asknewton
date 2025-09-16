import { Card, CardContent } from "@/components/ui/card";

const faqs = [
  {
    question: "Is AskNewton an insurance company?",
    answer: "No, we're not an insurer. We're licensed insurance professionals who provide guidance and help you navigate California's health insurance landscape."
  },
  {
    question: "How much does your service cost?",
    answer: "Our guidance is completely free. We're compensated by insurance companies when you enroll through our recommendations, not by you."
  },
  {
    question: "What if I'm here on a tourist visa?",
    answer: "Tourist visas typically require travel medical insurance. We'll help you understand coverage limits and find options that work for short-term stays."
  }
];

export default function FAQ() {
  return (
    <section className="py-16 bg-muted rounded-2xl">
      <div className="max-w-4xl mx-auto px-8">
        <h2 className="text-3xl font-bold text-foreground text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <Card key={index} data-testid={`faq-item-${index}`}>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
