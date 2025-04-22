
import React, { useState } from "react";
import { 
  ChevronDown, 
  Folder, 
  List 
} from "lucide-react";
import { 
  Popover, 
  PopoverTrigger, 
  PopoverContent 
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Updated model/module names and descriptions
const models = [
  {
    id: 'supplier-inventory',
    name: 'Supplier & Inventory Intelligence',
    description: 'Find the right suppliers and stay ahead of inventory risks with predictive procurement insights. 1. Submit your sourcing criteria or BOM 2. Get AI-matched supplier recommendations 3. Receive predictive inventory forecasts',
    active: true,
    badge: null
  },
  {
    id: 'market-price',
    name: 'Market & Price Intelligence',
    description: 'Real-time insights on price fluctuations, FX risk, global supply trends, tariffs, and material availability.',
    active: true,
    badge: null
  },
  {
    id: 'compliance-contract-risk',
    name: 'Compliance, Contract & Risk Intelligence',
    description: 'Unified compliance and contract management powered by AI. Tracks certifications, contract obligations, renewal dates, and risk indicators from suppliers.',
    active: true,
    badge: null
  },
  {
    id: 'workflow-automation',
    name: 'Workflow Automation & Collaboration',
    description: '',
    active: true,
    badge: null
  }
];

export default function ChatHeaderTabs({
  folderName = "fabricated",
  chatName = "AI Procurement Modules Overview"
}: {
  folderName?: string;
  chatName?: string;
}) {
  const [modelOpen, setModelOpen] = useState(false);

  // Default to the first module
  const [currentModel, setCurrentModel] = useState(models[0].id);

  return (
    <div className="w-full border-b bg-white px-6 pt-2 pb-1 z-20">
      <div className="flex items-center gap-2 max-w-screen-xl mx-auto">
        {/* Folder */}
        <span className="flex items-center gap-1">
          <Folder className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium text-[15px] text-gray-700">{folderName}</span>
        </span>
        <span className="mx-1 text-gray-400">/</span>

        {/* Chat (current module/page) */}
        <span className="flex items-center gap-1 rounded px-2 py-1 bg-muted/50 text-gray-900 font-medium text-[15px]">
          <List className="w-4 h-4 text-muted-foreground" />
          <span>{chatName}</span>

          {/* Model Select Popover */}
          <Popover open={modelOpen} onOpenChange={setModelOpen}>
            <PopoverTrigger asChild>
              <button aria-label="Select Model" className="flex items-center gap-1 rounded px-1 ml-2 bg-transparent hover:bg-muted/80 text-gray-700 text-[15px]">
                <span className="text-xs font-medium text-gray-500">{models.find(m => m.id === currentModel)?.name ?? ""}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="start" className="p-0 border bg-white shadow-xl rounded-xl min-w-[340px] max-w-[400px] z-50">
              <div className="p-4 border-b font-semibold text-gray-600 text-sm">Module</div>
              <div className="py-1 divide-y divide-gray-100">
                {models.map(model => (
                  <button
                    key={model.id}
                    type="button"
                    disabled={!model.active}
                    onClick={() => model.active && setCurrentModel(model.id)}
                    className={cn(
                      "flex items-start gap-2 w-full px-4 py-3 text-left hover:bg-gray-50 transition-all",
                      model.active
                        ? (currentModel === model.id
                          ? "bg-gray-100 text-gray-800 font-semibold"
                          : "text-gray-800")
                        : "opacity-60 cursor-not-allowed"
                    )}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[15px] leading-none">{model.name}</span>
                        {model.badge &&
                          <span className="ml-1 px-2 py-0.5 rounded-full bg-gray-200 text-gray-600 text-[11px] font-semibold">{model.badge}</span>
                        }
                        {currentModel === model.id &&
                          <span className="ml-2 w-4 h-4 inline-block rounded-full border border-gray-400 bg-gray-800" />
                        }
                      </div>
                      {model.description &&
                        <div className="text-xs text-gray-500 mt-0.5">{model.description}</div>
                      }
                    </div>
                  </button>
                ))}
                <button className="w-full px-4 py-2 text-[15px] text-left text-gray-500 font-medium hover:bg-gray-50">More modules &rarr;</button>
              </div>
            </PopoverContent>
          </Popover>
        </span>
      </div>
    </div>
  );
}
