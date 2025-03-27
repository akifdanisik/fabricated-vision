
import Layout from '@/components/layout/Layout';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, FileText, Upload, Download, Sliders, SlidersHorizontal, ZoomIn, ZoomOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ResearchDocument } from '@/components/chat/ResearchDataPanel';
import { Slider } from '@/components/ui/slider';

const Chat = () => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [tableScale, setTableScale] = useState(100);
  const [documents, setDocuments] = useState<ResearchDocument[]>([
    {
      id: '1',
      title: 'FY2024 P&L',
      date: 'Jan 18, 2024',
      documentType: 'Financials',
      risks: 'There have been increasing costs related to...',
      considerations: 'Not in document, click to view explanation'
    },
    {
      id: '2',
      title: 'Project Alpha CIM',
      date: 'Apr 29, 2024',
      documentType: 'Marketing Materials',
      risks: 'Risk factors that are not detailed in the CIM...',
      considerations: 'Despite the growing TAM described within the...'
    },
    {
      id: '3',
      title: 'Product Overview Alpha',
      date: 'Feb 26, 2024',
      documentType: 'Product',
      risks: 'Current product lacks detail regarding the most...',
      considerations: 'Not in document, click to view explanation'
    },
    {
      id: '4',
      title: 'Product Roadmap',
      date: 'Feb 26, 2024',
      documentType: 'Product',
      risks: 'Several integrations listed within the roadmap...',
      considerations: 'Roadmap details particularities that align with...'
    },
    {
      id: '5',
      title: 'Expert Calls Project Alpha',
      date: 'Mar 12, 2024',
      documentType: 'Customer',
      risks: 'Experts hesitate on defensibility of the technology...',
      considerations: 'Experts differ in opinion regarding the growth...'
    },
    {
      id: '6',
      title: 'Customer Reference Calls',
      date: 'Mar 18, 2024',
      documentType: 'Customer',
      risks: 'Common negative feedback across customers...',
      considerations: 'Customers list several tailwinds including the...'
    },
    {
      id: '7',
      title: 'Market Report',
      date: 'Mar 30, 2024',
      documentType: 'Public Report',
      risks: 'Headwinds raised across this report include...',
      considerations: 'The TAM is estimated at approximately $72B...'
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    // Handle submission logic here
    setInput('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const documentTypeColors: Record<string, string> = {
    'Financials': 'bg-purple-100 text-purple-800',
    'Marketing Materials': 'bg-purple-100 text-purple-800',
    'Product': 'bg-red-100 text-red-800',
    'Customer': 'bg-amber-100 text-amber-800',
    'Public Report': 'bg-green-100 text-green-800',
  };

  const handleScaleChange = (value: number[]) => {
    setTableScale(value[0]);
  };

  return (
    <Layout fullWidth hideNavbar>
      <div className="flex flex-col h-[calc(100vh-0px)] bg-gray-50">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-3 border-b bg-white">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-medium text-gray-800">First Screen Project Alpha</h1>
            <span className="text-sm text-gray-500">Saved at 10:49am</span>
          </div>
          <Avatar className="h-8 w-8 border border-gray-200">
            <AvatarImage src="/lovable-uploads/f8f45ba2-ee6c-4621-8127-a7792aa1d1cc.png" alt="User" />
            <AvatarFallback className="text-sm bg-gray-100 text-gray-700">U</AvatarFallback>
          </Avatar>
        </div>
        
        {/* Chat Area */}
        <div className="p-4 flex-grow overflow-auto">
          <Card className="w-full max-w-4xl mx-auto p-6 bg-white shadow-sm">
            {/* User message */}
            <div className="flex mb-6">
              <div className="mr-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/lovable-uploads/f8f45ba2-ee6c-4621-8127-a7792aa1d1cc.png" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </div>
              <div>
                <div className="font-medium mb-1">You</div>
                <p className="text-gray-700">
                  We are meeting the management team of Project Alpha tomorrow. Draft some key DD questions
                  based on your assessment of these documents.
                </p>
              </div>
            </div>

            {/* AI response */}
            <div className="flex mb-6">
              <div className="mr-3">
                <Avatar className="h-10 w-10 bg-blue-100">
                  <AvatarImage src="" alt="Matrix Agent" />
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    <div className="grid grid-cols-2 gap-0.5">
                      <div className="w-2 h-2 bg-blue-600"></div>
                      <div className="w-2 h-2 bg-blue-600"></div>
                      <div className="w-2 h-2 bg-blue-600"></div>
                      <div className="w-2 h-2 bg-blue-600"></div>
                    </div>
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1">
                <div className="font-medium mb-1">Matrix Agent</div>
                <div className="flex items-center mb-2 text-gray-600 text-sm">
                  <span>12 steps completed</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium text-gray-800 mb-3">Key Questions for Meeting with Project Alpha</h3>
                  <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                    <li>What are the key drivers behind the recent changes in your cost structure?</li>
                    <li>How do you plan to address the challenge of supplier concentration risk?</li>
                    <li>What are the specific metrics you use to measure customer engagement and satisfaction?</li>
                    <li>Can you detail the steps being taken to ensure smooth leadership transitions?</li>
                    <li>What is your strategy for leveraging technology to stay ahead of market trends?</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Input area */}
            <div className="relative mt-4">
              <Input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="pr-24 py-6 pl-10 rounded-full border-gray-200 text-gray-700"
              />
              <Upload className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Button 
                type="submit" 
                size="sm" 
                variant="ghost" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 rounded-full"
              >
                <Download className="h-5 w-5 rotate-90" />
              </Button>
            </div>
          </Card>
        </div>
        
        {/* Table Area */}
        <div className="border-t bg-white">
          <div className="px-6 py-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="flex items-center gap-2 text-gray-700">
                <SlidersHorizontal className="h-4 w-4" />
                <span>Display</span>
              </Button>
              
              {/* Table Scale Controls */}
              <div className="flex items-center gap-2 ml-2">
                <ZoomOut className="h-4 w-4 text-gray-500" />
                <Slider
                  value={[tableScale]}
                  min={50}
                  max={150}
                  step={5}
                  onValueChange={handleScaleChange}
                  className="w-32"
                />
                <ZoomIn className="h-4 w-4 text-gray-500" />
                <span className="text-xs text-gray-500 ml-1">{tableScale}%</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Add documents</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <span>Add columns</span>
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <div style={{ transform: `scale(${tableScale / 100})`, transformOrigin: 'top left', transition: 'transform 0.2s ease-in-out' }}>
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="w-8">#</TableHead>
                    <TableHead className="w-8"></TableHead>
                    <TableHead className="w-[250px]">Document</TableHead>
                    <TableHead className="w-[120px]">Date</TableHead>
                    <TableHead className="w-[150px]">Document Type</TableHead>
                    <TableHead>Investment Risks</TableHead>
                    <TableHead>Market Considerations</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc, index) => (
                    <TableRow key={doc.id} className="h-[40px]">
                      <TableCell className="text-gray-500">{index + 1}</TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                            <span className="sr-only">Expand</span>
                            ≡
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        {doc.title}
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {doc.date}
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("font-normal", documentTypeColors[doc.documentType] || "bg-gray-100")}>
                          {doc.documentType}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm max-w-[300px] truncate">
                        {doc.risks}
                      </TableCell>
                      <TableCell className="text-sm max-w-[300px] truncate">
                        {doc.considerations}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          
          <div className="p-2 border-t flex items-center justify-start">
            <Button variant="ghost" size="sm" className="text-gray-500">
              <span>Add row</span>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
