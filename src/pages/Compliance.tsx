
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ComplianceOverview from '@/components/compliance/ComplianceOverview';
import DocumentManagement from '@/components/compliance/DocumentManagement';
import AuditReadiness from '@/components/compliance/AuditReadiness';
import { ShieldCheck, FileText, ClipboardCheck } from 'lucide-react';
import { Category } from '@/components/categories/CategoryBadge';
import CategoryFilter from '@/components/categories/CategoryFilter';

// Make sure we're properly defining the props for each compliance component
interface ComplianceComponentProps {
  selectedCategories: Category[];
}

// Update the component definitions to properly accept props
const EnhancedComplianceOverview = ({ selectedCategories }: ComplianceComponentProps) => 
  <ComplianceOverview selectedCategories={selectedCategories} />;

const EnhancedDocumentManagement = ({ selectedCategories }: ComplianceComponentProps) => 
  <DocumentManagement selectedCategories={selectedCategories} />;

const EnhancedAuditReadiness = ({ selectedCategories }: ComplianceComponentProps) => 
  <AuditReadiness selectedCategories={selectedCategories} />;

const Compliance = () => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const handleCategoryFilterChange = (categories: Category[]) => {
    setSelectedCategories(categories);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Compliance and Audit</CardTitle>
              <CardDescription>
                Ensure regulatory compliance and prepare for audits.
              </CardDescription>
            </div>
            <CategoryFilter 
              onFilterChange={handleCategoryFilterChange} 
              showLabel={false}
              className="flex-shrink-0" 
            />
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Compliance Dashboard
                </TabsTrigger>
                <TabsTrigger value="documents">
                  <FileText className="mr-2 h-4 w-4" />
                  Document Management
                </TabsTrigger>
                <TabsTrigger value="audit">
                  <ClipboardCheck className="mr-2 h-4 w-4" />
                  Audit Readiness
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <EnhancedComplianceOverview selectedCategories={selectedCategories} />
              </TabsContent>
              
              <TabsContent value="documents" className="space-y-6">
                <EnhancedDocumentManagement selectedCategories={selectedCategories} />
              </TabsContent>
              
              <TabsContent value="audit" className="space-y-6">
                <EnhancedAuditReadiness selectedCategories={selectedCategories} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Compliance;
