
import { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Connection,
  MarkerType,
  Panel,
  NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Save, 
  Trash2, 
  FileText, 
  AlertCircle, 
  CheckCircle,
  Clock,
  Package,
  ShieldCheck,
  ClipboardList,
  UserCheck,
  Truck
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Define workflow node types
type NodeData = {
  label: string;
  type?: 'trigger' | 'task' | 'decision' | 'end';
  icon?: JSX.Element;
};

// Node components
const TriggerNode = ({ data }: { data: NodeData }) => (
  <div className="p-4 rounded-lg border-2 shadow-md bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700 w-48">
    <div className="flex items-center gap-2">
      {data.icon || <AlertCircle className="h-5 w-5 text-blue-500" />}
      <div className="font-medium">{data.label}</div>
    </div>
  </div>
);

const TaskNode = ({ data }: { data: NodeData }) => (
  <div className="p-4 rounded-lg border-2 shadow-md bg-amber-50 border-amber-200 dark:bg-amber-900/30 dark:border-amber-700 w-48">
    <div className="flex items-center gap-2">
      {data.icon || <ClipboardList className="h-5 w-5 text-amber-500" />}
      <div className="font-medium">{data.label}</div>
    </div>
  </div>
);

const DecisionNode = ({ data }: { data: NodeData }) => (
  <div className="p-4 rounded-lg border-2 shadow-md bg-purple-50 border-purple-200 dark:bg-purple-900/30 dark:border-purple-700 w-48">
    <div className="flex items-center gap-2">
      {data.icon || <FileText className="h-5 w-5 text-purple-500" />}
      <div className="font-medium">{data.label}</div>
    </div>
  </div>
);

const EndNode = ({ data }: { data: NodeData }) => (
  <div className="p-4 rounded-lg border-2 shadow-md bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-700 w-48">
    <div className="flex items-center gap-2">
      {data.icon || <CheckCircle className="h-5 w-5 text-green-500" />}
      <div className="font-medium">{data.label}</div>
    </div>
  </div>
);

// Supplier onboarding template
const supplierOnboardingTemplate = {
  nodes: [
    {
      id: 's1',
      type: 'trigger',
      data: { label: 'Collect Supplier Documents', icon: <FileText className="h-5 w-5 text-blue-500" />, type: 'trigger' },
      position: { x: 250, y: 25 },
    },
    {
      id: 's2',
      type: 'task',
      data: { label: 'Verify GMP Certification', icon: <ShieldCheck className="h-5 w-5 text-amber-500" />, type: 'task' },
      position: { x: 250, y: 125 },
    },
    {
      id: 's3',
      type: 'decision',
      data: { label: 'Evaluate Supplier Risk', icon: <AlertCircle className="h-5 w-5 text-purple-500" />, type: 'decision' },
      position: { x: 250, y: 225 },
    },
    {
      id: 's4',
      type: 'end',
      data: { label: 'Add to Approved Supplier List', icon: <UserCheck className="h-5 w-5 text-green-500" />, type: 'end' },
      position: { x: 250, y: 325 },
    },
  ],
  edges: [
    {
      id: 'se1-2',
      source: 's1',
      target: 's2',
      animated: true,
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    },
    {
      id: 'se2-3',
      source: 's2',
      target: 's3',
      animated: true,
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    },
    {
      id: 'se3-4',
      source: 's3',
      target: 's4',
      label: 'Approved',
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    },
  ],
};

// Inventory replenishment template
const inventoryReplenishmentTemplate = {
  nodes: [
    {
      id: 'i1',
      type: 'trigger',
      data: { label: 'Check Stock Levels', icon: <Package className="h-5 w-5 text-blue-500" />, type: 'trigger' },
      position: { x: 250, y: 25 },
    },
    {
      id: 'i2',
      type: 'decision',
      data: { label: 'Trigger Reorder if Below Threshold', icon: <AlertCircle className="h-5 w-5 text-purple-500" />, type: 'decision' },
      position: { x: 250, y: 125 },
    },
    {
      id: 'i3',
      type: 'task',
      data: { label: 'Approve Reorder', icon: <ClipboardList className="h-5 w-5 text-amber-500" />, type: 'task' },
      position: { x: 250, y: 225 },
    },
    {
      id: 'i4',
      type: 'end',
      data: { label: 'Track Delivery', icon: <Truck className="h-5 w-5 text-green-500" />, type: 'end' },
      position: { x: 250, y: 325 },
    },
  ],
  edges: [
    {
      id: 'ie1-2',
      source: 'i1',
      target: 'i2',
      animated: true,
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    },
    {
      id: 'ie2-3',
      source: 'i2',
      target: 'i3',
      label: 'Below Threshold',
      animated: true,
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    },
    {
      id: 'ie3-4',
      source: 'i3',
      target: 'i4',
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    },
  ],
};

// Initial workflow example (similar to what was there but with improved icons)
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'trigger',
    data: { label: 'Check Inventory', icon: <Package className="h-5 w-5 text-blue-500" />, type: 'trigger' },
    position: { x: 250, y: 25 },
  },
  {
    id: '2',
    type: 'task',
    data: { label: 'Create RFQ', icon: <FileText className="h-5 w-5 text-amber-500" />, type: 'task' },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'task',
    data: { label: 'Purchase Order', icon: <ClipboardList className="h-5 w-5 text-amber-500" />, type: 'task' },
    position: { x: 400, y: 125 },
  },
  {
    id: '4',
    type: 'end',
    data: { label: 'Order Confirmation', icon: <CheckCircle className="h-5 w-5 text-green-500" />, type: 'end' },
    position: { x: 250, y: 250 },
  },
];

// Initial edges
const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    label: 'Low Stock',
    animated: true,
    labelBgStyle: { fill: 'rgba(255, 255, 255, 0.8)', fillOpacity: 0.7 },
    labelStyle: { fontSize: 12 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    label: 'Critical Stock',
    animated: true,
    labelBgStyle: { fill: 'rgba(255, 255, 255, 0.8)', fillOpacity: 0.7 },
    labelStyle: { fontSize: 12 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e2-4',
    source: '2',
    target: '4',
    label: 'Approved',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    label: 'Sent',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];

export default function WorkflowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [nodeName, setNodeName] = useState('');
  const [nodeType, setNodeType] = useState<'trigger' | 'task' | 'decision' | 'end'>('task');
  const [isAddNodeOpen, setIsAddNodeOpen] = useState(false);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const { toast } = useToast();

  const nodeTypes = {
    trigger: TriggerNode,
    task: TaskNode,
    decision: DecisionNode,
    end: EndNode,
  };

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const openAddNodeDialog = () => {
    setNodeName('');
    setNodeType('task');
    setIsAddNodeOpen(true);
  };

  const addNewNode = () => {
    if (!nodeName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for the node",
        variant: "destructive",
      });
      return;
    }

    let icon;
    switch (nodeType) {
      case 'trigger':
        icon = <AlertCircle className="h-5 w-5 text-blue-500" />;
        break;
      case 'task':
        icon = <ClipboardList className="h-5 w-5 text-amber-500" />;
        break;
      case 'decision':
        icon = <FileText className="h-5 w-5 text-purple-500" />;
        break;
      case 'end':
        icon = <CheckCircle className="h-5 w-5 text-green-500" />;
        break;
    }

    const newNode: Node = {
      id: `${Date.now()}`,
      type: nodeType,
      data: { label: nodeName, icon, type: nodeType },
      position: { x: 250, y: 350 },
    };
    
    setNodes((nds) => nds.concat(newNode));
    setIsAddNodeOpen(false);
    toast({
      title: "Node Added",
      description: `Added a new ${nodeType} node to the workflow.`,
    });
  };

  const applyTemplate = (template: 'supplier' | 'inventory') => {
    const templateData = template === 'supplier' 
      ? supplierOnboardingTemplate 
      : inventoryReplenishmentTemplate;
    
    setNodes(templateData.nodes);
    setEdges(templateData.edges);
    setIsTemplateDialogOpen(false);
    
    toast({
      title: "Template Applied",
      description: `Applied the ${template === 'supplier' ? 'Supplier Onboarding' : 'Inventory Replenishment'} template.`,
    });
  };

  const saveWorkflow = () => {
    toast({
      title: "Workflow Saved",
      description: `Saved workflow with ${nodes.length} nodes and ${edges.length} connections.`,
    });
  };

  const deleteSelectedNode = () => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
      setEdges((eds) => eds.filter(
        (edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id
      ));
      setSelectedNode(null);
      toast({
        title: "Node Deleted",
        description: `Removed node from the workflow.`,
      });
    }
  };

  return (
    <div className="h-full w-full border rounded-lg overflow-hidden bg-[#F9FAFC]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes as NodeTypes}
        fitView
        attributionPosition="bottom-right"
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#e0e0e0" gap={16} />
        <Controls />
        <MiniMap />
        
        <Panel position="top-left" className="bg-white p-4 rounded-lg border shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Workflow Orchestrator</h2>
          <p className="text-sm text-muted-foreground mb-3">Design and automate procurement workflows</p>
          
          <div className="flex flex-col gap-2">
            <Button size="sm" onClick={() => setIsTemplateDialogOpen(true)}>
              <FileText className="h-4 w-4 mr-1" /> Load Template
            </Button>
            <Button size="sm" variant="outline" onClick={saveWorkflow}>
              <Save className="h-4 w-4 mr-1" /> Save Workflow
            </Button>
          </div>
        </Panel>
        
        <Panel position="top-right" className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="flex flex-col gap-2">
            <Button size="sm" onClick={openAddNodeDialog}>
              <Plus className="h-4 w-4 mr-1" /> Add Node
            </Button>
            
            <Button 
              size="sm" 
              variant="destructive" 
              onClick={deleteSelectedNode}
              disabled={!selectedNode}
            >
              <Trash2 className="h-4 w-4 mr-1" /> Delete Selected
            </Button>
          </div>
        </Panel>
      </ReactFlow>
      
      {/* Add Node Dialog */}
      <Dialog open={isAddNodeOpen} onOpenChange={setIsAddNodeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Node</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="node-name">Node Name</Label>
              <Input
                id="node-name"
                placeholder="Enter node name"
                value={nodeName}
                onChange={(e) => setNodeName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="node-type">Node Type</Label>
              <Select value={nodeType} onValueChange={(value) => setNodeType(value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select node type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trigger">Trigger</SelectItem>
                  <SelectItem value="task">Task</SelectItem>
                  <SelectItem value="decision">Decision</SelectItem>
                  <SelectItem value="end">End</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddNodeOpen(false)}>Cancel</Button>
            <Button onClick={addNewNode}>Add Node</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Template Dialog */}
      <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Load Workflow Template</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid gap-4">
              <div className="border rounded-lg p-4 hover:bg-slate-50 cursor-pointer" onClick={() => applyTemplate('supplier')}>
                <h3 className="font-medium mb-1">Supplier Onboarding Workflow</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Collect supplier documents</li>
                  <li>Verify GMP certification</li>
                  <li>Evaluate supplier risk</li>
                  <li>Add to approved supplier list</li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-4 hover:bg-slate-50 cursor-pointer" onClick={() => applyTemplate('inventory')}>
                <h3 className="font-medium mb-1">Inventory Replenishment Workflow</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Check stock levels</li>
                  <li>Trigger reorder if below threshold</li>
                  <li>Approve reorder</li>
                  <li>Track delivery</li>
                </ul>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTemplateDialogOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
