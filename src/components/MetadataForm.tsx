import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Use this for multi-line text input
import formSchema from "@/lib/zod";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { uploadImageToArweave, uploadMetadataToArweave } from "@/utils/arweave";
import { toast } from "react-toastify";
function MetadataForm() {
  // Define the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      image: undefined,
      attributes: [{ trait_type: "", value: "" }],
      sellerFee: 500, // Default 5%
      externalUrl: "",
    },
  });

  // Field array for attributes
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "attributes",
  });

  // Submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Handle image upload to Arweave and get URL
    try{
      if(!values.image){
        toast.error('Please upload an image')
        return 
      }

      const imageUrl = await uploadImageToArweave(values.image)
      const metadata = {
        name: values.name,
        description: values.description,
        image: imageUrl,
        attributes: values.attributes,
        seller_fee_basis_points: values.sellerFee,
        external_url: values.externalUrl
      }

      const metadataUrl = await uploadMetadataToArweave(metadata)
      toast.success('Metadata uploaded to Arweave')
      return metadataUrl
    } catch(err){
      console.error(`Error Submitting metadata to Arweave: ${err}`)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" rounded-lg p-12 w-[80%] bg-white space-y-4">
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter NFT Name" {...field} />
              </FormControl>
              <FormDescription>This is the name of your NFT.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description Field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your NFT" {...field} />
              </FormControl>
              <FormDescription>A brief description of your NFT.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Upload Field */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/png, image/jpeg, image/gif"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormDescription>Upload an image for your NFT.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Attributes Field */}
        <FormLabel>Attributes</FormLabel>
        {fields.map((item, index) => (
          <div key={item.id} className="space-y-2 md:flex md:justify-center md:flex-col">
            <div className="space-y-2 md:flex  md:space-x-4">
            <div className="md:flex md:space-x-4">
            <FormField
              control={form.control}
              name={`attributes.${index}.trait_type`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trait Type</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Color" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`attributes.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Blue" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <Button type="button" onClick={() => remove(index)} variant="destructive" className="md:translate-y-6">
              <MdOutlineDeleteOutline />
            </Button>
            </div>
          </div>
        ))}
        <Button type="button" onClick={() => append({ trait_type: "", value: "" })}>
          Add Attribute
        </Button>
        {/* Seller Fee Field */}
        <FormField
          control={form.control}
          name="sellerFee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seller Fee (Basis Points)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="500" {...field} />
              </FormControl>
              <FormDescription>Enter the royalty percentage in basis points (e.g., 500 for 5%).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* External URL Field */}
        <FormField
          control={form.control}
          name="externalUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>External URL</FormLabel>
              <FormControl>
                <Input placeholder="Link to external resource" {...field} />
              </FormControl>
              <FormDescription>Optional link to an external website.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Upload Metadata</Button>
      </form>
    </Form>
  );
}

export default MetadataForm;