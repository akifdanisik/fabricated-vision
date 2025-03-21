
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
  category: 'inventory' | 'supplier' | 'contract' | 'compliance';
  isFavorite: boolean;
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    title: 'Paracetamol API Inventory Check',
    snippet: 'Checked stock levels and created reorder for Paracetamol API',
    date: '2 hours ago',
    category: 'inventory',
    isFavorite: true,
  },
  {
    id: '2',
    title: 'Supplier Evaluation Process',
    snippet: 'Discussed evaluation criteria for new excipient suppliers',
    date: 'Yesterday',
    category: 'supplier',
    isFavorite: false,
  },
  {
    id: '3',
    title: 'GMP Certificate Review',
    snippet: 'Reviewed compliance status for PharmaCorp',
    date: '3 days ago',
    category: 'compliance',
    isFavorite: true,
  },
  {
    id: '4',
    title: 'Contract Renewal Discussion',
    snippet: 'Analyzed terms for upcoming contract renewal with MedSource',
    date: '1 week ago',
    category: 'contract',
    isFavorite: false,
  },
  {
    id: '5',
    title: 'Low Stock Alert Response',
    snippet: 'Created workflow for handling low stock situations',
    date: '2 weeks ago',
    category: 'inventory',
    isFavorite: false,
  },
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'inventory':
      return <div className="w-2 h-2 rounded-full bg-blue-500" />;
    case 'supplier':
      return <div className="w-2 h-2 rounded-full bg-green-500" />;
    case 'contract':
      return <div className="w-2 h-2 rounded-full bg-yellow-500" />;
    case 'compliance':
      return <div className="w-2 h-2 rounded-full bg-red-500" />;
    default:
      return <div className="w-2 h-2 rounded-full bg-gray-500" />;
  }
};

const RecentConversations = () => {
  const navigate = useNavigate();
  
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
                  <Button size="sm" variant="outline" className="h-7 text-xs">
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
