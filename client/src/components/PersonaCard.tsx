import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PersonaCardProps {
  persona: 'nomad' | 'traveler' | 'student';
  title: string;
  description: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
}

export default function PersonaCard({ 
  persona, 
  title, 
  description, 
  icon, 
  gradientFrom, 
  gradientTo 
}: PersonaCardProps) {
  return (
    <Card className="hover:shadow-md transition-all duration-300 group" data-testid={`card-persona-${persona}`}>
      <CardContent className="p-8">
        <div 
          className={`w-16 h-16 ${gradientFrom} ${gradientTo} bg-gradient-to-br rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform`}
        >
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-4">{title}</h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href={`/${persona}`}>
            <Button variant="outline" className="w-full sm:w-auto" data-testid={`button-learn-more-${persona}`}>
              Learn more
            </Button>
          </Link>
          <Link href={`/start?persona=${persona}`}>
            <Button className="w-full sm:w-auto" data-testid={`button-get-options-${persona}`}>
              Get my options
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
