
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Progress 
} from "@/components/ui/progress";
import {
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  ShieldCheck,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Category } from '@/components/categories/CategoryBadge';

// Types
interface ComplianceOverviewProps {
  selectedCategories?: Category[];
}

interface ComplianceStats {
  totalDocuments: number;
  compliantDocuments: number;
  expiringDocuments: number;
  expiredDocuments: number;
}

interface ComplianceCategory {
  id: string;
  name: string;
  compliantCount: number;
  totalCount: number;
  status: 'high' | 'medium' | 'low';
}

// Component
const ComplianceOverview = ({ selectedCategories = [] }: ComplianceOverviewProps) => {
  // Sample data
  const stats: ComplianceStats = {
    totalDocuments: 245,
    compliantDocuments: 198,
    expiringDocuments: 28,
    expiredDocuments: 19
  };

  const categories: ComplianceCategory[] = [
    {
      id: "1",
      name: "GMP Certifications",
      compliantCount: 42,
      totalCount: 45,
      status: 'high',
    },
    {
      id: "2",
      name: "Supplier Qualifications",
      compliantCount: 36,
      totalCount: 40,
      status: 'high',
    },
    {
      id: "3",
      name: "Material Safety Data Sheets",
      compliantCount: 65,
      totalCount: 78,
      status: 'medium',
    },
    {
      id: "4",
      name: "Quality Agreements",
      compliantCount: 32,
      totalCount: 38,
      status: 'medium',
    },
    {
      id: "5",
      name: "Certificates of Analysis",
      compliantCount: 23,
      totalCount: 44,
      status: 'low',
    },
  ];

  // Calculate overall compliance percentage
  const compliancePercentage = Math.round(
    (stats.compliantDocuments / stats.totalDocuments) * 100
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Overall Compliance
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex flex-col items-center justify-center py-2">
              <div className="relative flex h-24 w-24 items-center justify-center">
                <svg className="h-full w-full" viewBox="0 0 100 100">
                  <circle
                    className="stroke-gray-200"
                    cx="50"
                    cy="50"
                    r="40"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    className={cn(
                      "stroke-current transition-all",
                      compliancePercentage >= 90 ? "text-green-500" :
                      compliancePercentage >= 70 ? "text-amber-500" : "text-red-500"
                    )}
                    cx="50"
                    cy="50"
                    r="40"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (compliancePercentage / 100) * 251.2}
                    style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
                  />
                </svg>
                <span className="absolute text-2xl font-bold">{compliancePercentage}%</span>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-4 text-center text-sm">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900">{stats.compliantDocuments}</span>
                  <span className="text-muted-foreground">Compliant</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900">{stats.expiredDocuments}</span>
                  <span className="text-muted-foreground">Expired</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Documents Status
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex flex-col space-y-3 py-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Compliant</span>
                <span className="ml-auto text-sm font-medium">
                  {stats.compliantDocuments}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" />
                <span className="text-sm">Expiring Soon</span>
                <span className="ml-auto text-sm font-medium">
                  {stats.expiringDocuments}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-sm">Expired</span>
                <span className="ml-auto text-sm font-medium">
                  {stats.expiredDocuments}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Total</span>
                <span className="ml-auto text-sm font-medium">
                  {stats.totalDocuments}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Compliance by Category
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-4">
              {categories.map((category) => {
                const percentage = Math.round(
                  (category.compliantCount / category.totalCount) * 100
                );
                return (
                  <div key={category.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{category.name}</span>
                      <span 
                        className={cn(
                          "text-xs font-medium",
                          percentage >= 90 ? "text-green-600" :
                          percentage >= 70 ? "text-amber-600" : "text-red-600"
                        )}
                      >
                        {category.compliantCount}/{category.totalCount} ({percentage}%)
                      </span>
                    </div>
                    <Progress 
                      value={percentage} 
                      className={cn(
                        percentage >= 90 ? "bg-green-100" :
                        percentage >= 70 ? "bg-amber-100" : "bg-red-100"
                      )} 
                    />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComplianceOverview;
