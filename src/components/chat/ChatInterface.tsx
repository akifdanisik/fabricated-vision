
import { useState, useRef, useEffect } from 'react';
import { Send, Mic, ArrowRight, Plus, PaperclipIcon, Grid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import ActionPreview, { ActionItem } from './ActionPreview';
import ModuleSelector, { ModuleItem } from './ModuleSelector';
import WelcomeScreen from './WelcomeScreen';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import CategoryActions from './CategoryActions';
import ModuleRenderer from './ModuleRenderer';
import ResearchDataPanel, { ResearchDocument } from './ResearchDataPanel';

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
  
  // Track conversation context for multi-turn interactions
  const [conversationContext, setConversationContext] = useState<{
    type: string;
    step: number;
    data: Record<string, any>;
  } | null>(null);

  // Research data state
  const [researchData, setResearchData] = useState<ResearchDocument[]>([]);
  const [showResearchPanel, setShowResearchPanel] = useState(false);
  const [isResearching, setIsResearching] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Hide welcome screen on first message
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

    // Check if it's a research question
    const isResearchQuestion = checkIfResearchQuestion(input);
    if (isResearchQuestion) {
      setIsResearching(true);
      setShowResearchPanel(true);
    }

    setTimeout(() => {
      // Check if we're in a multi-turn conversation flow
      if (conversationContext) {
        const aiResponse = handleConversationFlow(input, conversationContext);
        setMessages(prev => [...prev, aiResponse]);
      } else {
        // Handle module requests
        const lowerCaseInput = input.toLowerCase();
        if (lowerCaseInput.includes('show') || lowerCaseInput.includes('display') || lowerCaseInput.includes('get')) {
          const moduleResponse = handleModuleRequest(input);
          setMessages(prev => [...prev, moduleResponse]);
        } else {
          const aiResponse = generateAIResponse(input, isResearchQuestion);
          setMessages(prev => [...prev, aiResponse]);
          
          if (isResearchQuestion) {
            // Simulate getting research data
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
    // Simulate loading time for research
    setTimeout(() => {
      // Generate mock research data based on the query
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
      
      // Add a follow-up message with research summary
      const researchSummaryMessage: Message = {
        id: Date.now().toString(),
        content: "I've analyzed 7 documents related to your query. Key insights include:\n\n- Financial documents show increasing costs\n- Expert opinions are divided on technology defensibility\n- The estimated market size (TAM) is approximately $72B\n- Several product integration risks have been identified\n\nYou can review the detailed research data in the panel below.",
        sender: 'ai',
        timestamp: new Date(),
        isResearch: true,
        actions: [
          { 
            label: 'Close research panel', 
            onClick: () => setShowResearchPanel(false)
          },
          { 
            label: 'Download full report', 
            onClick: () => toast.info('Report download started')
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
      toast.info(`${moduleItem.title} is already active`);
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
    
    toast.success(`${moduleItem.title} module activated`);
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
          // Complete the RFQ process
          setConversationContext(null); // End the conversation flow
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
    
    // If we don't recognize the context type, revert to normal responses
    setConversationContext(null);
    return generateAIResponse(userInput, false);
  };

  const generateAIResponse = (userInput: string, isResearchRequest: boolean): Message => {
    const lowercaseInput = userInput.toLowerCase();
    
    if (isResearchRequest) {
      return {
        id: Date.now().toString(),
        content: "I'm currently researching information related to your query. This may take a moment as I search through relevant documents and data sources...",
        sender: 'ai',
        timestamp: new Date(),
        isResearch: true
      };
    }
    
    if (lowercaseInput.includes('find supplier') && lowercaseInput.includes('paracetamol') && lowercaseInput.includes('gmp')) {
      return {
        id: Date.now().toString(),
        content: 'Here are 5 suppliers for Paracetamol API with GMP certification:\n\nSupplier A: $500/kg, 10-week lead time.\nSupplier B: $550/kg, 8-week lead time.\nSupplier C: $480/kg, 12-week lead time (FDA approval pending).\nSupplier D: $530/kg, 9-week lead time (ISO certified).\nSupplier E: $575/kg, 7-week lead time (multiple quality certifications).\n\nWould you like to compare them or create an RFQ?',
        sender: 'ai',
        timestamp: new Date(),
        actions: [
          { 
            label: 'Compare Suppliers', 
            onClick: () => handleQuickPrompt('Compare suppliers for Paracetamol API')
          },
          { 
            label: 'Create RFQ', 
            onClick: () => {
              // Start the RFQ conversation flow
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
    } else if (lowercaseInput.includes('create') && lowercaseInput.includes('rfq')) {
      const product = lowercaseInput.includes('paracetamol') ? 'Paracetamol API' : 'the requested product';
      
      // Start the RFQ conversation flow
      setConversationContext({ 
        type: 'rfq', 
        step: 1, 
        data: { product } 
      });
      
      return {
        id: Date.now().toString(),
        content: `I'll help you create an RFQ for ${product}. What quantity do you need?`,
        sender: 'ai',
        timestamp: new Date(),
        actions: [
          { label: '100kg', onClick: () => handleQuickPrompt('100kg') },
          { label: '250kg', onClick: () => handleQuickPrompt('250kg') },
          { label: '500kg', onClick: () => handleQuickPrompt('500kg') },
          { label: 'Custom amount', onClick: () => {} } // This one just lets them type
        ]
      };
    } else if (lowercaseInput.includes('compare') && lowercaseInput.includes('supplier')) {
      return {
        id: Date.now().toString(),
        content: 'Comparison of top Paracetamol API suppliers:\n\n| Supplier | Price | Lead Time | Certifications | Min. Order |\n|----------|-------|-----------|---------------|------------|\n| Supplier A | $500/kg | 10 weeks | GMP, ISO | 100kg |\n| Supplier B | $550/kg | 8 weeks | GMP, FDA | 50kg |\n| Supplier C | $480/kg | 12 weeks | GMP* | 200kg |\n\n*FDA approval pending\n\nSupplier B offers the fastest delivery but at a premium price. Supplier C has the lowest price but longest lead time and pending FDA approval.',
        sender: 'ai',
        timestamp: new Date(),
        actions: [
          { 
            label: 'Create RFQ with Supplier A', 
            onClick: () => {
              setConversationContext({ 
                type: 'rfq', 
                step: 1, 
                data: { product: 'Paracetamol API', supplier: 'Supplier A' } 
              });
              handleQuickPrompt('Create RFQ with Supplier A')
            }
          },
          { 
            label: 'Create RFQ with Supplier B', 
            onClick: () => {
              setConversationContext({ 
                type: 'rfq', 
                step: 1, 
                data: { product: 'Paracetamol API', supplier: 'Supplier B' } 
              });
              handleQuickPrompt('Create RFQ with Supplier B')
            }
          },
          { 
            label: 'View quality reports', 
            onClick: () => handleQuickPrompt('Show quality reports for these suppliers')
          }
        ]
      };
    } else if (lowercaseInput.includes('profile') && lowercaseInput.includes('supplier')) {
      return {
        id: Date.now().toString(),
        content: 'Here are the detailed profiles of the recommended suppliers:\n\n**Supplier A (PharmaCorp)**\nLocation: Mumbai, India\nEstablished: 1998\nCertifications: GMP, ISO 9001\nProducts: API, Excipients\nCustomers: 200+ globally\nOn-time delivery rate: 92%\n\n**Supplier B (BioTech Materials)**\nLocation: Frankfurt, Germany\nEstablished: 2005\nCertifications: GMP, FDA, ISO 9001\nProducts: API, Custom synthesis\nCustomers: Major pharma in EU/US\nOn-time delivery rate: 96%\n\n**Supplier C (ChemSource)**\nLocation: Shanghai, China\nEstablished: 2010\nCertifications: GMP (FDA approval pending)\nProducts: APIs, Intermediates\nCustomers: Growing customer base in Asia\nOn-time delivery rate: 88%',
        sender: 'ai',
        timestamp: new Date(),
        actions: [
          { 
            label: 'Request samples', 
            onClick: () => handleQuickPrompt('Request samples from these suppliers')
          },
          { 
            label: 'Create RFQ', 
            onClick: () => {
              setConversationContext({ 
                type: 'rfq', 
                step: 1, 
                data: { product: 'Paracetamol API' } 
              });
              handleQuickPrompt('Create RFQ for Paracetamol API')
            }
          },
          { 
            label: 'View all suppliers', 
            onClick: () => window.location.href = '/suppliers'
          }
        ]
      };
    } else if (lowercaseInput.includes('inventory') || lowercaseInput.includes('stock')) {
      return {
        id: Date.now().toString(),
        content: 'Here\'s the current inventory status of your critical items:\n\n- Paracetamol API: 90kg (Below reorder point)\n- Microcrystalline Cellulose: 2500kg (Sufficient)\n- API-36B: 220kg (Critical low)',
        sender: 'ai',
        timestamp: new Date(),
        actions: [
          { 
            label: 'Create reorder', 
            onClick: () => handleQuickPrompt('Create a reorder for Paracetamol API')
          },
          { 
            label: 'View all inventory', 
            onClick: () => window.location.href = '/inventory'
          }
        ]
      };
    } else if (lowercaseInput.includes('supplier') || lowercaseInput.includes('vendor')) {
      return {
        id: Date.now().toString(),
        content: 'Here are your top suppliers:\n\n- PharmaCorp (Performance: 95%)\n- BioTech Materials (Performance: 92%)\n- MedSource Inc. (Performance: 88%)',
        sender: 'ai',
        timestamp: new Date(),
        actions: [
          { 
            label: 'Compare suppliers', 
            onClick: () => handleQuickPrompt('Compare PharmaCorp and BioTech Materials')
          },
          { 
            label: 'View all suppliers', 
            onClick: () => window.location.href = '/suppliers'
          },
          { 
            label: 'Find GMP certified suppliers', 
            onClick: () => handleQuickPrompt('Find suppliers with GMP certification')
          }
        ]
      };
    } else if (lowercaseInput.includes('reorder') || lowercaseInput.includes('order')) {
      return {
        id: Date.now().toString(),
        content: 'I can help you create a reorder. For which product would you like to create a reorder?',
        sender: 'ai',
        timestamp: new Date(),
        actions: [
          { 
            label: 'Paracetamol API', 
            onClick: () => handleQuickPrompt('Create reorder for Paracetamol API, 200kg')
          },
          { 
            label: 'API-36B', 
            onClick: () => handleQuickPrompt('Create reorder for API-36B, 100kg')
          }
        ]
      };
    } else if (lowercaseInput.includes('compare')) {
      return {
        id: Date.now().toString(),
        content: 'Comparison between PharmaCorp and BioTech Materials:\n\n- Price: PharmaCorp ($500/kg) vs BioTech ($550/kg)\n- Lead time: PharmaCorp (10 weeks) vs BioTech (8 weeks)\n- Quality rating: PharmaCorp (4.8/5) vs BioTech (4.6/5)',
        sender: 'ai',
        timestamp: new Date(),
        actions: [
          { 
            label: 'Create RFQ', 
            onClick: () => handleQuickPrompt('Create RFQ with PharmaCorp')
          },
          { 
            label: 'View supplier details', 
            onClick: () => window.location.href = '/suppliers'
          }
        ]
      };
    } else {
      return {
        id: Date.now().toString(),
        content: 'I understand you\'re looking for assistance. Could you please be more specific about what you need help with? I can help with inventory management, supplier information, creating orders, finding suppliers, and more.',
        sender: 'ai',
        timestamp: new Date(),
        actions: [
          { 
            label: 'Check inventory', 
            onClick: () => handleQuickPrompt('Check inventory status')
          },
          { 
            label: 'Find suppliers', 
            onClick: () => handleQuickPrompt('Find suppliers with GMP certification')
          },
          { 
            label: 'Create an RFQ', 
            onClick: () => handleQuickPrompt('Create an RFQ')
          }
        ]
      };
    }
  };

  const removeModule = (moduleId: string) => {
    setActiveModules(prev => prev.filter(m => m.id !== moduleId));
    toast.info('Module deactivated');
  };

  const handleModuleRequest = (userInput: string): Message => {
    const lowercaseInput = userInput.toLowerCase();
    
    // Compliance module
    if (lowercaseInput.includes('compliance') || lowercaseInput.includes('audit')) {
      return {
        id: Date.now().toString(),
        content: "Here's the compliance overview you requested:",
        sender: 'ai',
        timestamp: new Date(),
        moduleType: 'compliance',
        moduleData: {
          categoryFilter: true
        },
        actions: [
          { 
            label: 'View Document Management', 
            onClick: () => handleQuickPrompt('Show me document management')
          },
          { 
            label: 'See Audit Readiness', 
            onClick: () => handleQuickPrompt('Display audit readiness status')
          }
        ]
      };
    }
    
    // Spend metrics / Reports module
    if (lowercaseInput.includes('spend') || lowercaseInput.includes('metrics') || lowercaseInput.includes('analytics') || lowercaseInput.includes('reports')) {
      return {
        id: Date.now().toString(),
        content: "Here are the spend analytics you requested:",
        sender: 'ai',
        timestamp: new Date(),
        moduleType: 'reports',
        moduleData: {
          tab: lowercaseInput.includes('categor') ? 'categories' : 
               lowercaseInput.includes('saving') ? 'savings' : 'spend'
        },
        actions: [
          { 
            label: 'View by Category', 
            onClick: () => handleQuickPrompt('Show spend by categories')
          },
          { 
            label: 'Check Cost Savings', 
            onClick: () => handleQuickPrompt('Display cost savings')
          }
        ]
      };
    }
    
    // Supplier module
    if (lowercaseInput.includes('supplier') || lowercaseInput.includes('vendor')) {
      return {
        id: Date.now().toString(),
        content: "Here are the supplier details you requested:",
        sender: 'ai',
        timestamp: new Date(),
        moduleType: 'suppliers',
        moduleData: {
          filteredByGMP: lowercaseInput.includes('gmp'),
          categoryFilter: lowercaseInput.includes('categor')
        },
        actions: [
          { 
            label: 'View Supplier Performance', 
            onClick: () => handleQuickPrompt('Show supplier performance metrics')
          },
          { 
            label: 'Add New Supplier', 
            onClick: () => handleQuickPrompt('I want to add a new supplier')
          }
        ]
      };
    }
    
    // Default fallback response
    return {
      id: Date.now().toString(),
      content: "I understand you're asking for specific information. Could you please try rephrasing your request? I can help with inventory, suppliers, compliance, and analytics data.",
      sender: 'ai',
      timestamp: new Date()
    };
  };

  // Get available modules for the module selector
  const availableModules: ModuleItem[] = [
    {
      id: 'contract-risk',
      title: 'Contract Risk Analysis',
      description: 'AI-powered contract risk assessment',
      icon: 'shield',
      category: 'security'
    },
    {
      id: 'supplier-assessment',
      title: 'Supplier Assessment',
      description: 'Evaluate and compare suppliers',
      icon: 'chart',
      category: 'analysis'
    },
    {
      id: 'inventory-optimization',
      title: 'Inventory Optimization',
      description: 'Optimize inventory levels',
      icon: 'package',
      category: 'data'
    }
  ];

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-full rounded-lg "
    >
      <ResizablePanel defaultSize={70} minSize={50} className="relative">
        <div className="flex flex-col h-full">
          {/* Main Chat Area */}
          <div className="flex-1 overflow-y-auto p-4">
            {showWelcomeScreen ? (
              <WelcomeScreen onSelectQuickStart={handleQuickPrompt} />
            ) : (
              <div className="space-y-4 pb-20">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex w-max max-w-[85%] animate-in fade-in-5 zoom-in-98 slide-in-from-bottom-5 duration-200 mb-5 mx-2",
                      message.sender === "user" ? "ml-auto" : "mr-auto"
                    )}
                  >
                    {message.sender === "ai" && (
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="/lovable-uploads/0f378f40-c5be-494e-a251-1513b467af1d.png" />
                        <AvatarFallback className="bg-primary-light text-primary-dark">AI</AvatarFallback>
                      </Avatar>
                    )}
                    <div className="flex flex-col">
                      <div
                        className={cn(
                          "rounded-lg px-4 py-2 max-w-prose",
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}
                      >
                        <div className="prose prose-sm">
                          {message.content.split('\n').map((paragraph, i) => (
                            <p key={i} className={i > 0 ? 'mt-2' : undefined}>
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                      
                      {message.actions && message.actions.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {message.actions.map((action, index) => (
                            <Button 
                              key={index} 
                              variant="secondary" 
                              size="sm" 
                              className="text-xs"
                              onClick={action.onClick}
                            >
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      )}
                      
                      {message.moduleType && (
                        <div className="mt-3">
                          <ModuleRenderer type={message.moduleType} data={message.moduleData} />
                        </div>
                      )}
                    </div>
                    
                    {message.sender === "user" && (
                      <Avatar className="h-8 w-8 ml-2">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-gray-100 text-gray-700">JD</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
          
          {/* Research Data Panel */}
          <ResearchDataPanel 
            isVisible={showResearchPanel} 
            documents={researchData} 
            onClose={() => setShowResearchPanel(false)}
            isLoading={isResearching}
          />
          
          {/* Chat Input Area */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="flex-shrink-0"
                onClick={() => setModuleSelectOpen(true)}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Add Module</span>
              </Button>
              
              <div className="relative flex-1">
                <Input
                  placeholder="Type your message..."
                  className="pr-10"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              
              <Button
                type="button"
                size="icon"
                variant="ghost"
                disabled={isRecording}
                className={cn(
                  "flex-shrink-0",
                  isRecording && "text-red-500"
                )}
                onClick={toggleRecording}
              >
                <Mic className="h-4 w-4" />
                <span className="sr-only">
                  {isRecording ? "Stop Recording" : "Start Recording"}
                </span>
                {isRecording && (
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
                )}
              </Button>
              
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim()}
                className="flex-shrink-0"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
            
            {/* Active Modules Indicators */}
            {activeModules.length > 0 && (
              <div className="mt-2 flex gap-1 flex-wrap">
                {activeModules.map((module) => (
                  <Badge 
                    key={module.id} 
                    variant="outline" 
                    className="text-xs bg-primary-light/30 flex items-center gap-1"
                  >
                    {module.title}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-3 w-3 ml-1 rounded-full"
                      onClick={() => removeModule(module.id)}
                    >
                      <span className="sr-only">Remove</span>
                      <span aria-hidden="true" className="text-xs">×</span>
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </ResizablePanel>
      
      <ResizableHandle withHandle />
      
      <ResizablePanel defaultSize={30} minSize={25}>
        <ActionPreview
          title={previewTitle}
          description={previewDescription}
          actions={previewActions}
        />
      </ResizablePanel>
      
      <ModuleSelector
        isOpen={moduleSelectOpen}
        onClose={() => setModuleSelectOpen(false)}
        modules={availableModules}
        onSelectModule={handleSelectModule}
      />
    </ResizablePanelGroup>
  );
}
