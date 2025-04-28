
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FormModalProps {
  title: string;
  fields: Array<{
    id: string;
    label: string;
    type: string;
    options?: string[];
  }>;
}

export function FormModal({ title, fields }: FormModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1A1A1A] to-[#252525] p-[1px] transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-[#FF4B00]/20 cursor-pointer group">
          <div className="relative h-[200px] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#1A1A1A] to-[#252525] p-6 transition-all group-hover:bg-black/50">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF4B00]/20 to-[#00E0FF]/20 opacity-0 transition-opacity group-hover:opacity-100" />
            <h3 className="relative z-10 bg-gradient-to-r from-[#FF4B00] to-[#00E0FF] bg-clip-text text-xl font-bold text-transparent">
              {title}
            </h3>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-[#1A1A1A] border border-[#333] text-white rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#FF4B00] to-[#00E0FF] bg-clip-text text-transparent">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {fields.map((field) => (
            <div key={field.id} className="grid gap-2">
              <label className="text-sm text-[#8E9196]">{field.label}</label>
              {field.type === "select" ? (
                <Select>
                  <SelectTrigger className="bg-[#252525] border-[#333] text-white rounded-xl">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent className="bg-[#252525] border-[#333] rounded-xl">
                    {field.options?.map((option) => (
                      <SelectItem 
                        key={option} 
                        value={option.toLowerCase()}
                        className="text-white hover:bg-[#333] focus:bg-[#333]"
                      >
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input 
                  className="bg-[#252525] border-[#333] text-white rounded-xl" 
                  placeholder="Enter value..."
                />
              )}
            </div>
          ))}
          <Button 
            className="w-full bg-gradient-to-r from-[#FF4B00] to-[#00E0FF] hover:opacity-90 rounded-xl"
          >
            Valider
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
