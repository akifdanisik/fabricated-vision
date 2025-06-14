
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

// Fashion Product Lifecycle Management modules
const models = [
  {
    id: 'design-development',
    name: 'Design & Development',
    description: 'Manage concept to prototype development cycle.',
    active: true,
    badge: null
  },
  {
    id: 'sourcing-production',
    name: 'Sourcing & Production',
    description: 'Factory selection and production management.',
    active: true,
    badge: null
  },
  {
    id: 'quality-compliance',
    name: 'Quality & Compliance',
    description: 'Quality control and regulatory compliance.',
    active: true,
    badge: null
  },
  {
    id: 'launch-lifecycle',
    name: 'Launch & Lifecycle',
    description: 'Product launch and end-of-life management.',
    active: true,
    badge: null
  }
];

export default function ChatHeaderTabs({
  folderName = "collections",
  chatName = "Fashion PLM Overview"
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
              <button aria-label="Select Module" className="flex items-center gap-1 rounded px-1 ml-2 bg-transparent hover:bg-muted/80 text-gray-700 text-[15px]">
                <span className="text-xs font-medium text-gray-500">{models.find(m => m.id === currentModel)?.name ?? ""}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="start" className="p-0 border bg-white shadow-xl rounded-xl min-w-[340px] max-w-[400px] z-50">
              <div className="p-4 border-b font-semibold text-gray-600 text-sm">PLM Module</div>
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
