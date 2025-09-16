import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Check, X, AlertTriangle } from "lucide-react";

export default function Traveler() {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "14157697858";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi%20AskNewton%2C%20I'm%20a%20traveler%20visiting%20California`;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6" data-testid="button-back-home">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to home
          </Button>
        </Link>
        <h1 className="text-4xl font-bold text-foreground mb-6">Traveler: 1–6 month stays</h1>
      </div>

      <div className="prose prose-lg max-w-none space-y-8">
        <Card className="bg-secondary/10 border-secondary/20">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Your situation</h2>
            <p className="text-muted-foreground">You're visiting California for tourism, business, or temporary work. You need simple, reliable coverage without the complexity of long-term insurance.</p>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Travel medical insurance</h2>
          
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4">What's typically covered</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-accent mb-2 flex items-center">
                    <Check className="w-4 h-4 mr-2" />
                    Covered
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Emergency room visits</li>
                    <li>• Urgent care</li>
                    <li>• Emergency dental (trauma)</li>
                    <li>• Prescription drugs (acute)</li>
                    <li>• Ambulance services</li>
                    <li>• Emergency evacuation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-destructive mb-2 flex items-center">
                    <X className="w-4 h-4 mr-2" />
                    Not covered
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Routine check-ups</li>
                    <li>• Pre-existing conditions</li>
                    <li>• Preventive care</li>
                    <li>• Mental health (varies)</li>
                    <li>• Pregnancy (usually)</li>
                    <li>• High-risk activities</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Choosing the right plan</h2>
          
          <div className="space-y-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-3">Coverage limits</h3>
                <p className="text-muted-foreground text-sm mb-3">Look for at least $100,000 coverage for California healthcare costs</p>
                <div className="bg-muted rounded p-3 text-sm">
                  <strong>Example:</strong> A simple ER visit for stomach pain in San Francisco can easily cost $3,000-5,000
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-3">Deductibles & co-pays</h3>
                <p className="text-muted-foreground text-sm">Lower deductibles mean higher premiums, but less out-of-pocket cost if you need care</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-3">Provider networks</h3>
                <p className="text-muted-foreground text-sm">Some plans require you to call for pre-approval. Know the process before you need care.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Special considerations</h2>
          <div className="space-y-4 mb-8">
            <div className="border-l-4 border-secondary pl-4">
              <h4 className="font-medium text-foreground flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2 text-secondary" />
                Sports & adventure activities
              </h4>
              <p className="text-sm text-muted-foreground">Skiing, surfing, hiking—check if your planned activities are excluded</p>
            </div>
            <div className="border-l-4 border-secondary pl-4">
              <h4 className="font-medium text-foreground flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2 text-secondary" />
                Mental health coverage
              </h4>
              <p className="text-sm text-muted-foreground">Varies widely between plans; important if you have ongoing treatment</p>
            </div>
            <div className="border-l-4 border-secondary pl-4">
              <h4 className="font-medium text-foreground flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2 text-secondary" />
                Claims process
              </h4>
              <p className="text-sm text-muted-foreground">Understand how to file claims—some require payment upfront and reimbursement</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Link href="/start?persona=traveler">
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            data-testid="button-start-wizard"
          >
            Start assessment wizard
          </Button>
        </Link>
        <a 
          href={whatsappUrl}
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button 
            variant="outline" 
            size="lg"
            data-testid="button-whatsapp"
          >
            Chat on WhatsApp
          </Button>
        </a>
      </div>
    </div>
  );
}
