import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, AlertTriangle, Lightbulb } from "lucide-react";

export default function Student() {
  const calendlyUrl = import.meta.env.VITE_CALENDLY_URL || "https://calendly.com/asknewton/intro";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6" data-testid="button-back-home">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to home
          </Button>
        </Link>
        <h1 className="text-4xl font-bold text-foreground mb-6">Student: F-1 / J-1 or transfers</h1>
      </div>

      <div className="prose prose-lg max-w-none space-y-8">
        <Card className="bg-accent/10 border-accent/20">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Your situation</h2>
            <p className="text-muted-foreground">You're studying in California on a student visa, transferring schools, or bringing dependents. You need to meet university requirements while finding affordable coverage.</p>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Insurance options</h2>
          
          <div className="space-y-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">School SHIP (Student Health Insurance Plan)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-accent mb-2">Pros</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Meets all university requirements</li>
                      <li>• Campus health center access</li>
                      <li>• Student-specific networks</li>
                      <li>• No waiver paperwork</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-destructive mb-2">Cons</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Often more expensive</li>
                      <li>• Limited provider choices</li>
                      <li>• Semester-based billing</li>
                      <li>• May not cover dependents well</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Private insurance with waiver</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-accent mb-2">Pros</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Often significantly cheaper</li>
                      <li>• Broader provider networks</li>
                      <li>• Monthly payments</li>
                      <li>• Better dependent coverage</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-destructive mb-2">Cons</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Waiver application required</li>
                      <li>• Must meet specific criteria</li>
                      <li>• Limited campus health access</li>
                      <li>• Deadlines to navigate</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Waiver requirements</h2>
          <Card className="mb-8">
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-4">Most California universities require your insurance to meet these minimums:</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Coverage minimums</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• $100,000+ medical maximum</li>
                    <li>• $500,000+ major medical</li>
                    <li>• Mental health parity</li>
                    <li>• Prescription drug coverage</li>
                    <li>• Preventive care</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Other requirements</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• California provider network</li>
                    <li>• Pre-existing coverage</li>
                    <li>• Maternity benefits</li>
                    <li>• No annual limits</li>
                    <li>• Emergency evacuation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Special considerations</h2>
          <div className="space-y-4 mb-8">
            <div className="border-l-4 border-accent pl-4">
              <h4 className="font-medium text-foreground flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2 text-accent" />
                Dependent coverage
              </h4>
              <p className="text-sm text-muted-foreground">Spouse/child coverage through SHIP can be very expensive—private family plans often much cheaper</p>
            </div>
            <div className="border-l-4 border-accent pl-4">
              <h4 className="font-medium text-foreground flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2 text-accent" />
                Waiver deadlines
              </h4>
              <p className="text-sm text-muted-foreground">Usually 2-3 weeks after semester starts—miss it and you're stuck with SHIP for the term</p>
            </div>
            <div className="border-l-4 border-accent pl-4">
              <h4 className="font-medium text-foreground flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2 text-accent" />
                TB testing & immunizations
              </h4>
              <p className="text-sm text-muted-foreground">Required for enrollment—understand what your insurance covers for these requirements</p>
            </div>
            <div className="border-l-4 border-accent pl-4">
              <h4 className="font-medium text-foreground flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2 text-accent" />
                Network proximity
              </h4>
              <p className="text-sm text-muted-foreground">Ensure providers near campus—campus health may not accept outside insurance</p>
            </div>
          </div>

          <Card className="bg-muted">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-3 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-accent" />
                Pro tip
              </h3>
              <p className="text-muted-foreground text-sm">Apply for your insurance waiver as soon as you're accepted to your program. Don't wait until you arrive—you need active coverage to submit the waiver.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Link href="/start?persona=student">
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            data-testid="button-start-wizard"
          >
            Start assessment wizard
          </Button>
        </Link>
        <a 
          href={calendlyUrl}
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button 
            variant="outline" 
            size="lg"
            data-testid="button-book-call"
          >
            Book a 15-min call
          </Button>
        </a>
      </div>
    </div>
  );
}
