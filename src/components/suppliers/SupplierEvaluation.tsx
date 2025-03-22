
import { useState } from 'react';
import { Supplier } from './SuppliersTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  TrendingUp, 
  Star, 
  ShieldCheck, 
  BarChart3, 
  AlertCircle, 
  CheckCircle2, 
  ArrowUpRight,
  RefreshCw
} from 'lucide-react';

interface SupplierEvaluationProps {
  suppliers: Supplier[];
}

export default function SupplierEvaluation({ suppliers }: SupplierEvaluationProps) {
  const [evaluationTab, setEvaluationTab] = useState('recommendations');
  
  // Simulate AI recommendations
  const recommendedSuppliers = [
    {
      id: 'rec1',
      name: 'BioAdvanced Labs',
      category: 'Active Ingredients',
      match: 92,
      strengths: ['Quality consistency', 'Competitive pricing', 'Regulatory compliance'],
      location: 'Zurich, Switzerland',
      initials: 'BL',
    },
    {
      id: 'rec2',
      name: 'EcoPackaging Solutions',
      category: 'Packaging',
      match: 88,
      strengths: ['Sustainable materials', 'Innovation', 'Delivery reliability'],
      location: 'Amsterdam, Netherlands',
      initials: 'ES',
    },
    {
      id: 'rec3',
      name: 'PureExcipients Co.',
      category: 'Excipients',
      match: 85,
      strengths: ['Product purity', 'Technical support', 'Batch consistency'],
      location: 'Toronto, Canada',
      initials: 'PE',
    },
  ];
  
  // Simulate performance insights
  const performanceInsights = [
    {
      id: 'ins1',
      title: 'Quality Trends',
      description: 'API suppliers show improved quality metrics over the last quarter',
      impact: 'positive',
      category: 'Active Ingredients',
    },
    {
      id: 'ins2',
      title: 'Delivery Performance',
      description: 'Packaging suppliers are experiencing longer lead times',
      impact: 'negative',
      category: 'Packaging',
    },
    {
      id: 'ins3',
      title: 'Price Stability',
      description: 'Excipient costs have remained stable despite market volatility',
      impact: 'positive',
      category: 'Excipients',
    },
    {
      id: 'ins4',
      title: 'Compliance Risk',
      description: 'Two suppliers require updated GMP certifications within 30 days',
      impact: 'warning',
      category: 'All',
    },
  ];
  
  // Simulate risk assessment
  const riskAssessment = {
    overall: 72,
    categories: [
      { name: 'Supply Chain Disruption', score: 65, trend: 'decreasing' },
      { name: 'Quality Control', score: 85, trend: 'stable' },
      { name: 'Pricing Volatility', score: 58, trend: 'increasing' },
      { name: 'Regulatory Compliance', score: 80, trend: 'stable' },
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/10">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">AI-Driven Supplier Evaluations</h2>
            <p className="text-sm text-muted-foreground">
              Insights based on performance data, market analysis, and risk factors
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <RefreshAnalysis className="mr-2 h-4 w-4" />
          Refresh Analysis
        </Button>
      </div>
      
      <Tabs value={evaluationTab} onValueChange={setEvaluationTab}>
        <TabsList>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="insights">Performance Insights</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recommendations" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-400" />
                Recommended Suppliers
              </CardTitle>
              <CardDescription>
                New suppliers that may fit your procurement needs based on your requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendedSuppliers.map((supplier) => (
                  <div key={supplier.id} className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{supplier.initials}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h3 className="font-medium">{supplier.name}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {supplier.category}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{supplier.location}</span>
                        </div>
                        <div className="space-y-1 mt-2">
                          <div className="text-xs text-muted-foreground">Match Score</div>
                          <div className="flex items-center gap-2">
                            <Progress value={supplier.match} className="h-1.5 w-24" />
                            <span className="text-sm font-medium">{supplier.match}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="text-sm font-medium">Key Strengths:</div>
                      <ul className="space-y-1">
                        {supplier.strengths.map((strength, idx) => (
                          <li key={idx} className="text-sm flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                            {strength}
                          </li>
                        ))}
                      </ul>
                      <Button size="sm">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Category Analysis
              </CardTitle>
              <CardDescription>
                Supplier category strengths and opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg space-y-2">
                  <h3 className="font-medium">Active Ingredients</h3>
                  <p className="text-sm text-muted-foreground">Current supplier pool is strong with good redundancy.</p>
                  <div className="pt-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Well Optimized
                    </Badge>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg space-y-2">
                  <h3 className="font-medium">Excipients</h3>
                  <p className="text-sm text-muted-foreground">Consider adding 1-2 more suppliers for better pricing leverage.</p>
                  <div className="pt-2">
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      Needs Attention
                    </Badge>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg space-y-2">
                  <h3 className="font-medium">Packaging</h3>
                  <p className="text-sm text-muted-foreground">High dependency on single supplier for glass vials.</p>
                  <div className="pt-2">
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      Action Required
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="insights" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Performance Insights
              </CardTitle>
              <CardDescription>
                AI-detected patterns and trends across your supplier network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceInsights.map((insight) => (
                  <div key={insight.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    {insight.impact === 'positive' && (
                      <div className="rounded-full p-2 bg-green-100">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                      </div>
                    )}
                    {insight.impact === 'negative' && (
                      <div className="rounded-full p-2 bg-red-100">
                        <ArrowUpRight className="h-5 w-5 text-red-600 transform rotate-90" />
                      </div>
                    )}
                    {insight.impact === 'warning' && (
                      <div className="rounded-full p-2 bg-amber-100">
                        <AlertCircle className="h-5 w-5 text-amber-600" />
                      </div>
                    )}
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{insight.title}</h3>
                        <Badge variant="outline">{insight.category}</Badge>
                      </div>
                      <p className="text-sm">{insight.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-400" />
                Top Performing Suppliers
              </CardTitle>
              <CardDescription>
                Best performers based on quality, delivery, and overall reliability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {suppliers
                  .filter(s => s.performance > 80)
                  .sort((a, b) => b.performance - a.performance)
                  .slice(0, 3)
                  .map((supplier) => (
                    <div key={supplier.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={supplier.logo} alt={supplier.name} />
                          <AvatarFallback>{supplier.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{supplier.name}</h3>
                          <p className="text-xs text-muted-foreground">{supplier.category}</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Performance</span>
                          <span className="text-sm font-medium">{supplier.performance}/100</span>
                        </div>
                        <Progress 
                          value={supplier.performance} 
                          className="h-1.5"
                          indicatorClassName={
                            supplier.performance >= 80 ? 'bg-green-500' : 
                            supplier.performance >= 60 ? 'bg-amber-500' : 'bg-red-500'
                          }
                        />
                      </div>
                      <div className="pt-2">
                        <Button variant="outline" size="sm" className="w-full">View Profile</Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="risk" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Risk Assessment Overview
              </CardTitle>
              <CardDescription>
                Comprehensive analysis of supply chain risks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 space-y-4">
                  <div className="text-center p-6 border rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground mb-4">Overall Risk Score</h3>
                    <div className="relative inline-flex items-center justify-center">
                      <svg className="w-32 h-32">
                        <circle
                          cx="64"
                          cy="64"
                          r="60"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="60"
                          fill="none"
                          stroke={riskAssessment.overall >= 80 ? "#10b981" : 
                                 riskAssessment.overall >= 60 ? "#f59e0b" : "#ef4444"}
                          strokeWidth="8"
                          strokeDasharray={`${riskAssessment.overall * 3.77} 377`}
                          strokeDashoffset="94.25"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute text-2xl font-bold">{riskAssessment.overall}</span>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">
                      {riskAssessment.overall >= 80 ? "Low risk level" : 
                      riskAssessment.overall >= 60 ? "Moderate risk level" : "High risk level"}
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-lg space-y-3">
                    <h3 className="font-medium">Risk Mitigation Actions</h3>
                    <ul className="space-y-2">
                      <li className="text-sm flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                        <span>Diversify packaging suppliers to reduce dependency</span>
                      </li>
                      <li className="text-sm flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                        <span>Implement price hedging strategies for volatile ingredients</span>
                      </li>
                      <li className="text-sm flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Current quality control measures are effective</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <div className="space-y-6">
                    <h3 className="text-sm font-medium">Risk Category Breakdown</h3>
                    <div className="space-y-4">
                      {riskAssessment.categories.map((category, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{category.name}</span>
                              {category.trend === 'increasing' && <ArrowUpRight className="h-4 w-4 text-red-500" />}
                              {category.trend === 'decreasing' && <ArrowUpRight className="h-4 w-4 text-green-500 transform rotate-90" />}
                              {category.trend === 'stable' && <ArrowUpRight className="h-4 w-4 text-amber-500 transform rotate-45" />}
                            </div>
                            <span className="text-sm font-medium">{category.score}/100</span>
                          </div>
                          <Progress 
                            value={category.score} 
                            className="h-2"
                            indicatorClassName={
                              category.score >= 80 ? 'bg-green-500' : 
                              category.score >= 60 ? 'bg-amber-500' : 'bg-red-500'
                            }
                          />
                          <p className="text-xs text-muted-foreground">
                            {category.trend === 'increasing' && "Risk increasing - monitor closely"}
                            {category.trend === 'decreasing' && "Risk decreasing - mitigation working"}
                            {category.trend === 'stable' && "Risk stable - maintain controls"}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-4 bg-amber-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                        <div>
                          <p className="font-medium">AI Risk Alert</p>
                          <p className="text-sm">Market analysis indicates potential supply constraints for key excipients in Q3. Consider pre-ordering critical materials.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function RefreshAnalysis({ className, ...props }: React.ComponentProps<typeof RefreshCw>) {
  return <RefreshCw className={className} {...props} />;
}

