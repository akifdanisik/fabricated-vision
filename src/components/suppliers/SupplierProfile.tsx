
import { Supplier } from './SuppliersTable';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Star, 
  Mail, 
  Phone, 
  MapPin, 
  Package, 
  FileCheck, 
  Clock, 
  AlertTriangle, 
  UserCheck 
} from 'lucide-react';

interface SupplierProfileProps {
  supplier: Supplier;
}

export default function SupplierProfile({ supplier }: SupplierProfileProps) {
  // Simulate additional supplier details
  const certifications = [
    { id: 1, name: 'GMP Certification', status: 'Valid', expiry: '2025-06-15' },
    { id: 2, name: 'ISO 9001', status: 'Valid', expiry: '2024-12-03' },
    { id: 3, name: 'Environmental Compliance', status: 'Valid', expiry: '2024-09-20' },
  ];
  
  const performanceMetrics = {
    deliveryTime: { value: 92, label: 'On-Time Delivery' },
    qualityRating: { value: 88, label: 'Quality Rating' },
    rejectionRate: { value: 3, label: 'Rejection Rate (%)' },
    responseTime: { value: 95, label: 'Response Time' },
  };
  
  const riskFactors = [
    { factor: 'Financial Stability', rating: 'High', score: 85 },
    { factor: 'Geopolitical Risk', rating: 'Low', score: 95 },
    { factor: 'Supply Chain Redundancy', rating: 'Medium', score: 72 },
    { factor: 'Compliance History', rating: 'High', score: 90 },
  ];
  
  const documents = [
    { name: 'Certificate of Analysis (CoA)', date: '2023-11-10', type: 'PDF' },
    { name: 'Material Safety Data Sheet', date: '2023-10-05', type: 'PDF' },
    { name: 'GMP Certificate', date: '2023-09-15', type: 'PDF' },
    { name: 'Quality Agreement', date: '2023-08-22', type: 'PDF' },
  ];
  
  const getMetricColor = (value: number) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Supplier information */}
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={supplier.logo} alt={supplier.name} />
                  <AvatarFallback>{supplier.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl">{supplier.name}</CardTitle>
                  <CardDescription>{supplier.category}</CardDescription>
                </div>
              </div>
              <Badge 
                variant="outline" 
                className={`
                  ${supplier.riskLevel === 'low' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                  ${supplier.riskLevel === 'medium' ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}
                  ${supplier.riskLevel === 'high' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                `}
              >
                {supplier.riskLevel.charAt(0).toUpperCase() + supplier.riskLevel.slice(1)} Risk
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Contact Person</div>
                <div className="font-medium">{supplier.contact.name}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Performance Score</div>
                <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-medium">{supplier.performance}/100</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Email</div>
                <div className="flex items-center">
                  <Mail className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span>{supplier.contact.email}</span>
                </div>
              </div>
              {supplier.contact.phone && (
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Phone</div>
                  <div className="flex items-center">
                    <Phone className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span>{supplier.contact.phone}</span>
                  </div>
                </div>
              )}
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Location</div>
                <div className="flex items-center">
                  <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span>{supplier.location}</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Items Supplied</div>
                <div className="flex items-center">
                  <Package className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span>{supplier.items} items</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Mail className="mr-2 h-4 w-4" />
                Contact
              </Button>
              <Button variant="outline" size="sm">
                <UserCheck className="mr-2 h-4 w-4" />
                Update
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        {/* Certifications */}
        <Card className="w-full md:w-80">
          <CardHeader>
            <CardTitle className="text-lg">Certifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-start border-b pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium">{cert.name}</p>
                  <p className="text-sm text-muted-foreground">Expires: {cert.expiry}</p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {cert.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="performance">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Docs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(performanceMetrics).map(([key, metric]) => (
              <Card key={key}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{metric.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">
                      {metric.value}{key === 'rejectionRate' ? '%' : ''}
                    </div>
                    <Progress 
                      value={key === 'rejectionRate' ? 100 - metric.value : metric.value} 
                      className="h-2"
                      indicatorClassName={getMetricColor(key === 'rejectionRate' ? 100 - metric.value : metric.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Performance History</CardTitle>
              <CardDescription>Last 12 months performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Performance chart will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="risk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Risk Assessment</CardTitle>
              <CardDescription>Analysis of various risk factors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskFactors.map((risk, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{risk.factor}</span>
                      <Badge 
                        variant="outline" 
                        className={`
                          ${risk.rating === 'High' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                          ${risk.rating === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}
                          ${risk.rating === 'Low' && risk.factor !== 'Geopolitical Risk' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                          ${risk.factor === 'Geopolitical Risk' && risk.rating === 'Low' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                        `}
                      >
                        {risk.rating}
                      </Badge>
                    </div>
                    <Progress 
                      value={risk.score} 
                      className="h-2"
                      indicatorClassName={getMetricColor(risk.score)}
                    />
                    <p className="text-sm text-muted-foreground">Score: {risk.score}/100</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monitoring Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Delayed Shipment Detected</p>
                    <p className="text-sm text-muted-foreground">Expected delay of 3 days for Order #GMP-2023-456</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <Clock className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Contract Renewal Upcoming</p>
                    <p className="text-sm text-muted-foreground">Supply agreement expires in 45 days</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Compliance Documents</CardTitle>
              <CardDescription>Required certifications and documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileCheck className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">Updated: {doc.date}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
