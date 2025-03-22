
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Calendar as CalendarIcon, FileInput, FilePlus, Lightbulb, PenLine, ShieldCheck } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ContractCreationProps {
  onSubmit: () => void;
  onCancel: () => void;
}

const formSchema = z.object({
  supplierName: z.string().min(2, {
    message: "Supplier name must be at least 2 characters.",
  }),
  materialName: z.string().min(2, {
    message: "Material name must be at least 2 characters.",
  }),
  startDate: z.date(),
  endDate: z.date(),
  value: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Value must be a positive number.",
  }),
  paymentTerms: z.string().min(1, {
    message: "Payment terms are required.",
  }),
  deliverySchedule: z.string().min(1, {
    message: "Delivery schedule is required.",
  }),
  minOrderQty: z.string(),
  qualityStandards: z.string(),
  penalties: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const ContractCreation = ({ onSubmit, onCancel }: ContractCreationProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supplierName: "",
      materialName: "",
      value: "",
      paymentTerms: "net30",
      deliverySchedule: "monthly",
      minOrderQty: "",
      qualityStandards: "",
      penalties: "",
    },
  });

  const handleGenerateAI = () => {
    const supplierName = form.getValues("supplierName");
    const materialName = form.getValues("materialName");
    
    if (!supplierName || !materialName) {
      toast.error("Please enter supplier and material names first.");
      return;
    }
    
    // Simulate AI generation by pre-filling some fields
    form.setValue("value", "125000");
    form.setValue("minOrderQty", "100 kg");
    form.setValue("qualityStandards", "USP/NF, EP");
    form.setValue("penalties", "2% per week for late delivery");
    
    toast.success("AI populated contract with suggested terms based on similar contracts.");
  };

  const handleGenerateTemplate = () => {
    // Set default values for a basic contract template
    form.setValue("paymentTerms", "net30");
    form.setValue("deliverySchedule", "monthly");
    form.setValue("minOrderQty", "50 kg");
    form.setValue("qualityStandards", "USP/NF");
    form.setValue("penalties", "1% per week for late delivery");
    
    toast.success("Template applied successfully.");
  };

  const handleFormSubmit = (data: FormValues) => {
    console.log("Contract form submitted:", data);
    toast.success("Contract created successfully!");
    onSubmit();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Create New Contract</h2>
          <p className="text-gray-500">Set up a new supplier contract</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleGenerateTemplate}>
            <FilePlus className="mr-2 h-4 w-4" />
            Use Template
          </Button>
          <Button variant="outline" onClick={handleGenerateAI}>
            <Lightbulb className="mr-2 h-4 w-4" />
            AI Suggestions
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Enter the fundamental contract details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="supplierName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supplier Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., PharmaCorp" {...field} />
                      </FormControl>
                      <FormDescription>
                        The legal name of the supplier
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="materialName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Material Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Paracetamol API" {...field} />
                      </FormControl>
                      <FormDescription>
                        The primary material being supplied
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Select date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        When the contract becomes effective
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Select date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        When the contract expires
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contract Value (USD)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 120000" {...field} />
                      </FormControl>
                      <FormDescription>
                        The total value of the contract
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Terms & Conditions</CardTitle>
              <CardDescription>
                Define the key terms of this contract
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="paymentTerms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Terms</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment terms" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="net15">Net 15 days</SelectItem>
                          <SelectItem value="net30">Net 30 days</SelectItem>
                          <SelectItem value="net45">Net 45 days</SelectItem>
                          <SelectItem value="net60">Net 60 days</SelectItem>
                          <SelectItem value="prepaid">Prepaid</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        When payment is due after delivery
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deliverySchedule"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Schedule</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select delivery schedule" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="biweekly">Bi-weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="ondemand">On-demand</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        How often deliveries will occur
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="minOrderQty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Order Quantity</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 100 kg" {...field} />
                      </FormControl>
                      <FormDescription>
                        The minimum quantity per order
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="qualityStandards"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quality Standards</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., USP/NF, EP" {...field} />
                      </FormControl>
                      <FormDescription>
                        Required quality standards for materials
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="penalties"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Late Delivery Penalties</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 2% per week for late delivery" {...field} />
                      </FormControl>
                      <FormDescription>
                        Penalties for non-compliance or late delivery
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compliance Documents</CardTitle>
              <CardDescription>
                Upload required compliance documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-dashed rounded-lg p-6 text-center flex flex-col items-center justify-center">
                    <FileInput className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm font-medium">GMP Certificate</p>
                    <p className="text-xs text-gray-500 mb-2">PDF, JPG, or PNG up to 5MB</p>
                    <Button variant="outline" size="sm">
                      Select File
                    </Button>
                  </div>

                  <div className="border border-dashed rounded-lg p-6 text-center flex flex-col items-center justify-center">
                    <FileInput className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm font-medium">Quality Agreement</p>
                    <p className="text-xs text-gray-500 mb-2">PDF, JPG, or PNG up to 5MB</p>
                    <Button variant="outline" size="sm">
                      Select File
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              <PenLine className="mr-2 h-4 w-4" />
              Create Contract
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContractCreation;
