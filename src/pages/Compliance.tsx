
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ComplianceOverview from '@/components/compliance/ComplianceOverview';
import DocumentManagement from '@/components/compliance/DocumentManagement';
import AuditReadiness from '@/components/compliance/AuditReadiness';
import { ShieldCheck, FileText, ClipboardCheck, HelpCircle } from 'lucide-react';
import { Category } from '@/components/categories/CategoryBadge';
import CategoryFilter from '@/components/categories/CategoryFilter';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Define interfaces for the component props
interface ComplianceComponentProps {
  selectedCategories: Category[];
}

// Create proper wrapper components with correct typing
const EnhancedComplianceOverview: React.FC<ComplianceComponentProps> = (props) => 
  <ComplianceOverview {...props} />;

const EnhancedDocumentManagement: React.FC<ComplianceComponentProps> = (props) => 
  <DocumentManagement {...props} />;

const EnhancedAuditReadiness: React.FC<ComplianceComponentProps> = (props) => 
  <AuditReadiness {...props} />;

const tabs = [
  { id: "overview", label: "Compliance Dashboard", icon: ShieldCheck },
  { id: "documents", label: "Document Management", icon: FileText },
  { id: "audit", label: "Audit Readiness", icon: ClipboardCheck },
  { id: "roles", label: "Roles & Permissions", icon: ClipboardCheck },
  { id: "entities", label: "Entities", icon: ClipboardCheck },
  { id: "fields", label: "Custom Fields", icon: ClipboardCheck },
];

const Compliance = () => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState("overview");

  const handleCategoryFilterChange = (categories: Category[]) => {
    setSelectedCategories(categories);
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-gray-900">Organization Settings</h1>
          <div className="mt-6 border-b border-gray-200">
            <div className="flex space-x-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-4 items-center">
            <h2 className="text-xl font-medium text-gray-900">Roles</h2>
            <p className="text-sm text-gray-500">Select a role to view its permissions.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <HelpCircle className="h-4 w-4" />
              Help & Feedback
            </Button>
            <CategoryFilter 
              onFilterChange={handleCategoryFilterChange} 
              showLabel={false}
              className="flex-shrink-0" 
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-0">
                <Tabs value={activeTab} className="w-full">
                  <TabsContent value="overview" className="p-6 mt-0">
                    <EnhancedComplianceOverview selectedCategories={selectedCategories} />
                  </TabsContent>
                  
                  <TabsContent value="documents" className="p-6 mt-0">
                    <EnhancedDocumentManagement selectedCategories={selectedCategories} />
                  </TabsContent>
                  
                  <TabsContent value="audit" className="p-6 mt-0">
                    <EnhancedAuditReadiness selectedCategories={selectedCategories} />
                  </TabsContent>
                  
                  <TabsContent value="roles" className="p-6 mt-0">
                    <div className="space-y-6">
                      <div className="grid gap-4">
                        {[1, 2, 3, 4, 5].map((index) => (
                          <div key={index} className="flex items-center justify-between p-4 rounded-md border border-gray-100 hover:border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100">
                                <ShieldCheck className="h-5 w-5 text-gray-600" />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900">Organization Admin</h3>
                                <p className="text-sm text-gray-500">Scope: Organization</p>
                              </div>
                            </div>
                            <div className="text-sm font-medium">
                              {index} Managers
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between px-5 py-3 bg-gray-50 border-b">
                <CardTitle className="text-sm font-medium">ROLE DETAILS</CardTitle>
                <button className="p-1 rounded-md hover:bg-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </CardHeader>
              <CardContent className="px-5 py-4">
                <h3 className="text-lg font-semibold mb-1">Organization Admin</h3>
                <p className="text-sm text-gray-500 mb-4">Scope: Organization · Restricted access</p>
                
                <p className="text-sm text-gray-700 mb-6">
                  Can manage all the aspects of the organization: everything from members, billing and other organization-wide settings.
                </p>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">People & contracts</h4>
                      <button className="p-1 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>
                    </div>
                    <Separator className="bg-gray-100" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">Payroll & payments</h4>
                      <button className="p-1 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>
                    </div>
                    <Separator className="bg-gray-100" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">Analytics & reports</h4>
                      <button className="p-1 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>
                    </div>
                    <Separator className="bg-gray-100" />
                  </div>
                </div>
                
                <Button className="w-full mt-6 text-sm">
                  View Managers (1)
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Compliance;
