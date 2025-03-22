
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ComplianceOverview from '@/components/compliance/ComplianceOverview';
import DocumentManagement from '@/components/compliance/DocumentManagement';
import AuditReadiness from '@/components/compliance/AuditReadiness';
import { ShieldCheck, FileText, ClipboardCheck } from 'lucide-react';

const Compliance = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Compliance and Audit</CardTitle>
            <CardDescription>
              Ensure regulatory compliance and prepare for audits.
            </CardDescription>
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
                <ComplianceOverview />
              </TabsContent>
              
              <TabsContent value="documents" className="space-y-6">
                <DocumentManagement />
              </TabsContent>
              
              <TabsContent value="audit" className="space-y-6">
                <AuditReadiness />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Compliance;
