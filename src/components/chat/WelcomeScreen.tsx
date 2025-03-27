
import React from 'react';
import { Card } from '@/components/ui/card';
import { FileText, BarChart3, PenLine, Code } from 'lucide-react';

interface WelcomeModuleProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const WelcomeModule: React.FC<WelcomeModuleProps> = ({ 
  title, 
  description, 
  icon, 
  onClick 
}) => {
  return (
    <Card 
      className="w-full max-w-[300px] cursor-pointer hover:shadow-md transition-shadow border border-gray-200"
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-primary">
              {icon}
            </div>
          </div>
          <h3 className="text-base font-medium mb-2">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
          {title === "Analyze Smart Contracts" && (
            <div className="mt-4 space-y-1 text-xs text-gray-600">
              <p>1. Upload a contract for analysis</p>
              <p>2. Get risk assessment report</p>
              <p>3. Receive security recommendations</p>
            </div>
          )}
          {title === "Create Market Analysis" && (
            <div className="mt-4">
              <div className="h-20 flex items-end">
                <div className="w-6 h-10 bg-blue-400 rounded-sm"></div>
                <div className="w-6 h-16 bg-blue-500 rounded-sm mx-1"></div>
                <div className="w-6 h-8 bg-blue-400 rounded-sm mr-1"></div>
                <div className="w-6 h-12 bg-blue-500 rounded-sm mr-1"></div>
                <div className="w-6 h-7 bg-blue-400 rounded-sm"></div>
              </div>
            </div>
          )}
          {title === "Draft Procurement Docs" && (
            <div className="mt-4 space-y-1">
              <div className="h-2 w-full bg-gray-200 rounded-full"></div>
              <div className="h-2 w-3/4 bg-gray-200 rounded-full"></div>
              <div className="h-2 w-5/6 bg-gray-200 rounded-full"></div>
            </div>
          )}
          {title === "Generate Integration Code" && (
            <div className="mt-4 font-mono text-xs text-gray-500 bg-gray-50 p-2 rounded">
              <div>{"function connect() {"}</div>
              <div>&nbsp;&nbsp;{"return api.init();"}</div>
              <div>{"}"}</div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

interface WelcomeScreenProps {
  onSelectQuickStart: (prompt: string) => void;
  userName?: string;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSelectQuickStart, userName = "User" }) => {
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
          title="Analyze Smart Contracts"
          description="Get a risk assessment and security analysis for your smart contracts"
          icon={<FileText size={24} />}
          onClick={() => onSelectQuickStart("I want to analyze a smart contract for risks")}
        />
        <WelcomeModule
          title="Create Market Analysis"
          description="Generate market insights based on your procurement data"
          icon={<BarChart3 size={24} />}
          onClick={() => onSelectQuickStart("Create a market analysis report for pharmaceutical APIs")}
        />
        <WelcomeModule
          title="Draft Procurement Docs"
          description="Create professional procurement documents and contracts"
          icon={<PenLine size={24} />}
          onClick={() => onSelectQuickStart("Help me draft a procurement document for medical supplies")}
        />
        <WelcomeModule
          title="Generate Integration Code"
          description="Create code for integrating with procurement systems"
          icon={<Code size={24} />}
          onClick={() => onSelectQuickStart("Generate code for integrating with our inventory system")}
        />
      </div>
    </div>
  );
};

export default WelcomeScreen;
