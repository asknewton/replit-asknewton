import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, AlertTriangle } from "lucide-react";

export default function Nomad() {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "14157697858";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi%20AskNewton%2C%20I'm%20a%20nomad%20arriving%20in%20California`;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6" data-testid="button-back-home">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to home
          </Button>
        </Link>
        <h1 className="text-4xl font-bold text-foreground mb-6">Nomad: Remote workers, founders, contractors</h1>
      </div>

      <div className="prose prose-lg max-w-none space-y-8">
        <Card className="bg-accent/10 border-accent/20">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Your situation</h2>
            <p className="text-muted-foreground">You're location-independent, working remotely, running a business, or freelancing. You might be here for a few months or testing out California before making it permanent.</p>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Insurance options overview</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-3">Travel Medical Insurance</h3>
                <p className="text-muted-foreground text-sm mb-3">Best for: Short stays (under 6 months)</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Emergency coverage only</li>
                  <li>• No preventive care</li>
                  <li>• Limited provider networks</li>
                  <li>• $50-200/month typically</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-3">Short-term Medical</h3>
                <p className="text-muted-foreground text-sm mb-3">Best for: 3-12 month stays</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Major medical coverage</li>
                  <li>• Some preventive benefits</li>
                  <li>• Pre-existing exclusions</li>
                  <li>• $150-400/month typically</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-3">ACA Marketplace Plans</h3>
              <p className="text-muted-foreground text-sm mb-3">Best for: California residents or those establishing residency</p>
              <div className="text-sm text-muted-foreground space-y-2">
                <p><strong>Requirements:</strong> Must have California address and intent to remain</p>
                <p><strong>Benefits:</strong> Full medical coverage, preventive care, prescription drugs</p>
                <p><strong>Gotcha:</strong> Premium tax credits require tax filing as California resident</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Common gotchas</h2>
          <div className="space-y-4 mb-8">
            <div className="border-l-4 border-destructive pl-4">
              <h4 className="font-medium text-foreground flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2 text-destructive" />
                Provider networks
              </h4>
              <p className="text-sm text-muted-foreground">Travel insurance may not cover your preferred doctors or hospitals</p>
            </div>
            <div className="border-l-4 border-destructive pl-4">
              <h4 className="font-medium text-foreground flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2 text-destructive" />
                Pre-existing conditions
              </h4>
              <p className="text-sm text-muted-foreground">Most short-term plans exclude pre-existing conditions entirely</p>
            </div>
            <div className="border-l-4 border-destructive pl-4">
              <h4 className="font-medium text-foreground flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2 text-destructive" />
                ER costs
              </h4>
              <p className="text-sm text-muted-foreground">Even with insurance, California ER visits can cost $1,000+ out of pocket</p>
            </div>
            <div className="border-l-4 border-destructive pl-4">
              <h4 className="font-medium text-foreground flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2 text-destructive" />
                Proof of address
              </h4>
              <p className="text-sm text-muted-foreground">Marketplace plans require California residency documentation</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Link href="/start?persona=nomad">
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
