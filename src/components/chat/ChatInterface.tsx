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
