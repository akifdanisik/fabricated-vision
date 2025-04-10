
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Toaster } from "@/components/ui/toaster";
import { 
  Archive, 
  ChevronDown, 
  Clock, 
  Eraser, 
  FileText, 
  Flag, 
  Inbox, 
  MailOpen, 
  MailPlus, 
  MoreHorizontal, 
  RefreshCw, 
  Search, 
  Star, 
  Trash2, 
  User 
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface EmailData {
  id: string;
  read: boolean;
  starred: boolean;
  flagged: boolean;
  from: {
    name: string;
    email: string;
    avatar?: string;
  };
  to: string[];
  subject: string;
  preview: string;
  body: string;
  attachments: {
    name: string;
    size: string;
    type: string;
  }[];
  date: Date;
  category?: "primary" | "social" | "promotions";
  labels?: string[];
}

const mockEmails: EmailData[] = [
  {
    id: "e1",
    read: false,
    starred: false,
    flagged: true,
    from: {
      name: "FDA Compliance Team",
      email: "compliance@fda.gov",
      avatar: "",
    },
    to: ["you@fabricated.com"],
    subject: "Updated API Supplier Regulations 2025",
    preview: "We are writing to inform you about the upcoming changes to API supplier regulations that will come into effect starting January 2025...",
    body: "Dear Sir/Madam,\n\nWe are writing to inform you about the upcoming changes to API supplier regulations that will come into effect starting January 2025. These changes aim to enhance the safety and quality of pharmaceutical ingredients sourced from international suppliers.\n\nKey changes include:\n\n1. Enhanced documentation requirements for supply chain traceability\n2. Quarterly quality audits for all Tier 1 suppliers\n3. Expanded testing protocols for impurities\n4. New sustainability and environmental impact reporting\n\nPlease review the attached document for the comprehensive list of changes. Compliance will be mandatory by December 31, 2024.\n\nPlease do not hesitate to contact us should you have any questions or concerns.\n\nBest regards,\nFDA Compliance Team",
    attachments: [
      {
        name: "FDA_API_Regulations_2025.pdf",
        size: "2.4MB",
        type: "application/pdf"
      }
    ],
    date: new Date(2023, 3, 10, 9, 30),
    category: "primary",
    labels: ["important", "compliance"]
  },
  {
    id: "e2",
    read: true,
    starred: true,
    flagged: false,
    from: {
      name: "Market Intelligence",
      email: "reports@marketintel.com",
      avatar: "",
    },
    to: ["you@fabricated.com", "team@fabricated.com"],
    subject: "MCC Market Price Analysis Q1 2025",
    preview: "As requested, please find attached our comprehensive analysis of MCC pricing trends for Q1 2025. Our data indicates a significant...",
    body: "Hello,\n\nAs requested, please find attached our comprehensive analysis of MCC pricing trends for Q1 2025. Our data indicates a significant increase in raw material costs affecting the production of pharmaceutical-grade microcrystalline cellulose.\n\nKey findings:\n\n- 17% average price increase across all grades compared to Q4 2024\n- Regional disparities showing lower increases in Southeast Asia (8-10%)\n- Long-term contracts showing better price stability than spot purchasing\n- Sustainable/eco-friendly MCC variants commanding 25-30% premium\n\nRecommendations:\n1. Consider locking in Q2-Q4 volumes now to mitigate further increases\n2. Evaluate alternative suppliers in regions with lower price volatility\n3. Review formulations for potential substitution where applicable\n\nPlease let us know if you require any clarification or additional analysis.\n\nBest regards,\nMarket Intelligence Team",
    attachments: [
      {
        name: "MCC_Market_Analysis_Q1_2025.xlsx",
        size: "1.8MB",
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      },
      {
        name: "Price_Forecast_Models.pdf",
        size: "3.2MB",
        type: "application/pdf"
      }
    ],
    date: new Date(2023, 3, 9, 15, 45),
    category: "primary",
    labels: ["reports", "pricing"]
  },
  {
    id: "e3",
    read: false,
    starred: false,
    flagged: true,
    from: {
      name: "Dr. Sarah Johnson",
      email: "sjohnson@medsource.com",
      avatar: "",
    },
    to: ["you@fabricated.com"],
    subject: "URGENT: Backup Suppliers Needed",
    preview: "Due to the ongoing situation in Southeast Asia, we're experiencing significant delays with our primary supplier of...",
    body: "Dear Colleague,\n\nDue to the ongoing situation in Southeast Asia, we're experiencing significant delays with our primary supplier of key excipients. Production at their main facility has been reduced by approximately 60% following recent regulatory actions.\n\nWe urgently need to identify and qualify backup suppliers for the following materials:\n\n1. Pharmaceutical grade lactose monohydrate\n2. Magnesium stearate USP\n3. Sodium starch glycolate\n4. Colloidal silicon dioxide\n\nOur current inventory will only sustain production for approximately 4-5 weeks. Any assistance in identifying reliable alternative sources would be greatly appreciated.\n\nI'm available for a call tomorrow if you'd like to discuss further.\n\nBest regards,\nDr. Sarah Johnson\nHead of Procurement\nMedSource Pharmaceuticals",
    attachments: [],
    date: new Date(2023, 3, 8, 11, 15),
    category: "primary",
    labels: ["urgent", "procurement"]
  },
  {
    id: "e4",
    read: true,
    starred: false,
    flagged: false,
    from: {
      name: "Supplier Evaluation Committee",
      email: "evaluations@fabricated.com",
      avatar: "",
    },
    to: ["managers@fabricated.com"],
    subject: "MedSource Assessment Results",
    preview: "The supplier evaluation committee has completed its quarterly assessment of MedSource. Overall score: 87/100...",
    body: "Dear Management Team,\n\nThe supplier evaluation committee has completed its quarterly assessment of MedSource. Overall score: 87/100 (Previous quarter: 82/100)\n\nStrengths:\n- Consistent product quality (Score: 92/100)\n- Responsive customer service (Score: 89/100)\n- Competitive pricing (Score: 85/100)\n- Documentation and regulatory compliance (Score: 90/100)\n\nAreas for improvement:\n- Delivery timeliness (Score: 78/100)\n- Change management communication (Score: 76/100)\n- Sustainability practices (Score: 79/100)\n\nRecommendation: Continue strategic partnership with increased monitoring of delivery performance. Schedule quarterly review meeting to address concerns regarding change management communication.\n\nThe complete assessment report is attached for your review.\n\nRegards,\nSupplier Evaluation Committee",
    attachments: [
      {
        name: "MedSource_Q1_2025_Evaluation.pdf",
        size: "1.2MB",
        type: "application/pdf"
      }
    ],
    date: new Date(2023, 3, 7, 14, 0),
    category: "primary",
    labels: ["internal", "reports"]
  },
  {
    id: "e5",
    read: true,
    starred: true,
    flagged: false,
    from: {
      name: "Legal Department",
      email: "legal@fabricated.com",
      avatar: "",
    },
    to: ["procurement@fabricated.com"],
    subject: "Contract Force Majeure Analysis",
    preview: "As requested, we've reviewed the force majeure clauses in our current supplier contracts in light of the recent...",
    body: "Dear Procurement Team,\n\nAs requested, we've reviewed the force majeure clauses in our current supplier contracts in light of the recent global supply chain disruptions. Please find below our summary analysis:\n\n1. Top 10 API Suppliers: 7/10 contracts contain adequate force majeure provisions that would cover current situations. 3 contracts (SupplierX, SupplierY, SupplierZ) have narrowly defined clauses that likely would NOT cover current disruptions.\n\n2. Excipient Suppliers: Generally adequate coverage, with 15/18 contracts having broadly defined force majeure clauses that include epidemics, government actions, and transportation disruptions.\n\n3. Packaging Material Suppliers: Mixed results with 12/20 contracts having potentially problematic force majeure definitions.\n\nRecommendations:\n- Prioritize renegotiation of the 3 API supplier contracts when they come up for renewal this quarter\n- Immediately discuss amendments with the 8 packaging suppliers with inadequate protections\n- Implement our new standard force majeure language for all new contracts and renewals\n\nThe detailed analysis and risk assessment matrix are attached for your reference.\n\nPlease let us know if you require any clarification or wish to discuss specific contracts in more detail.\n\nBest regards,\nLegal Department",
    attachments: [
      {
        name: "Force_Majeure_Analysis_2025.docx",
        size: "734KB",
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      },
      {
        name: "Risk_Assessment_Matrix.xlsx",
        size: "920KB",
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      }
    ],
    date: new Date(2023, 3, 6, 10, 30),
    category: "primary",
    labels: ["legal", "contracts"]
  },
  {
    id: "e6",
    read: true,
    starred: false,
    flagged: false,
    from: {
      name: "Supply Chain Analytics",
      email: "analytics@fabricated.com",
      avatar: "",
    },
    to: ["management@fabricated.com"],
    subject: "Raw Material Shortages - Predictive Analysis",
    preview: "Based on our predictive modeling, we anticipate potential shortages in the following raw materials over the next 6-12 months...",
    body: "Management Team,\n\nBased on our predictive modeling, we anticipate potential shortages in the following raw materials over the next 6-12 months:\n\n1. Pharmaceutical-grade microcrystalline cellulose (MCC) - High Risk\n   Root causes: Production capacity constraints in major manufacturing countries and increased demand from food industry\n\n2. Magnesium stearate - Moderate Risk\n   Root causes: Consolidation of suppliers, regulatory challenges at key production facilities\n\n3. Hydroxypropyl methylcellulose (HPMC) - Moderate Risk\n   Root causes: Raw material constraints for manufacturers, logistics disruptions\n\n4. Titanium dioxide - Low to Moderate Risk\n   Root causes: Evolving regulatory landscape, particularly in EU markets\n\nRecommended actions:\n- Increase safety stock levels for high-risk materials\n- Accelerate qualification of alternative suppliers, particularly for MCC\n- Consider reformulation options where feasible to reduce dependence on high-risk materials\n- Engage with key suppliers to secure allocation commitments\n\nOur complete analysis with projected timing and impact assessment is attached.\n\nRegards,\nSupply Chain Analytics Team",
    attachments: [
      {
        name: "Raw_Material_Shortage_Forecast.pdf",
        size: "2.1MB",
        type: "application/pdf"
      }
    ],
    date: new Date(2023, 3, 5, 9, 0),
    category: "primary",
    labels: ["reports", "forecasting"]
  }
];

const InboxPage = () => {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useState("primary");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentEmail, setCurrentEmail] = useState<EmailData | null>(null);
  
  const handleSelectEmail = (emailId: string) => {
    if (selectedEmails.includes(emailId)) {
      setSelectedEmails(selectedEmails.filter(id => id !== emailId));
    } else {
      setSelectedEmails([...selectedEmails, emailId]);
    }
  };
  
  const handleSelectAll = () => {
    if (selectedEmails.length === mockEmails.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(mockEmails.map(email => email.id));
    }
  };
  
  const handleOpenEmail = (email: EmailData) => {
    setCurrentEmail(email);
    // Mark as read if not already
    if (!email.read) {
      // In a real app, you would update this in your backend
      email.read = true;
    }
  };
  
  const handleCloseEmail = () => {
    setCurrentEmail(null);
  };
  
  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };
  
  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-64px)] bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search emails..." 
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Button variant="outline" size="sm" className="ml-2">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex flex-1 overflow-hidden">
          {/* Email List Panel */}
          <div className={cn(
            "w-1/3 border-r flex flex-col",
            currentEmail ? "hidden md:flex" : "flex"
          )}>
            <div className="p-2 border-b">
              <Tabs defaultValue="primary" value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList className="w-full">
                  <TabsTrigger value="primary" className="flex-1">Primary</TabsTrigger>
                  <TabsTrigger value="social" className="flex-1">Social</TabsTrigger>
                  <TabsTrigger value="promotions" className="flex-1">Promotions</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="p-2 border-b flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox 
                  checked={selectedEmails.length === mockEmails.length} 
                  onCheckedChange={handleSelectAll}
                  className="mr-2"
                />
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Archive className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MailOpen className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Clock className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto">
              {mockEmails.map((email) => (
                <div 
                  key={email.id}
                  className={cn(
                    "p-3 border-b cursor-pointer transition-colors flex",
                    !email.read && "bg-blue-50",
                    selectedEmails.includes(email.id) && "bg-gray-100"
                  )}
                >
                  <div className="mr-3 flex flex-col items-center">
                    <Checkbox 
                      checked={selectedEmails.includes(email.id)} 
                      onCheckedChange={() => handleSelectEmail(email.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="mb-2"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6" 
                      onClick={(e) => {
                        e.stopPropagation();
                        email.starred = !email.starred;
                        // Force re-render
                        setSelectedEmails([...selectedEmails]);
                      }}
                    >
                      <Star 
                        className={cn(
                          "h-4 w-4", 
                          email.starred ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
                        )} 
                      />
                    </Button>
                    
                    {email.flagged && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 mt-1" 
                        onClick={(e) => {
                          e.stopPropagation();
                          email.flagged = !email.flagged;
                          // Force re-render
                          setSelectedEmails([...selectedEmails]);
                        }}
                      >
                        <Flag className="h-4 w-4 fill-red-500 text-red-500" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0" onClick={() => handleOpenEmail(email)}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium truncate">{email.from.name}</div>
                      <div className="text-xs text-gray-500 whitespace-nowrap ml-2">{formatDate(email.date)}</div>
                    </div>
                    <div className="font-medium text-sm truncate mb-1">{email.subject}</div>
                    <div className="text-xs text-gray-500 truncate">{email.preview}</div>
                    
                    {email.attachments.length > 0 && (
                      <div className="flex items-center mt-2">
                        <FileText className="h-3 w-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">{email.attachments.length} attachment{email.attachments.length > 1 ? 's' : ''}</span>
                      </div>
                    )}
                    
                    {email.labels && email.labels.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {email.labels.map(label => (
                          <Badge key={label} variant="outline" className="text-xs h-5 px-1.5">
                            {label}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Email Content Panel */}
          <div className={cn(
            "flex-1 flex flex-col",
            !currentEmail && "hidden md:flex md:items-center md:justify-center"
          )}>
            {currentEmail ? (
              <>
                <div className="p-4 border-b flex items-center justify-between">
                  <Button variant="ghost" size="sm" onClick={handleCloseEmail} className="md:hidden">
                    Back
                  </Button>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Archive className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MailOpen className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-6 overflow-auto flex-1">
                  <h1 className="text-2xl font-semibold mb-6">{currentEmail.subject}</h1>
                  
                  <div className="flex items-center mb-6">
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {currentEmail.from.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{currentEmail.from.name}</div>
                          <div className="text-sm text-gray-500">{currentEmail.from.email}</div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {currentEmail.date.toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                          })}
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-500 mt-1">
                        To: {currentEmail.to.join(', ')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="prose max-w-none mb-8 whitespace-pre-line">
                    {currentEmail.body}
                  </div>
                  
                  {currentEmail.attachments.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-3">Attachments ({currentEmail.attachments.length})</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {currentEmail.attachments.map((attachment, index) => (
                          <div key={index} className="border rounded-lg p-3 flex items-center">
                            <FileText className="h-8 w-8 text-blue-500 mr-3" />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm truncate">{attachment.name}</div>
                              <div className="text-xs text-gray-500">{attachment.size}</div>
                            </div>
                            <Button variant="ghost" size="sm">Download</Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-8 pt-6 border-t">
                    <Button className="mr-2">
                      Reply
                    </Button>
                    <Button variant="outline">
                      Forward
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center p-8">
                <Inbox className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-600">Select an email to read</h3>
                <p className="text-gray-500 mt-2">Choose an email from the list to view its contents</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Toaster />
    </Layout>
  );
};

export default InboxPage;
