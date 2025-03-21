
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
  Panel
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '@/components/ui/button';
import { Plus, Save, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Define workflow node types
type NodeData = {
  label: string;
  type?: string;
};

// Initial nodes setup
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Inventory Check', type: 'trigger' },
    position: { x: 250, y: 25 },
    className: 'bg-blue-100 border-blue-300 dark:bg-blue-900/30 dark:border-blue-700',
  },
  {
    id: '2',
    data: { label: 'Approval Request', type: 'task' },
    position: { x: 100, y: 125 },
    className: 'bg-amber-100 border-amber-300 dark:bg-amber-900/30 dark:border-amber-700',
  },
  {
    id: '3',
    data: { label: 'Generate Purchase Order', type: 'task' },
    position: { x: 400, y: 125 },
    className: 'bg-amber-100 border-amber-300 dark:bg-amber-900/30 dark:border-amber-700',
  },
  {
    id: '4',
    type: 'output',
    data: { label: 'Order Confirmation', type: 'end' },
    position: { x: 250, y: 250 },
    className: 'bg-green-100 border-green-300 dark:bg-green-900/30 dark:border-green-700',
  },
];

// Initial edges setup
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

const nodeTypes = {
  trigger: ({ data }: { data: NodeData }) => (
    <div className="p-2 rounded border-2 shadow-md bg-blue-50 border-blue-200">
      {data.label}
    </div>
  ),
  task: ({ data }: { data: NodeData }) => (
    <div className="p-2 rounded border-2 shadow-md bg-amber-50 border-amber-200">
      {data.label}
    </div>
  ),
  end: ({ data }: { data: NodeData }) => (
    <div className="p-2 rounded border-2 shadow-md bg-green-50 border-green-200">
      {data.label}
    </div>
  ),
};

export default function WorkflowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const { toast } = useToast();

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const addNewNode = () => {
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      data: { label: `New Task ${nodes.length + 1}`, type: 'task' },
      position: { x: 250, y: 350 },
      className: 'bg-amber-100 border-amber-300 dark:bg-amber-900/30 dark:border-amber-700',
    };
    
    setNodes((nds) => nds.concat(newNode));
    toast({
      title: "Node Added",
      description: `Added a new task node to the workflow.`,
    });
  };

  const saveWorkflow = () => {
    // In a real application, we would save to a database
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
    <div className="h-full w-full border rounded-lg overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
        attributionPosition="bottom-right"
      >
        <Background />
        <Controls />
        <MiniMap />
        <Panel position="top-right" className="bg-background/90 p-2 rounded-lg border shadow-sm">
          <div className="flex flex-col gap-2">
            <Button size="sm" onClick={addNewNode}>
              <Plus className="h-4 w-4 mr-1" /> Add Node
            </Button>
            <Button size="sm" variant="outline" onClick={saveWorkflow}>
              <Save className="h-4 w-4 mr-1" /> Save
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
    </div>
  );
}
