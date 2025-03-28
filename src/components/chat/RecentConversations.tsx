
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageSquare, Star, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Conversation {
  id: string;
  title: string;
  snippet: string;
  date: string;
  category: 'compliance' | 'price' | 'alternatives' | 'supplier' | 'contract' | 'market' | 'cost' | 'document' | 'comparison' | 'innovation';
  isFavorite: boolean;
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    title: 'FDA Compliance for API Suppliers',
    snippet: 'Analyzed suppliers for Paracetamol API with zero FDA 483s in the last 3 years',
    date: '2 hours ago',
    category: 'compliance',
    isFavorite: true,
  },
  {
    id: '2',
    title: 'Market Price Trends: Microcrystalline Cellulose',
    snippet: 'Current market price range for MCC in Southeast Asia with 6-month trends',
    date: 'Yesterday',
    category: 'price',
    isFavorite: false,
  },
  {
    id: '3',
    title: 'Urgent Backup Suppliers for PharmaCorp',
    snippet: 'Found 5 alternative suppliers who can deliver Povidone within 2 weeks',
    date: '3 days ago',
    category: 'alternatives',
    isFavorite: true,
  },
  {
    id: '4',
    title: 'MedSource Supplier Assessment',
    snippet: 'Financial health, delivery performance, and compliance documents analysis',
    date: '1 week ago',
    category: 'supplier',
    isFavorite: false,
  },
  {
    id: '5',
    title: 'Contract Force Majeure Analysis',
    snippet: 'Highlighted unusual force majeure clauses in GlobalAPI\'s contract compared to industry standards',
    date: '2 weeks ago',
    category: 'contract',
    isFavorite: false,
  },
  {
    id: '6',
    title: 'Raw Material Shortages: Magnesium Stearate',
    snippet: 'Current supply chain disruptions and tariff impacts on excipient availability',
    date: '3 weeks ago',
    category: 'market',
    isFavorite: true,
  },
  {
    id: '7',
    title: 'Price Optimization Opportunities',
    snippet: 'Identified 8 suppliers with prices >10% above market average for potential renegotiation',
    date: '1 month ago',
    category: 'cost',
    isFavorite: false,
  },
  {
    id: '8',
    title: 'GMP Certification Verification',
    snippet: 'Retrieved latest GMP certificates for AsiaPharm from EMA/FDA databases',
    date: '1 month ago',
    category: 'document',
    isFavorite: false,
  },
  {
    id: '9',
    title: 'Supplier Comparison: BioChem vs PharmSynth',
    snippet: 'Comparative analysis on price, lead time, and FDA inspection history',
    date: '2 months ago',
    category: 'comparison',
    isFavorite: true,
  },
  {
    id: '10',
    title: 'Continuous Manufacturing Innovation',
    snippet: 'Research on suppliers investing in continuous manufacturing technology',
    date: '2 months ago',
    category: 'innovation',
    isFavorite: false,
  }
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'compliance':
      return <div className="w-2 h-2 rounded-full bg-red-500" />;
    case 'price':
    case 'cost':
      return <div className="w-2 h-2 rounded-full bg-green-500" />;
    case 'alternatives':
      return <div className="w-2 h-2 rounded-full bg-yellow-500" />;
    case 'supplier':
    case 'comparison':
      return <div className="w-2 h-2 rounded-full bg-blue-500" />;
    case 'contract':
    case 'document':
      return <div className="w-2 h-2 rounded-full bg-purple-500" />;
    case 'market':
      return <div className="w-2 h-2 rounded-full bg-orange-500" />;
    case 'innovation':
      return <div className="w-2 h-2 rounded-full bg-cyan-500" />;
    default:
      return <div className="w-2 h-2 rounded-full bg-gray-500" />;
  }
};

const RecentConversations = () => {
  const navigate = useNavigate();
  
  const handleContinueChat = (id: string) => {
    navigate(`/chat?id=${id}`);
  };
  
  const handleConversationClick = (id: string) => {
    navigate(`/chat?id=${id}`);
  };
  
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="p-4 border-b">
        <CardTitle className="text-xl">Recent Conversations</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-240px)]">
          <div className="p-4 space-y-3">
            {mockConversations.map((conversation) => (
              <div 
                key={conversation.id} 
                className="p-3 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => handleConversationClick(conversation.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 bg-primary/10">
                      <AvatarFallback><MessageSquare className="h-4 w-4 text-primary" /></AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm">{conversation.title}</h4>
                        {conversation.isFavorite && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">{conversation.snippet}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {conversation.date}
                    </div>
                    <div className="flex items-center gap-1">
                      {getCategoryIcon(conversation.category)}
                      <span className="text-xs capitalize text-muted-foreground">
                        {conversation.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="h-7 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleContinueChat(conversation.id);
                    }}
                  >
                    Continue <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RecentConversations;
