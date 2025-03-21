
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="text-center space-y-2">
              <p className="text-lg font-semibold">Compliance Module</p>
              <p className="text-muted-foreground">
                This module is under development and will be available soon.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Compliance;
