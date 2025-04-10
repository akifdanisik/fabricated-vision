
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, File, FileArchive, FileImage, FilePlus, Search, Filter, Download, Trash2, Share2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

interface Document {
  id: string;
  name: string;
  type: string;
  category: string;
  size: string;
  lastModified: string;
  status: "approved" | "pending" | "rejected";
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Q1 2024 Supplier Report.pdf",
    type: "PDF",
    category: "Report",
    size: "2.4 MB",
    lastModified: "2024-03-25",
    status: "approved"
  },
  {
    id: "2",
    name: "MedSource Contract.docx",
    type: "DOCX",
    category: "Contract",
    size: "1.8 MB",
    lastModified: "2024-04-02",
    status: "approved"
  },
  {
    id: "3",
    name: "FDA Compliance Certificate.pdf",
    type: "PDF",
    category: "Compliance",
    size: "3.2 MB",
    lastModified: "2024-03-18",
    status: "approved"
  },
  {
    id: "4",
    name: "Raw Material Analysis.xlsx",
    type: "XLSX",
    category: "Analysis",
    size: "4.7 MB",
    lastModified: "2024-04-05",
    status: "pending"
  },
  {
    id: "5",
    name: "API Supplier Presentation.pptx",
    type: "PPTX",
    category: "Presentation",
    size: "8.3 MB",
    lastModified: "2024-04-01",
    status: "approved"
  },
  {
    id: "6",
    name: "GMP Certification 2024.pdf",
    type: "PDF",
    category: "Compliance",
    size: "1.5 MB",
    lastModified: "2024-03-29",
    status: "pending"
  },
  {
    id: "7",
    name: "Cost Analysis Q1.xlsx",
    type: "XLSX",
    category: "Analysis",
    size: "2.2 MB",
    lastModified: "2024-03-22",
    status: "rejected"
  }
];

const getFileIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'pdf':
      return <FileText className="h-5 w-5 text-red-500" />;
    case 'docx':
      return <FileText className="h-5 w-5 text-blue-500" />;
    case 'xlsx':
      return <FileText className="h-5 w-5 text-green-500" />;
    case 'pptx':
      return <FileText className="h-5 w-5 text-orange-500" />;
    case 'zip':
    case 'rar':
      return <FileArchive className="h-5 w-5 text-purple-500" />;
    case 'jpg':
    case 'png':
    case 'gif':
      return <FileImage className="h-5 w-5 text-teal-500" />;
    default:
      return <File className="h-5 w-5 text-gray-500" />;
  }
};

const getStatusColor = (status: Document['status']) => {
  switch (status) {
    case 'approved':
      return 'bg-green-100 text-green-800 hover:bg-green-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
    case 'rejected':
      return 'bg-red-100 text-red-800 hover:bg-red-200';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
};

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  const toggleDocumentSelection = (id: string) => {
    setSelectedDocuments(prev => 
      prev.includes(id) 
        ? prev.filter(docId => docId !== id) 
        : [...prev, id]
    );
  };

  const selectAllDocuments = () => {
    if (selectedDocuments.length === mockDocuments.length) {
      setSelectedDocuments([]);
    } else {
      setSelectedDocuments(mockDocuments.map(doc => doc.id));
    }
  };

  const filteredDocuments = mockDocuments.filter(doc => {
    // Filter by search query
    if (searchQuery && !doc.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by tab
    if (activeTab !== "all" && doc.category.toLowerCase() !== activeTab) {
      return false;
    }
    
    return true;
  });

  const handleAction = (action: string) => {
    if (selectedDocuments.length === 0) {
      toast({
        title: "No documents selected",
        description: "Please select at least one document to perform this action.",
        duration: 3000,
      });
      return;
    }

    const count = selectedDocuments.length;
    const documentText = count === 1 ? "document" : "documents";

    switch (action) {
      case "download":
        toast({
          title: `Downloading ${count} ${documentText}`,
          description: "Your download will begin shortly.",
          duration: 3000,
        });
        break;
      case "delete":
        toast({
          title: `${count} ${documentText} deleted`,
          description: "The selected documents have been moved to trash.",
          duration: 3000,
        });
        setSelectedDocuments([]);
        break;
      case "share":
        toast({
          title: "Share documents",
          description: `Preparing to share ${count} ${documentText}...`,
          duration: 3000,
        });
        break;
      default:
        break;
    }
  };

  return (
    <Layout fullWidth>
      <div className="h-full bg-white">
        <div className="flex flex-col h-full">
          <div className="border-b p-4 bg-white">
            <h1 className="text-2xl font-bold">Documents</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage all your documents in one place
            </p>
          </div>

          <div className="flex items-center justify-between p-4 border-b bg-gray-50">
            <div className="flex items-center gap-2">
              <Button onClick={() => handleAction("download")} variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button onClick={() => handleAction("delete")} variant="outline" size="sm" className="gap-1">
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
              <Button onClick={() => handleAction("share")} variant="outline" size="sm" className="gap-1">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search documents..."
                  className="pl-8 h-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="default" size="sm" className="gap-1">
                <FilePlus className="h-4 w-4" />
                Upload
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="flex-1 flex flex-col" onValueChange={setActiveTab}>
            <div className="border-b bg-white px-4">
              <TabsList className="bg-transparent h-auto p-0">
                <TabsTrigger value="all" className="py-2.5 px-4 text-sm">All Documents</TabsTrigger>
                <TabsTrigger value="report" className="py-2.5 px-4 text-sm">Reports</TabsTrigger>
                <TabsTrigger value="contract" className="py-2.5 px-4 text-sm">Contracts</TabsTrigger>
                <TabsTrigger value="compliance" className="py-2.5 px-4 text-sm">Compliance</TabsTrigger>
                <TabsTrigger value="analysis" className="py-2.5 px-4 text-sm">Analysis</TabsTrigger>
                <TabsTrigger value="presentation" className="py-2.5 px-4 text-sm">Presentations</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="flex-1 p-0 m-0">
              <div className="h-full overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox 
                          checked={selectedDocuments.length === mockDocuments.length && mockDocuments.length > 0}
                          indeterminate={selectedDocuments.length > 0 && selectedDocuments.length < mockDocuments.length}
                          onCheckedChange={selectAllDocuments}
                        />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Modified</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocuments.length > 0 ? (
                      filteredDocuments.map((doc) => (
                        <TableRow key={doc.id} className="hover:bg-gray-50">
                          <TableCell className="py-2">
                            <Checkbox 
                              checked={selectedDocuments.includes(doc.id)}
                              onCheckedChange={() => toggleDocumentSelection(doc.id)}
                            />
                          </TableCell>
                          <TableCell className="py-3 flex items-center gap-2">
                            {getFileIcon(doc.type)}
                            <span className="font-medium">{doc.name}</span>
                          </TableCell>
                          <TableCell>{doc.category}</TableCell>
                          <TableCell>{doc.size}</TableCell>
                          <TableCell>{doc.lastModified}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(doc.status)}>
                              {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-32 text-center">
                          <div className="flex flex-col items-center justify-center text-gray-500">
                            <FileText className="h-10 w-10 mb-2 opacity-20" />
                            <p className="font-medium">No documents found</p>
                            <p className="text-sm">Try adjusting your search or filters</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            {/* The other tab contents will filter based on the activeTab state */}
            <TabsContent value="report" className="flex-1 m-0 p-0 data-[state=active]:flex">
              {/* Content is filtered through the filteredDocuments */}
            </TabsContent>
            <TabsContent value="contract" className="flex-1 m-0 p-0 data-[state=active]:flex">
              {/* Content is filtered through the filteredDocuments */}
            </TabsContent>
            <TabsContent value="compliance" className="flex-1 m-0 p-0 data-[state=active]:flex">
              {/* Content is filtered through the filteredDocuments */}
            </TabsContent>
            <TabsContent value="analysis" className="flex-1 m-0 p-0 data-[state=active]:flex">
              {/* Content is filtered through the filteredDocuments */}
            </TabsContent>
            <TabsContent value="presentation" className="flex-1 m-0 p-0 data-[state=active]:flex">
              {/* Content is filtered through the filteredDocuments */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Documents;
