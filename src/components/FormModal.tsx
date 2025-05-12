
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
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1A1A1A] to-[#252525] p-[1px] transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-[#FF4B00]/30 cursor-pointer group">
          <div className="relative h-[200px] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#1A1A1A] to-[#252525] p-6 transition-all group-hover:bg-black/50 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF4B00]/20 to-[#FF8E00]/20 opacity-0 transition-opacity group-hover:opacity-100" />
            <h3 className="relative z-10 text-xl font-bold text-white text-center transition-colors duration-300 group-hover:text-[#FF4B00]">
              {title}
            </h3>
            <div className="absolute bottom-4 right-4 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <span className="text-[#FF4B00] text-sm">Voir les détails →</span>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-[#1A1A1A] border border-[#333] text-white rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#FF4B00] text-center">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {fields.map((field) => (
            <div key={field.id} className="grid gap-2">
              <label className="text-sm text-white hover:text-[#FF4B00] transition-colors duration-200">{field.label}</label>
              {field.type === "select" ? (
                <Select>
                  <SelectTrigger className="bg-[#252525] border-[#333] text-white rounded-xl hover:border-[#FF4B00] focus:border-[#FF4B00] focus:ring-1 focus:ring-[#FF4B00] transition-colors duration-200">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent className="bg-[#252525] border-[#333] rounded-xl">
                    {field.options?.map((option) => (
                      <SelectItem 
                        key={option} 
                        value={option.toLowerCase()}
                        className="text-white hover:bg-[#FF4B00]/20 hover:text-[#FF4B00] transition-colors duration-200"
                      >
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input 
                  className="bg-[#252525] border-[#333] text-white rounded-xl hover:border-[#FF4B00] focus:border-[#FF4B00] focus:ring-1 focus:ring-[#FF4B00] transition-colors duration-200" 
                  placeholder="Enter value..."
                />
              )}
            </div>
          ))}
          <Button 
            className="w-full bg-[#FF4B00] hover:bg-[#FF6B00] text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#FF4B00]/20"
          >
            Valider
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
