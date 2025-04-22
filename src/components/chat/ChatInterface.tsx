import { useState, useRef, useEffect } from 'react';
import { Send, Mic, PlusCircle, Search, Grid, Eye, ThumbsUp, ThumbsDown, RefreshCw, Copy, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import ActionPreview, { ActionItem } from './ActionPreview';
import ModuleSelector, { ModuleItem } from './ModuleSelector';
import WelcomeScreen from './WelcomeScreen';
import { toast } from '@/hooks/use-toast';
import CategoryActions from './CategoryActions';
import ModuleRenderer from './ModuleRenderer';
import ResearchDataPanel, { ResearchDocument } from './ResearchDataPanel';
import ResultsTable from './ResultsTable';
import { Supplier } from '@/components/suppliers/SuppliersTable';
import { predefinedCategories } from '@/components/categories/CategoryBadge';
import DraggableMessage from './DraggableMessage';
import { useCustomActions } from '@/hooks/use-custom-actions';
import ChatSuppliersTable from './ChatSuppliersTable';
import { 
  Popover, 
  PopoverTrigger, 
  PopoverContent 
} from '@/components/ui/popover';
import ProductImageSandbox from './ProductImageSandbox';

interface NumberedItem {
  id: string;
  title: string;
  description: string;
  type: 'risk' | 'finding' | 'document' | 'supplier';
  severity?: 'low' | 'medium' | 'high';
}

interface NumberIndicator {
  id: string;
  number: number;
  items: NumberedItem[];
  type: 'risk' | 'finding' | 'document' | 'supplier';
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  moduleType?: string;
  moduleData?: any;
  actions?: {
    label: string;
    onClick: () => void;
  }[];
  isResearch?: boolean;
  suppliers?: Supplier[];
  numberedIndicators?: NumberIndicator[];
}

interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

  const [previewActions, setPreviewActions] = useState<ActionItem[]>([]);
  const [previewTitle, setPreviewTitle] = useState('Suggested Actions');
  const [previewDescription, setPreviewDescription] = useState('Ask questions about inventory, suppliers, or orders to see actionable suggestions.');

  const [moduleSelectOpen, setModuleSelectOpen] = useState(false);
  const [activeModules, setActiveModules] = useState<ModuleItem[]>([]);
  
  const [conversationContext, setConversationContext] = useState<{
    type: string;
    step: number;
    data: Record<string, any>;
  } | null>(null);

  const [researchData, setResearchData] = useState<ResearchDocument[]>([]);
  const [showResearchPanel, setShowResearchPanel] = useState(false);
  const [isResearching, setIsResearching] = useState(false);

  const [supplierResults, setSupplierResults] = useState<Supplier[]>([]);
  const [showResultsTable, setShowResultsTable] = useState(false);
  const [resultsTableTitle, setResultsTableTitle] = useState("Top Suppliers");

  const [isDragging, setIsDragging] = useState(false);
  const [activeIndicator, setActiveIndicator] = useState<string | null>(null);
  const [productImages, setProductImages] = useState<Product[]>([]);
  const [showProductSandbox, setShowProductSandbox] = useState(false);
  const { 
    customActions, 
    addCustomAction, 
    removeCustomAction, 
    clearCustomActions 
  } = useCustomActions();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (showWelcomeScreen) {
      setShowWelcomeScreen(false);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    const isResearchQuestion = checkIfResearchQuestion(input);
    if (isResearchQuestion) {
      setIsResearching(true);
      setShowResearchPanel(true);
    }

    setTimeout(() => {
      if (conversationContext) {
        const aiResponse = handleConversationFlow(input, conversationContext);
        setMessages(prev => [...prev, aiResponse]);
      } else {
        const lowerCaseInput = input.toLowerCase();
        if (lowerCaseInput.includes('show') || lowerCaseInput.includes('display') || lowerCaseInput.includes('get')) {
          const moduleResponse = handleModuleRequest(input);
          setMessages(prev => [...prev, moduleResponse]);
        } else {
          const aiResponse = generateAIResponse(input, isResearchQuestion);
          setMessages(prev => [...prev, aiResponse]);
          
          if (isResearchQuestion) {
            simulateResearch(input);
          }
        }
      }
      
      updatePreviewActions(input.toLowerCase());
    }, 1000);
  };

  const checkIfResearchQuestion = (input: string): boolean => {
    const lowerCaseInput = input.toLowerCase();
    return (
      lowerCaseInput.includes('research') || 
      lowerCaseInput.includes('analyze') || 
      lowerCaseInput.includes('find information') || 
      lowerCaseInput.includes('look up') ||
      lowerCaseInput.includes('market data') ||
      lowerCaseInput.includes('expert') ||
      lowerCaseInput.includes('report')
    );
  };

  const simulateResearch = (query: string) => {
    setTimeout(() => {
      const mockDocuments: ResearchDocument[] = [
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
      ];
      
      setResearchData(mockDocuments);
      setIsResearching(false);
      
      const mockRiskItems: NumberedItem[] = [
        {
          id: 'risk-1',
          title: 'Legal Compliance Risk',
          description: 'The merger agreement contains potential regulatory compliance issues in section 3.4.',
          type: 'risk',
          severity: 'high'
        },
        {
          id: 'risk-2',
          title: 'Financial Exposure',
          description: 'Current product pricing strategy may lead to margin compression post-merger.',
          type: 'risk',
          severity: 'medium'
        },
        {
          id: 'risk-3',
          title: 'Integration Timeline',
          description: 'System integration plan lacks specific milestones for tech stack consolidation.',
          type: 'risk',
          severity: 'high'
        }
      ];
      
      const mockFindingItems: NumberedItem[] = [
        {
          id: 'finding-1',
          title: 'Market Opportunity',
          description: 'Combined TAM increases by approximately 37% post-merger.',
          type: 'finding'
        },
        {
          id: 'finding-2',
          title: 'Cost Synergies',
          description: 'Potential $4.2M in annual cost savings identified across operations.',
          type: 'finding'
        }
      ];
      
      const researchSummaryMessage: Message = {
        id: Date.now().toString(),
        content: "I've analyzed 7 documents related to your query. Key insights include:\n\n- Financial documents show increasing costs\n- Expert opinions are divided on technology defensibility\n- The estimated market size (TAM) is approximately $72B\n- Several product integration risks have been identified\n\nYou can review the detailed research data in the panel below.",
        sender: 'ai',
        timestamp: new Date(),
        isResearch: true,
        numberedIndicators: [
          {
            id: 'risks-indicator',
            number: 3,
            items: mockRiskItems,
            type: 'risk'
          },
          {
            id: 'findings-indicator',
            number: 2,
            items: mockFindingItems,
            type: 'finding'
          }
        ],
        actions: [
          { 
            label: 'Close research panel', 
            onClick: () => setShowResearchPanel(false)
          },
          { 
            label: 'Download full report', 
            onClick: () => toast({
              title: "Download Started",
              description: "Your report download has started"
            })
          }
        ]
      };
      
      setMessages(prev => [...prev, researchSummaryMessage]);
    }, 3000);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
    setTimeout(() => {
      handleSubmit({ preventDefault: () => {} } as React.FormEvent);
    }, 100);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const handleSelectModule = (moduleId: string) => {
    const moduleItem = availableModules.find(m => m.id === moduleId);
    
    if (!moduleItem) return;
    
    if (showWelcomeScreen) {
      setShowWelcomeScreen(false);
    }
    
    if (activeModules.some(m => m.id === moduleId)) {
      toast({
        title: "Module already active",
        description: `${moduleItem.title} is already active`
      });
      setModuleSelectOpen(false);
      return;
    }
    
    setActiveModules(prev => [...prev, moduleItem]);
    setModuleSelectOpen(false);
    
    setTimeout(() => {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        content: `I've activated the ${moduleItem.title} module. You can now ask me about ${moduleItem.title.toLowerCase()} related questions.`,
        sender: 'ai',
        timestamp: new Date(),
        actions: [
          { 
            label: `Tell me about ${moduleItem.title}`, 
            onClick: () => handleQuickPrompt(`Explain what the ${moduleItem.title} module can do`)
          }
        ]
      };
      setMessages(prev => [...prev, welcomeMessage]);
      
      updateModulePreviewActions(moduleItem);
    }, 500);
    
    toast({
      title: "Module Activated",
      description: `${moduleItem.title} module has been activated`
    });
  };

  const updateModulePreviewActions = (module: ModuleItem) => {
    if (module.id === 'contract-risk') {
      setPreviewTitle('Smart Contract Risk Management');
      setPreviewDescription('Analyze and identify risks in smart contracts');
      setPreviewActions([
        {
          id: '1',
          title: 'Analyze Contract',
          description: 'Upload and analyze a smart contract for risks',
          icon: 'fileSearch',
          actionLabel: 'Upload Contract',
          onClick: () => handleQuickPrompt('I want to analyze a smart contract for risks'),
          category: 'Analysis'
        },
        {
          id: '2',
          title: 'Risk Assessment',
          description: 'Get a comprehensive risk assessment report',
          icon: 'shield',
          actionLabel: 'Get Report',
          onClick: () => handleQuickPrompt('Generate a risk assessment report for my contracts'),
          category: 'Reports'
        },
        {
          id: '3',
          title: 'Security Best Practices',
          description: 'Learn about smart contract security best practices',
          icon: 'book',
          actionLabel: 'View Guidelines',
          onClick: () => handleQuickPrompt('What are the best practices for smart contract security?'),
          category: 'Education'
        }
      ]);
    } else if (module.id === 'supplier-assessment') {
      setPreviewTitle('Supplier Assessment');
      setPreviewDescription('Evaluate suppliers based on performance metrics');
      setPreviewActions([
        {
          id: '1',
          title: 'Evaluate Supplier',
          description: 'Analyze a supplier\'s performance metrics',
          icon: 'chart',
          actionLabel: 'Evaluate',
          onClick: () => handleQuickPrompt('Evaluate the performance of PharmaCorp supplier'),
          category: 'Analysis'
        },
        {
          id: '2',
          title: 'Compare Suppliers',
          description: 'Compare multiple suppliers side by side',
          icon: 'list',
          actionLabel: 'Compare',
          onClick: () => handleQuickPrompt('Compare PharmaCorp with BioTech Materials'),
          category: 'Analysis'
        }
      ]);
    } else {
      setPreviewTitle(`${module.title}`);
      setPreviewDescription(`${module.description}`);
      setPreviewActions([
        {
          id: '1',
          title: `Use ${module.title}`,
          description: `Start using the ${module.title} module`,
          icon: 'link',
          actionLabel: 'Start',
          onClick: () => handleQuickPrompt(`I want to use the ${module.title} module`),
          category: 'Actions'
        }
      ]);
    }
  };

  const updatePreviewActions = (query: string) => {
    if (query.includes('supplier') || query.includes('vendor')) {
      setPreviewTitle('Supplier Management');
      setPreviewDescription('Manage your supplier relationships');
      setPreviewActions([
        {
          id: '1',
          title: 'Supplier Performance',
          description: 'View performance metrics for all suppliers',
          icon: 'chart',
          actionLabel: 'View Performance',
          onClick: () => window.location.href = '/suppliers/performance',
          category: 'Analytics'
        },
        {
          id: '2',
          title: 'Add New Supplier',
          description: 'Register a new supplier in the system',
          icon: 'list',
          actionLabel: 'Add Supplier',
          onClick: () => window.location.href = '/suppliers/new',
          category: 'Actions'
        },
        {
          id: '3',
          title: 'Find GMP Certified Suppliers',
          description: 'Search for suppliers with GMP certification',
          icon: 'fileSearch',
          actionLabel: 'Search',
          onClick: () => handleQuickPrompt('Find suppliers with GMP certification'),
          category: 'Search'
        }
      ]);
    } else if (query.includes('find supplier') || query.includes('gmp')) {
      setPreviewTitle('Supplier Search');
      setPreviewDescription('Find and compare suppliers based on criteria');
      setPreviewActions([
        {
          id: '1',
          title: 'Compare Top Suppliers',
          description: 'Compare the top suppliers side by side',
          icon: 'chart',
          actionLabel: 'Compare',
          onClick: () => handleQuickPrompt('Compare top suppliers'),
          category: 'Analysis'
        },
        {
          id: '2',
          title: 'Create RFQ',
          description: 'Create a request for quotation',
          icon: 'package',
          actionLabel: 'Create RFQ',
          onClick: () => handleQuickPrompt('Create RFQ for Paracetamol API'),
          category: 'Actions'
        },
        {
          id: '3',
          title: 'View Supplier Profiles',
          description: 'See detailed profiles of recommended suppliers',
          icon: 'list',
          actionLabel: 'View Profiles',
          onClick: () => handleQuickPrompt('Show supplier profiles'),
          category: 'Information'
        }
      ]);
    } else {
      if (query.includes('inventory') || query.includes('stock')) {
        setPreviewTitle('Inventory Management');
        setPreviewDescription('Take action on your inventory levels');
        setPreviewActions([
          {
            id: '1',
            title: 'Create Purchase Order',
            description: 'Create a new purchase order for low stock items',
            icon: 'package',
            actionLabel: 'Create Order',
            onClick: () => window.location.href = '/inventory/new-order',
            category: 'Orders'
          },
          {
            id: '2',
            title: 'Inventory Analysis',
            description: 'View detailed analysis of current inventory levels',
            icon: 'chart',
            actionLabel: 'View Analysis',
            onClick: () => window.location.href = '/reports/inventory',
            category: 'Reports'
          },
          {
            id: '3',
            title: 'Set Reorder Points',
            description: 'Configure automatic reorder points for critical items',
            icon: 'list',
            actionLabel: 'Configure',
            onClick: () => window.location.href = '/inventory/settings',
            category: 'Settings'
          }
        ]);
      } else if (query.includes('supplier') || query.includes('vendor')) {
        setPreviewTitle('Supplier Management');
        setPreviewDescription('Manage your supplier relationships');
        setPreviewActions([
          {
            id: '1',
            title: 'Supplier Performance',
            description: 'View performance metrics for all suppliers',
            icon: 'chart',
            actionLabel: 'View Performance',
            onClick: () => window.location.href = '/suppliers/performance',
            category: 'Analytics'
          },
          {
            id: '2',
            title: 'Add New Supplier',
            description: 'Register a new supplier in the system',
            icon: 'list',
            actionLabel: 'Add Supplier',
            onClick: () => window.location.href = '/suppliers/new',
            category: 'Actions'
          }
        ]);
      } else if (query.includes('order') || query.includes('purchase')) {
        setPreviewTitle('Order Management');
        setPreviewDescription('Manage and create purchase orders');
        setPreviewActions([
          {
            id: '1',
            title: 'Create Purchase Order',
            description: 'Create a new purchase order',
            icon: 'package',
            actionLabel: 'Create Order',
            onClick: () => window.location.href = '/inventory/new-order',
            category: 'Actions'
          },
          {
            id: '2',
            title: 'View Recent Orders',
            description: 'See all recent purchase orders',
            icon: 'list',
            actionLabel: 'View Orders',
            onClick: () => window.location.href = '/inventory/orders',
            category: 'Reports'
          }
        ]);
      } else {
        setPreviewTitle('Suggested Actions');
        setPreviewDescription('Ask questions about inventory, suppliers, or orders to see actionable suggestions.');
        setPreviewActions([]);
      }
    }
  };

  const handleConversationFlow = (userInput: string, context: { type: string; step: number; data: Record<string, any> }): Message => {
    if (context.type === 'rfq') {
      switch (context.step) {
        case 1: // Asked for quantity
          const updatedData = { ...context.data, quantity: userInput };
          setConversationContext({ type: 'rfq', step: 2, data: updatedData });
          return {
            id: Date.now().toString(),
            content: 'What is your delivery timeline?',
            sender: 'ai',
            timestamp: new Date(),
            actions: [
              { label: 'Urgent (1-2 weeks)', onClick: () => handleQuickPrompt('Urgent (1-2 weeks)') },
              { label: 'Standard (4-6 weeks)', onClick: () => handleQuickPrompt('Standard (4-6 weeks)') },
              { label: 'Flexible (8+ weeks)', onClick: () => handleQuickPrompt('Flexible (8+ weeks)') }
            ]
          };
        case 2: // Asked for timeline
          const timelineData = { ...context.data, timeline: userInput };
          setConversationContext({ type: 'rfq', step: 3, data: timelineData });
          return {
            id: Date.now().toString(),
            content: 'Would you like to include quality specifications?',
            sender: 'ai',
            timestamp: new Date(),
            actions: [
              { label: 'Standard GMP specs', onClick: () => handleQuickPrompt('Standard GMP specs') },
              { label: 'Custom specifications', onClick: () => handleQuickPrompt('Custom specifications') },
              { label: 'No additional specs', onClick: () => handleQuickPrompt('No additional specs') }
            ]
          };
        case 3: // Asked for quality specs
          setConversationContext(null);
          return {
            id: Date.now().toString(),
            content: `Great! I've created an RFQ for ${context.data.product} with the following details:\n\nQuantity: ${context.data.quantity}\nTimeline: ${context.data.timeline}\nSpecifications: ${userInput}\n\nThe RFQ has been sent to the top 3 matching suppliers. You'll receive responses within 48 hours.`,
            sender: 'ai',
            timestamp: new Date(),
            actions: [
              { label: 'View RFQ details', onClick: () => window.location.href = '/rfq/details' },
              { label: 'Track RFQ status', onClick: () => window.location.href = '/rfq/track' }
            ]
          };
        default:
          setConversationContext(null);
          return generateAIResponse(userInput, false);
      }
    }
    
    setConversationContext(null);
    return generateAIResponse(userInput, false);
  };

  const generateAIResponse = (userInput: string, isResearchRequest: boolean): Message => {
    const lowerCaseInput = userInput.toLowerCase();
    
    if (isResearchRequest) {
      return {
        id: Date.now().toString(),
        content: "I'm currently researching information related to your query. This may take a moment as I search through relevant documents and data sources...",
        sender: 'ai',
        timestamp: new Date(),
        isResearch: true
      };
    }
    
    if (lowerCaseInput.includes('top') && (lowerCaseInput.includes('supplier') || lowerCaseInput.includes('vendor'))) {
      const topSuppliers: Supplier[] = [
        {
          id: '1',
          name: 'PharmaCorp',
          category: 'Active Ingredients',
          categories: [
            predefinedCategories.find(c => c.id === 'apis')!
          ],
          performance: 95,
          riskLevel: 'low',
          items: 32,
          contact: {
            name: 'Alex Johnson',
            email: 'alex.johnson@pharmaco.com',
            phone: '+1 (555) 123-4567',
          },
          location: 'Boston, USA',
          initials: 'PC',
        },
        {
          id: '2',
          name: 'BioTech Materials',
          category: 'Excipients',
          categories: [
            predefinedCategories.find(c => c.id === 'excipients')!
          ],
          performance: 92,
          riskLevel: 'low',
          items: 28,
          contact: {
            name: 'Maria Garcia',
            email: 'mgarcia@biotechmat.com',
          },
          location: 'Barcelona, Spain',
          initials: 'BM',
        },
        {
          id: '3',
          name: 'ChemSource Inc.',
          category: 'Excipients',
          categories: [
            predefinedCategories.find(c => c.id === 'excipients')!,
            predefinedCategories.find(c => c.id === 'chemicals')!
          ],
          performance: 90,
          riskLevel: 'low',
          items: 24,
          contact: {
            name: 'David Lee',
            email: 'd.lee@chemsource.com',
          },
          location: 'Singapore',
          initials: 'CS',
        },
        {
          id: '4',
          name: 'GlobalPharma Suppliers',
          category: 'Active Ingredients',
          categories: [
            predefinedCategories.find(c => c.id === 'apis')!
          ],
          performance: 89,
          riskLevel: 'low',
          items: 45,
          contact: {
            name: 'Robert Wilson',
            email: 'rwilson@globalpharm.com',
          },
          location: 'London, UK',
          initials: 'GS',
        },
        {
          id: '5',
          name: 'MedSource Inc.',
          category: 'Active Ingredients',
          categories: [
            predefinedCategories.find(c => c.id === 'apis')!,
            predefinedCategories.find(c => c.id === 'chemicals')!
          ],
          performance: 87,
          riskLevel: 'low',
          items: 19,
          contact: {
            name: 'John Smith',
            email: 'j.smith@medsource.com',
          },
          location: 'San Francisco, USA',
          initials: 'MI',
        },
        {
          id: '6',
          name: 'PharmaQuality Group',
          category: 'Active Ingredients',
          categories: [
            predefinedCategories.find(c => c.id === 'apis')!
          ],
          performance: 86,
          riskLevel: 'low',
          items: 30,
          contact: {
            name: 'Lisa Chen',
            email: 'lchen@pharmaquality.com',
          },
          location: 'Toronto, Canada',
          initials: 'PQ',
        },
        {
          id: '7',
          name: 'EuroMed Suppliers',
          category: 'Excipients',
          categories: [
            predefinedCategories.find(c => c.id === 'excipients')!
          ],
          performance: 85,
          riskLevel: 'low',
          items: 22,
          contact: {
            name: 'Thomas Müller',
            email: 't.muller@euromed.de',
          },
          location: 'Munich, Germany',
          initials: 'EM',
        },
        {
          id: '8',
          name: 'AsiaPharma Connect',
          category: 'Packaging',
          categories: [
            predefinedCategories.find(c => c.id === 'packaging')!
          ],
          performance: 84,
          riskLevel: 'low',
          items: 37,
          contact: {
            name: 'Hiroshi Tanaka',
            email: 'h.tanaka@asiapharma.jp',
          },
          location: 'Tokyo, Japan',
          initials: 'AC',
        },
        {
          id: '9',
          name: 'Quality Chemicals Ltd',
          category: 'Chemicals',
          categories: [
            predefinedCategories.find(c => c.id === 'chemicals')!
          ],
          performance: 83,
          riskLevel: 'low',
          items: 41,
          contact: {
            name: 'Sarah Johnson',
            email: 'sjohnson@qualitychem.co.uk',
          },
          location: 'Manchester, UK',
          initials: 'QC',
        },
        {
          id: '10',
          name: 'PackTech Solutions',
          category: 'Packaging',
          categories: [
            predefinedCategories.find(c => c.id === 'packaging')!
          ],
          performance: 82,
          riskLevel: 'low',
          items: 32,
          contact: {
            name: 'Sarah Miller',
            email: 'sarah@packtech.com',
          },
          location: 'Chicago, USA',
          initials: 'PS',
        },
      ];

      let numSuppliers = 10;
      const numMatch = userInput.match(/top\s+(\d+)/i);
      if (numMatch && numMatch[1]) {
        numSuppliers = Math.min(parseInt(numMatch[1], 10), topSuppliers.length);
      }
      
      const displayedSuppliers = topSuppliers.slice(0, numSuppliers);
      
      return {
        id: Date.now().toString(),
        content: `Here are the top ${numSuppliers} suppliers based on performance metrics, risk assessment, and operational reliability:`,
        sender: 'ai',
        timestamp: new Date(),
        suppliers: displayedSuppliers,
        actions: [
          { 
            label: 'Compare top 3', 
            onClick: () => handleQuickPrompt('Compare top 3 suppliers')
          },
          { 
            label: 'Filter by API suppliers only', 
            onClick: () => handleQuickPrompt('Show top API suppliers')
          },
          { 
            label: 'View full supplier details', 
            onClick: () => window.location.href = '/suppliers'
          }
        ]
      };
    } else if (lowerCaseInput.includes('find supplier') && lowerCaseInput.includes('paracetamol') && lowerCaseInput.includes('gmp')) {
      const paracetamolSuppliers: Supplier[] = [
        {
          id: '1',
          name: 'PharmaCorp',
          category: 'Active Ingredients',
          categories: [
            predefinedCategories.find(c => c.id === 'apis')!
          ],
          performance: 95,
          riskLevel: 'low',
          items: 12,
          contact: {
            name: 'Alex Johnson',
            email: 'alex.johnson@pharmaco.com',
            phone: '+1 (555) 123-4567',
          },
          location: 'Boston, USA',
          initials: 'PC',
        },
        {
          id: '2',
          name: 'BioTech Materials',
          category: 'Active Ingredients',
          categories: [
            predefinedCategories.find(c => c.id === 'apis')!
          ],
          performance: 90,
          riskLevel: 'low',
          items: 8,
          contact: {
            name: 'Maria Garcia',
            email: 'mgarcia@biotechmat.com',
          },
          location: 'Barcelona, Spain',
          initials: 'BM',
        },
        {
          id: '3',
          name: 'PharmaQuality Group',
          category: 'Active Ingredients',
          categories: [
            predefinedCategories.find(c => c.id === 'apis')!
          ],
          performance: 88,
          riskLevel: 'low',
          items: 10,
          contact: {
            name: 'Lisa Chen',
            email: 'lchen@pharmaquality.com',
          },
          location: 'Toronto, Canada',
          initials: 'PQ',
        },
        {
          id: '4',
          name: 'GlobalPharma Suppliers',
          category: 'Active Ingredients',
          categories: [
            predefinedCategories.find(c => c.id === 'apis')!
          ],
          performance: 85,
          riskLevel: 'low',
          items: 7,
          contact: {
            name: 'Robert Wilson',
            email: 'rwilson@globalpharm.com',
          },
          location: 'London, UK',
          initials: 'GS',
        },
        {
          id: '5',
          name: 'MedSource Inc.',
          category: 'Active Ingredients',
          categories: [
            predefinedCategories.find(c => c.id === 'apis')!
          ],
          performance: 82,
          riskLevel: 'low',
          items: 6,
          contact: {
            name: 'John Smith',
            email: 'j.smith@medsource.com',
          },
          location: 'San Francisco, USA',
          initials: 'MI',
        }
      ];
      
      return {
        id: Date.now().toString(),
        content: 'Here are 5 suppliers for Paracetamol API with GMP certification:',
        sender: 'ai',
        timestamp: new Date(),
        suppliers: paracetamolSuppliers,
        actions: [
          { 
            label: 'Compare Suppliers', 
            onClick: () => handleQuickPrompt('Compare suppliers for Paracetamol API')
          },
          { 
            label: 'Create RFQ', 
            onClick: () => {
              setConversationContext({ 
                type: 'rfq', 
                step: 1, 
                data: { product: 'Paracetamol API' } 
              });
              handleQuickPrompt('I want to create an RFQ for Paracetamol API')
            }
          },
          { 
            label: 'View Supplier Profiles', 
            onClick: () => handleQuickPrompt('Show me the profiles of these Paracetamol API suppliers')
          }
        ]
      };
    } else if (lowerCaseInput.includes('compare') && lowerCaseInput.includes('supplier')) {
      const suppliersToCompare: Supplier[] = [
        {
          id: '1',
          name: 'PharmaCorp',
          category: 'Active Ingredients',
          categories: [
            predefinedCategories.find(c => c.id === 'apis')!
          ],
          performance: 95,
          riskLevel: 'low',
          items: 32,
          contact: {
            name: 'Alex Johnson',
            email: 'alex.johnson@pharmaco.com',
            phone: '+1 (555) 123-4567',
          },
          location: 'Boston, USA',
          initials: 'PC',
        },
        {
          id: '2',
          name: 'BioTech Materials',
          category: 'Active Ingredients',
          categories: [
            predefinedCategories.find(c => c.id === 'apis')!
          ],
          performance: 90,
          riskLevel: 'low',
          items: 28,
          contact: {
            name: 'Maria Garcia',
            email: 'mgarcia@biotechmat.com',
          },
          location: 'Barcelona, Spain',
          initials: 'BM',
        },
        {
          id: '3',
          name: 'ChemSource Inc.',
          category: 'Excipients',
          categories: [
            predefinedCategories.find(c => c.id === 'excipients')!,
            predefinedCategories.find(c => c.id === 'chemicals')!
          ],
          performance: 90,
          riskLevel: 'low',
          items: 24,
          contact: {
            name: 'David Lee',
            email: 'd.lee@chemsource.com',
          },
          location: 'Singapore',
          initials: 'CS',
        }
      ];
      
      return {
        id: Date.now().toString(),
        content: 'Here\'s a comparison of the selected suppliers:',
        sender: 'ai',
        timestamp: new Date(),
        suppliers: suppliersToCompare,
        actions: [
          { 
            label: 'Contact PharmaCorp', 
            onClick: () => handleQuickPrompt('I want to contact PharmaCorp')
          },
          { 
            label: 'View full comparison report', 
            onClick: () => window.location.href = '/suppliers/compare'
          },
          { 
            label: 'Create RFQ with these suppliers', 
            onClick: () => handleQuickPrompt('Create RFQ with PharmaCorp, BioTech Materials, and ChemSource')
          }
        ]
      };
    } else if (lowerCaseInput.includes('hydrochloric acid') || lowerCaseInput.includes('hcl')) {
      setProductImages([
        {
          id: '1',
          name: 'Hydrochloric Acid (37%)',
          image: '/public/lovable-uploads/0956f925-373d-40e5-a6ce-8d986514ff7f.png',
          description: 'High purity hydrochloric acid for pharmaceutical applications'
        }
      ]);
      setShowProductSandbox(true);
    } else if (lowerCaseInput.includes('supplier') && lowerCaseInput.includes('acid')) {
      setProductImages([
        {
          id: '1',
          name: 'Hydrochloric Acid (37%)',
          image: '/public/lovable-uploads/0956f925-373d-40e5-a6ce-8d986514ff7f.png',
          description: 'High purity hydrochloric acid for pharmaceutical applications'
        },
        {
          id: '2',
          name: 'Sulfuric Acid',
          image: 'https://placehold.co/200x200?text=Sulfuric+Acid',
          description: 'Industrial grade sulfuric acid'
        },
        {
          id: '3',
          name: 'Nitric Acid',
          image: 'https://placehold.co/200x200?text=Nitric+Acid',
          description: 'Laboratory grade nitric acid'
        }
      ]);
      setShowProductSandbox(true);
    } else {
      setShowProductSandbox(false);
      setProductImages([]);
    }
    
    return {
      id: Date.now().toString(),
      content: `I can help you with information about suppliers, inventory, and procurement. Here are some things you can ask me about:\n\n- Top suppliers in various categories\n- Supplier performance metrics\n- Creating purchase orders\n- Inventory levels\n- Market research on ingredients\n\nHow can I assist you today?`,
      sender: 'ai',
      timestamp: new Date(),
      actions: [
        { 
          label: 'Show top suppliers', 
          onClick: () => handleQuickPrompt('Show me the top 5 suppliers')
        },
        { 
          label: 'Find GMP certified suppliers', 
          onClick: () => handleQuickPrompt('Find suppliers with GMP certification for Paracetamol API')
        }
      ]
    };
  };

  const handleModuleRequest = (userInput: string): Message => {
    const lowerCaseInput = userInput.toLowerCase();
    
    if (lowerCaseInput.includes('supplier') || lowerCaseInput.includes('vendor')) {
      return {
        id: Date.now().toString(),
        content: 'Here\'s the supplier information you requested.',
        sender: 'ai',
        timestamp: new Date(),
        moduleType: 'supplier',
        moduleData: {}
      };
    } else if (lowerCaseInput.includes('inventory') || lowerCaseInput.includes('stock')) {
      return {
        id: Date.now().toString(),
        content: 'Here\'s the inventory information you requested.',
        sender: 'ai',
        timestamp: new Date(),
        moduleType: 'inventory',
        moduleData: {}
      };
    }
    
    return {
      id: Date.now().toString(),
      content: 'I\'m not sure what information you\'re looking for. Could you be more specific?',
      sender: 'ai',
      timestamp: new Date()
    };
  };

  const availableModules: ModuleItem[] = [
    {
      id: 'supplier-assessment',
      title: 'Supplier Assessment',
      description: 'Evaluate and compare suppliers across performance metrics and risk factors.',
      icon: 'chart',
      category: 'analysis'
    },
    {
      id: 'inventory-analysis',
      title: 'Inventory Analysis',
      description: 'Analyze inventory levels, turnover rates, and optimization opportunities.',
      icon: 'package',
      category: 'data'
    },
    {
      id: 'contract-risk',
      title: 'Contract Risk',
      description: 'Identify and mitigate risks in supplier contracts and agreements.',
      icon: 'shield',
      category: 'security'
    },
    {
      id: 'market-research',
      title: 'Market Research',
      description: 'Access market data, pricing trends, and competitive intelligence.',
      icon: 'search',
      category: 'analysis'
    }
  ];

  const renderNumberIndicator = (indicator: NumberIndicator) => {
    const getIndicatorColor = () => {
      switch (indicator.type) {
        case 'risk':
          return 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200';
        case 'finding':
          return 'bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200';
        case 'document':
          return 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200';
        case 'supplier':
          return 'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200';
        default:
          return 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100';
      }
    };

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className={`h-6 w-6 p-0 rounded-full font-medium inline-flex items-center justify-center ${getIndicatorColor()}`}
            onClick={() => setActiveIndicator(indicator.id === activeIndicator ? null : indicator.id)}
          >
            {indicator.number}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0">
          <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
            <h3 className="text-sm font-medium flex items-center gap-2">
              {indicator.type === 'risk' && <AlertCircle className="h-4 w-4 text-red-500" />}
              {indicator.type === 'finding' && <FileText className="h-4 w-4 text-emerald-500" />}
              {indicator.type === 'document' && <FileText className="h-4 w-4 text-blue-500" />}
              {indicator.type === 'supplier' && <FileText className="h-4 w-4 text-amber-500" />}
              {indicator.number} {indicator.type === 'risk' ? 'Risks' : 
                indicator.type === 'finding' ? 'Findings' : 
                indicator.type === 'document' ? 'Documents' : 'Suppliers'}
            </h3>
          </div>
          <div className="max-h-[300px] overflow-auto">
            {indicator.items.map((item) => (
              <div key={item.id} className="px-3 py-2 border-b border-gray-100 last:border-0 hover:bg-gray-50">
                <div className="flex items-start gap-2">
                  {item.severity === 'high' && <div className="h-2 w-2 mt-1.5 rounded-full bg-red-500" />}
                  {item.severity === 'medium' && <div className="h-2 w-2 mt-1.5 rounded-full bg-amber-500" />}
                  {item.severity === 'low' && <div className="h-2 w-2 mt-1.5 rounded-full bg-green-500" />}
                  <div>
                    <h4 className="text-sm font-medium">{item.title}</h4>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  const renderMessageWithNumberedIndicators = (content: string, indicators?: NumberIndicator[]) => {
    if (!indicators || indicators.length === 0) return content;
    
    return (
      <div className="whitespace-pre-wrap">
        {content.split(/(\s+)/).map((part, index) => {
          if (part.includes('identified') || part.includes('analyzed') || part.includes('found')) {
            const indicatorsToRender = indicators.filter(ind => 
              (part.includes('risk') && ind.type === 'risk') || 
              (part.includes('finding') && ind.type === 'finding')
            );
            
            if (indicatorsToRender.length > 0) {
              return (
                <span key={index}>
                  {part}
                  {' '}
                  {indicatorsToRender.map(ind => (
                    <span key={ind.id} className="inline-block mx-1">
                      {renderNumberIndicator(ind)}
                    </span>
                  ))}
                </span>
              );
            }
          }
          return part;
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={65} minSize={50} className="flex flex-col bg-[#f8f8f8]">
          <div className="flex-1 overflow-auto px-4 bg-[#f8f8f8]">
            {showWelcomeScreen ? (
              <WelcomeScreen 
                onSelectQuickStart={handleQuickPrompt} 
                userName="John"
              />
            ) : (
              <div className="py-4 space-y-6">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={cn(
                      "flex w-full mx-auto",
                      message.sender === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    <div className={cn(
                      "flex items-start max-w-[80%] group",
                      message.sender === 'user' ? "flex-row-reverse" : "flex-row"
                    )}>
                      <Avatar className={cn(
                        "h-8 w-8 mt-1",
                        message.sender === 'user' ? "ml-3" : "mr-3",
                        message.sender === 'user' ? "bg-gray-500" : "bg-gray-100"
                      )}>
                        <AvatarFallback className={message.sender === 'user' ? "text-white" : "text-gray-500"}>
                          {message.sender === 'user' ? 'U' : 'A'}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <div className={cn(
                          "rounded-2xl py-4 px-5",
                          message.sender === 'user' 
                            ? "bg-gray-800 text-white" 
                            : message.isResearch
                              ? "bg-gray-100 text-gray-800"
                              : "bg-gray-100 text-gray-800"
                        )}>
                          {message.sender === 'user' ? (
                            <div className="whitespace-pre-wrap">{message.content}</div>
                          ) : message.numberedIndicators ? (
                            renderMessageWithNumberedIndicators(message.content, message.numberedIndicators)
                          ) : (
                            <DraggableMessage 
                              content={message.content} 
                              onDragStart={() => setIsDragging(true)}
                            />
                          )}
                        </div>
                        
                        {message.suppliers && message.suppliers.length > 0 && (
                          <div className="mt-3">
                            <ChatSuppliersTable 
                              suppliers={message.suppliers} 
                              compact={true}
                            />
                          </div>
                        )}
                        
                        {message.moduleType && (
                          <div className="mt-3">
                            <ModuleRenderer 
                              type={message.moduleType} 
                              data={message.moduleData} 
                            />
                          </div>
                        )}
                        
                        {message.actions && message.actions.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {message.actions.map((action, i) => (
                              <Button 
                                key={i} 
                                size="sm" 
                                variant="outline" 
                                onClick={action.onClick}
                                className="rounded-full text-xs font-normal"
                              >
                                {action.label}
                              </Button>
                            ))}
                          </div>
                        )}
                        
                        {message.sender === 'ai' && (
                          <div className="flex items-center gap-4 mt-2">
                            <button 
                              className="text-gray-400 hover:text-gray-600 transition-colors"
                              title="View"
                              onClick={() => toast({ title: "View Response", description: "Expanded view coming soon" })}
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button 
                              className="text-gray-400 hover:text-green-600 transition-colors"
                              title="Thumbs Up"
                              onClick={() => toast({ title: "Feedback Received", description: "You liked this response" })}
                            >
                              <ThumbsUp className="h-4 w-4" />
                            </button>
                            <button 
                              className="text-gray-400 hover:text-red-600 transition-colors"
                              title="Thumbs Down"
                              onClick={() => toast({ title: "Feedback Received", description: "You disliked this response" })}
                            >
                              <ThumbsDown className="h-4 w-4" />
                            </button>
                            <button 
                              className="text-gray-400 hover:text-blue-600 transition-colors"
                              title="Regenerate"
                              onClick={() => toast({ title: "Regenerating", description: "Generating a new response" })}
                            >
                              <RefreshCw className="h-4 w-4" />
                            </button>
                            <button 
                              className="text-gray-400 hover:text-purple-600 transition-colors"
                              title="Copy"
                              onClick={() => {
                                navigator.clipboard.writeText(message.content);
                                toast({ title: "Copied", description: "Response copied to clipboard" });
                              }}
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <ProductImageSandbox
                  products={productImages}
                  isVisible={showProductSandbox}
                />
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
          
          <div className="p-4 border-t">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="rounded-full"
                onClick={() => setModuleSelectOpen(true)}
              >
                <Grid className="h-5 w-5 text-gray-500" />
              </Button>
              
              <div className="relative flex-1">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything about suppliers, inventory, or orders..."
                  className="pr-32 rounded-full bg-gray-100 border-0 focus-visible:ring-gray-300"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className={cn(
                      "h-8 w-8 rounded-full",
                      isRecording ? "text-red-500" : "text-gray-400"
                    )}
                    onClick={toggleRecording}
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Button type="submit" size="icon" className="rounded-full">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={35} minSize={30}>
          <ActionPreview 
            title={customActions.length > 0 ? "Your Action Batch" : previewTitle}
            description={customActions.length > 0 ? "Drag more content from the chat to add actions" : previewDescription}
            actions={previewActions}
            customActions={customActions}
            onAddCustomAction={addCustomAction}
            onRemoveCustomAction={removeCustomAction}
            className="h-full"
          />
        </ResizablePanel>
      </ResizablePanelGroup>
      
      <ResearchDataPanel 
        isVisible={showResearchPanel}
        documents={researchData}
        suppliers={supplierResults}
        isLoading={isResearching}
        onClose={() => setShowResearchPanel(false)}
        title={supplierResults.length > 0 && researchData.length === 0 ? resultsTableTitle : "Research Data"}
      />
      
      <ModuleSelector 
        isOpen={moduleSelectOpen} 
        onClose={() => setModuleSelectOpen(false)}
        modules={availableModules}
        onSelectModule={handleSelectModule}
      />
    </div>
  );
}
