import React from 'react';
import { Card } from '@/components/ui/card';
import { FileText, BarChart3, PenLine, Code } from 'lucide-react';

interface WelcomeModuleProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  children?: React.ReactNode;
}

const WelcomeModule: React.FC<WelcomeModuleProps> = ({ 
  title, 
  description, 
  icon, 
  onClick,
  children
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
          {title === "Compliance, Contract & Risk Intelligence" && (
            <div className="mt-4 text-xs text-gray-600 space-y-2">
              <div>
                <div className="font-semibold mb-1">Functionality:</div>
                <div>
                  Unified compliance and contract management powered by AI.
                  Tracks certifications, contract obligations, renewal dates, and risk indicators from suppliers.
                </div>
              </div>
              <div>
                <div className="font-semibold mb-1">Includes:</div>
                <ul className="list-disc ml-5 space-y-0.5">
                  <li>Document parsing (ISO, GMP, CE, ATEX, etc.)</li>
                  <li>Contract clause extraction and deviation detection</li>
                  <li>Risk scoring and audit trail generation</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold mb-1">Value:</div>
                <div>
                  Ensures regulatory compliance, reduces contract risk, and simplifies audits.
                </div>
              </div>
              <div className="mt-4 space-y-1">
                <div className="h-2 w-full bg-gray-200 rounded-full"></div>
                <div className="h-2 w-3/4 bg-gray-200 rounded-full"></div>
                <div className="h-2 w-5/6 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          )}
          {title === "Workflow Automation & Collaboration" && (
            <div className="mt-4 text-xs text-gray-600 space-y-2">
              <div>
                <div className="font-semibold mb-1">Functionality:</div>
                <div>
                  Smart orchestration of procurement workflows, automated RFQs/RFPs, and internal task coordination between teams.
                </div>
              </div>
              <div>
                <div className="font-semibold mb-1">Includes:</div>
                <ul className="list-disc ml-5 space-y-0.5">
                  <li>Procurement task manager</li>
                  <li>RFQ auto-generation and routing</li>
                  <li>Notification and approval workflows</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold mb-1">Value:</div>
                <div>
                  Cuts operational friction, saves time, and ensures consistency across teams.
                </div>
              </div>
              <div className="mt-4 font-mono text-xs text-gray-500 bg-gray-50 p-2 rounded">
                <div>{"function connect() {"}</div>
                <div>&nbsp;&nbsp;{"return api.init();"}</div>
                <div>{"}"}</div>
              </div>
            </div>
          )}
          {title === "Supplier & Inventory Intelligence" && (
            <div className="mt-4 space-y-1 text-xs text-gray-600">
              <p>1. Submit your sourcing criteria or BOM</p>
              <p>2. Get AI-matched supplier recommendations</p>
              <p>3. Receive predictive inventory forecasts</p>
            </div>
          )}
          {title === "Analyze Smart Contracts" && (
            <div className="mt-4 space-y-1 text-xs text-gray-600">
              <p>1. Upload a contract for analysis</p>
              <p>2. Get risk assessment report</p>
              <p>3. Receive security recommendations</p>
            </div>
          )}
          {title === "Market & Price Intelligence" && (
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
          {children}
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
          description="Find the right suppliers and stay ahead of inventory risks with predictive procurement insights."
          icon={<FileText size={24} />}
          onClick={() => onSelectQuickStart("Help me find qualified suppliers and optimize inventory levels")}
        />
        <WelcomeModule
          title="Market & Price Intelligence"
          description="Real-time insights on price fluctuations, FX risk, global supply trends, tariffs, and material availability."
          icon={<BarChart3 size={24} />}
          onClick={() => onSelectQuickStart("Create a market analysis report for pharmaceutical APIs")}
        >
          <div className="mt-4">
            <div className="h-20 flex items-end">
              <div className="w-6 h-10 bg-blue-400 rounded-sm"></div>
              <div className="w-6 h-16 bg-blue-500 rounded-sm mx-1"></div>
              <div className="w-6 h-8 bg-blue-400 rounded-sm mr-1"></div>
              <div className="w-6 h-12 bg-blue-500 rounded-sm mr-1"></div>
              <div className="w-6 h-7 bg-blue-400 rounded-sm"></div>
            </div>
          </div>
        </WelcomeModule>
        <WelcomeModule
          title="Compliance, Contract & Risk Intelligence"
          description="Unified compliance and contract management powered by AI. Tracks certifications, contract obligations, renewal dates, and risk indicators from suppliers."
          icon={<PenLine size={24} />}
          onClick={() => onSelectQuickStart("Help me analyze contract risks and compliance status")}
        />
        <WelcomeModule
          title="Workflow Automation & Collaboration"
          description="Smart orchestration of procurement workflows, automated RFQs/RFPs, and internal task coordination between teams."
          icon={<Code size={24} />}
          onClick={() => onSelectQuickStart("Help me set up an automated RFQ workflow")}
        />
      </div>
    </div>
  );
};

export default WelcomeScreen;
