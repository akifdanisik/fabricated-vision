
import { Sparkles, Palette, Package, Users, TrendingUp, Calendar, Factory, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WelcomeScreenProps {
  onSelectQuickStart: (prompt: string) => void;
  userName?: string;
}

const WelcomeScreen = ({ onSelectQuickStart, userName = "there" }: WelcomeScreenProps) => {
  const quickStartOptions = [
    {
      icon: Palette,
      title: "Design Brief Analysis",
      description: "Upload design sketches and get fabric recommendations",
      prompt: "Help me analyze this design brief and suggest suitable fabrics and trims",
      color: "bg-purple-50 text-purple-700"
    },
    {
      icon: Factory,
      title: "Factory Sourcing",
      description: "Find manufacturers for your product category",
      prompt: "Find suitable factories for producing women's dresses in sustainable materials",
      color: "bg-blue-50 text-blue-700"
    },
    {
      icon: Package,
      title: "Product Development",
      description: "Track your product from concept to production",
      prompt: "Show me the development timeline for my Spring/Summer collection",
      color: "bg-green-50 text-green-700"
    },
    {
      icon: Award,
      title: "Quality Standards",
      description: "Ensure products meet fashion industry standards",
      prompt: "What quality standards should I check for organic cotton garments?",
      color: "bg-amber-50 text-amber-700"
    },
    {
      icon: TrendingUp,
      title: "Market Trends",
      description: "Get insights on fashion trends and consumer demand",
      prompt: "What are the current trends in sustainable fashion for 2024?",
      color: "bg-rose-50 text-rose-700"
    },
    {
      icon: Calendar,
      title: "Collection Planning",
      description: "Plan your seasonal collections and launch dates",
      prompt: "Help me plan the timeline for my Fall/Winter 2024 collection",
      color: "bg-indigo-50 text-indigo-700"
    }
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-3">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Fashion PLM, {userName}!
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          Your AI-powered Product Lifecycle Management assistant for fashion brands
        </p>
        <p className="text-gray-500">
          From concept to consumer - manage every stage of your fashion product journey
        </p>
      </div>

      <div className="w-full mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Quick Start Options
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickStartOptions.map((option, index) => (
            <Button
              key={index}
              variant="ghost"
              className="h-auto p-6 flex flex-col items-start text-left hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-gray-300"
              onClick={() => onSelectQuickStart(option.prompt)}
            >
              <div className={cn("rounded-lg p-3 mb-4", option.color)}>
                <option.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{option.title}</h3>
              <p className="text-sm text-gray-600">{option.description}</p>
            </Button>
          ))}
        </div>
      </div>

      <div className="text-center">
        <p className="text-gray-500 mb-4">
          Or ask me anything about:
        </p>
        <div className="flex flex-wrap justify-center gap-2 text-sm">
          {[
            "Design Development",
            "Fabric Sourcing",
            "Factory Selection",
            "Quality Control",
            "Trend Analysis",
            "Collection Planning",
            "Sustainability",
            "Cost Management"
          ].map((topic, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() => onSelectQuickStart(`Tell me about ${topic.toLowerCase()} in fashion PLM`)}
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
