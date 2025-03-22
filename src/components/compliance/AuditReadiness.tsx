
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  ClipboardCheck,
  AlertTriangle,
  BookOpen,
  FileText,
  FileCheck,
  Bell,
  Calendar,
  ArrowUpDown,
  Download,
  BrainCircuit,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Types
interface RegulatoryUpdate {
  id: string;
  title: string;
  description: string;
  date: string;
  impact: 'high' | 'medium' | 'low';
  source: string;
}

interface AuditItem {
  id: string;
  name: string;
  description: string;
  documentCount: number;
  status: 'ready' | 'attention' | 'critical';
}

// Component
const AuditReadiness = () => {
  const [activeTab, setActiveTab] = useState("updates");
  
  // Sample regulatory updates
  const regulatoryUpdates: RegulatoryUpdate[] = [
    {
      id: "1",
      title: "FDA guidance on nitrosamine impurities updated",
      description: "The FDA has updated its guidance on control of nitrosamine impurities in human drugs. New testing requirements and limits have been established.",
      date: "2023-09-15",
      impact: 'high',
      source: "FDA"
    },
    {
      id: "2",
      title: "EMA revises Annex 1 for sterile manufacturing",
      description: "European Medicines Agency has published the revised Annex 1 for the manufacture of sterile medicinal products with new contamination control strategy requirements.",
      date: "2023-08-22",
      impact: 'high',
      source: "EMA"
    },
    {
      id: "3",
      title: "ICH Q3D Elemental Impurities implementation deadline",
      description: "The final implementation deadline for ICH Q3D guideline for elemental impurities has been set, requiring updated risk assessments.",
      date: "2023-10-05",
      impact: 'medium',
      source: "ICH"
    },
    {
      id: "4",
      title: "New regulations for pharmaceutical packaging materials",
      description: "Updated regulations for primary packaging materials have been released focusing on leachables and extractables testing.",
      date: "2023-07-18",
      impact: 'medium',
      source: "USP"
    }
  ];
  
  // Sample audit items
  const auditItems: AuditItem[] = [
    {
      id: "1",
      name: "GMP Documentation",
      description: "Standard Operating Procedures, Batch Records, Validation Protocols",
      documentCount: 45,
      status: 'ready'
    },
    {
      id: "2",
      name: "Quality Management System",
      description: "Deviation Management, CAPA, Change Control",
      documentCount: 28,
      status: 'ready'
    },
    {
      id: "3",
      name: "Supplier Management",
      description: "Qualification, Audits, Agreements",
      documentCount: 16,
      status: 'attention'
    },
    {
      id: "4",
      name: "Equipment and Facilities",
      description: "Calibration, Maintenance, Qualification",
      documentCount: 23,
      status: 'ready'
    },
    {
      id: "5",
      name: "Material Management",
      description: "Specifications, Testing, Stability",
      documentCount: 18,
      status: 'critical'
    }
  ];

  // Generate dummy report
  const generateAuditReport = () => {
    toast.success("AI-generated audit report is being prepared");
    // This would call an actual API in a real implementation
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get impact badge styling
  const getImpactBadgeStyle = (impact: RegulatoryUpdate['impact']) => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 border-red-200 text-red-800';
      case 'medium':
        return 'bg-amber-100 border-amber-200 text-amber-800';
      case 'low':
        return 'bg-green-100 border-green-200 text-green-800';
      default:
        return 'bg-gray-100 border-gray-200 text-gray-800';
    }
  };

  // Get status styling
  const getStatusStyle = (status: AuditItem['status']) => {
    switch (status) {
      case 'ready':
        return 'text-green-600';
      case 'attention':
        return 'text-amber-600';
      case 'critical':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Audit Readiness</CardTitle>
        <CardDescription>
          Prepare for regulatory inspections with AI-generated reports and real-time regulatory updates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="updates">
              <Bell className="mr-2 h-4 w-4" />
              Regulatory Updates
            </TabsTrigger>
            <TabsTrigger value="readiness">
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Audit Preparation
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="updates" className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium">Recent Regulatory Changes</h3>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="h-9 px-3 text-xs gap-1">
                      <BookOpen className="h-4 w-4 mr-1" />
                      Filter By Source
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-1 p-2">
                        <li className="px-2 py-1.5 text-sm hover:bg-muted rounded-md cursor-pointer">FDA</li>
                        <li className="px-2 py-1.5 text-sm hover:bg-muted rounded-md cursor-pointer">EMA</li>
                        <li className="px-2 py-1.5 text-sm hover:bg-muted rounded-md cursor-pointer">ICH</li>
                        <li className="px-2 py-1.5 text-sm hover:bg-muted rounded-md cursor-pointer">USP</li>
                        <li className="px-2 py-1.5 text-sm hover:bg-muted rounded-md cursor-pointer">WHO</li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            
            <div className="space-y-3">
              {regulatoryUpdates.map((update) => (
                <div 
                  key={update.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex flex-col">
                      <h4 className="font-medium">{update.title}</h4>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(update.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3.5 w-3.5" />
                          {update.source}
                        </span>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getImpactBadgeStyle(update.impact)}`}>
                      {update.impact === 'high' && <AlertTriangle className="h-3 w-3 mr-1" />}
                      {update.impact.charAt(0).toUpperCase() + update.impact.slice(1)} Impact
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{update.description}</p>
                  <div className="flex justify-end mt-2">
                    <Button variant="ghost" size="sm" className="h-8 text-xs">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-2">
              <Button variant="outline" size="sm" className="text-xs gap-1">
                <ArrowUpDown className="h-3.5 w-3.5" />
                View All Updates
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="readiness" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Audit Readiness Status</h3>
              <Button onClick={generateAuditReport} className="gap-2">
                <BrainCircuit className="h-4 w-4" />
                Generate Audit Report
              </Button>
            </div>
            
            <div className="space-y-4">
              {auditItems.map((item) => (
                <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">
                        <span className="text-muted-foreground">Documents:</span> {item.documentCount}
                      </div>
                      <div className={cn(
                        "flex items-center gap-1 font-medium",
                        getStatusStyle(item.status)
                      )}>
                        {item.status === 'ready' && (
                          <ShieldCheck className="h-4 w-4" />
                        )}
                        {item.status === 'attention' && (
                          <AlertTriangle className="h-4 w-4" />
                        )}
                        {item.status === 'critical' && (
                          <AlertTriangle className="h-4 w-4" />
                        )}
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-3">
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      <FileCheck className="h-3.5 w-3.5 mr-1" />
                      View Checklist
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-xs">
                      <Download className="h-3.5 w-3.5 mr-1" />
                      Download Documents
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col items-center justify-center p-5 border rounded-lg bg-gray-50">
              <div className="mb-3">
                <ShieldCheck className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-1">Schedule Mock Audit</h3>
              <p className="text-sm text-muted-foreground text-center mb-3">
                Schedule an internal mock audit to ensure you're fully prepared for regulatory inspections
              </p>
              <Button variant="outline">Schedule Now</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AuditReadiness;
