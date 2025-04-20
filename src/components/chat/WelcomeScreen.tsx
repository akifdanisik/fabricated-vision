
import React from 'react';
import { Card } from '@/components/ui/card';
import { FileSearch, ChartBar, ShieldCheck, Workflow } from 'lucide-react';

interface WelcomeModuleProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  onClick: () => void;
  children?: React.ReactNode;
}

const WelcomeModule: React.FC<WelcomeModuleProps> = ({ 
  title, 
  description, 
  icon, 
  features,
  onClick,
  children
}) => {
  return (
    <Card 
      className="w-full max-w-[300px] cursor-pointer hover:shadow-md transition-shadow border border-gray-200 relative"
      onClick={onClick}
    >
      {children}
      <div className="p-6">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-primary">
              {icon}
            </div>
          </div>
          <h3 className="text-base font-medium mb-2">{title}</h3>
          <p className="text-sm text-gray-500 mb-4">{description}</p>
          <div className="mt-4 space-y-1 text-xs text-gray-600">
            {features.map((feature, index) => (
              <p key={index}>{index + 1}. {feature}</p>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export interface WelcomeScreenProps {
  onSelectQuickStart: (prompt: string) => void;
  userName?: string;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ 
  onSelectQuickStart, 
  userName = "Ayşa" 
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 py-10">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-light mb-3">
          <span className="text-primary">Hello, </span>
          <span className="text-primary">{userName}</span>
        </h1>
        <p className="text-3xl text-gray-400 font-light">How can I help you today?</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl">
        <WelcomeModule
          title="Supplier & Inventory Intelligence"
          description="AI-driven supplier discovery, vetting, and predictive inventory planning"
          features={[
            "Supplier matching by certification, capacity, region",
            "Predictive sourcing based on consumption",
            "Smart inventory optimization"
          ]}
          icon={<FileSearch size={24} />}
          onClick={() => onSelectQuickStart("I need help with supplier matching based on our certification requirements")}
        />
        <WelcomeModule
          title="Compliance, Contract & Risk Intelligence"
          description="Unified compliance and contract management powered by AI"
          features={[
            "Document parsing (ISO, GMP, CE, ATEX, etc.)",
            "Contract clause extraction and detection",
            "Risk scoring and audit trail generation"
          ]}
          icon={<ShieldCheck size={24} />}
          onClick={() => onSelectQuickStart("I need to analyze our contract compliance and risk factors")}
        />
        <WelcomeModule
          title="Market & Price Intelligence"
          description="Real-time insights on price fluctuations and global supply trends"
          features={[
            "Global material pricing trends",
            "Tariff and duty calculators",
            "FX sensitivity alerts"
          ]}
          icon={<ChartBar size={24} />}
          onClick={() => onSelectQuickStart("Can you provide market and price intelligence for pharmaceutical APIs?")}
        >
          <div className="absolute inset-0 opacity-10 flex items-center justify-center">
            <img 
              src="/lovable-uploads/b834ef35-fd25-436d-a183-8a644126c748.png" 
              alt="Market Price Intelligence" 
              className="w-full h-full object-cover"
            />
          </div>
        </WelcomeModule>
        <WelcomeModule
          title="Workflow Automation & Collaboration"
          description="Smart orchestration of procurement workflows and internal coordination"
          features={[
            "Procurement task manager",
            "RFQ auto-generation and routing",
            "Notification and approval workflows"
          ]}
          icon={<Workflow size={24} />}
          onClick={() => onSelectQuickStart("I want to set up automated procurement workflows for our team")}
        />
      </div>
    </div>
  );
};

export default WelcomeScreen;
