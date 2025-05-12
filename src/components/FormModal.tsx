
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
        <div className="relative overflow-hidden rounded-xl bg-[#222222] border border-[#00A9D2] p-[1px] transition-all hover:border-[#FF5500] cursor-pointer group">
          <div className="relative h-[200px] w-full overflow-hidden rounded-xl bg-[#222222] p-6 transition-all group-hover:bg-[#1A1A1A] flex items-center justify-center">
            <h3 className="relative z-10 text-xl font-bold text-white text-center transition-colors duration-300 group-hover:text-[#00A9D2]">
              {title}
            </h3>
            <div className="absolute bottom-4 right-4 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <span className="text-[#00A9D2] text-sm">Voir les détails →</span>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-[#222222] border border-[#00A9D2] text-white rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#00A9D2] text-center">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {fields.map((field) => (
            <div key={field.id} className="grid gap-2">
              <label className="text-sm text-white hover:text-[#00A9D2] transition-colors duration-200">{field.label}</label>
              {field.type === "select" ? (
                <Select>
                  <SelectTrigger className="bg-[#333333] border-[#444444] text-white hover:border-[#00A9D2] focus:border-[#00A9D2] focus:ring-1 focus:ring-[#00A9D2] transition-colors duration-200">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent className="bg-[#222222] border-[#444444] rounded-xl">
                    {field.options?.map((option) => (
                      <SelectItem 
                        key={option} 
                        value={option.toLowerCase()}
                        className="text-white hover:bg-[#333333] hover:text-[#00A9D2] transition-colors duration-200"
                      >
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input 
                  className="bg-[#333333] border-[#444444] text-white rounded-xl hover:border-[#00A9D2] focus:border-[#00A9D2] focus:ring-1 focus:ring-[#00A9D2] transition-colors duration-200" 
                  placeholder="Enter value..."
                />
              )}
            </div>
          ))}
          <div className="flex justify-end space-x-4">
            <Button
              className="bg-[#00A9D2] hover:bg-[#0095B8] text-white rounded-xl transition-all duration-300"
            >
              Annuler
            </Button>
            <Button 
              className="bg-[#FF5500] hover:bg-[#FF7700] text-white rounded-xl transition-all duration-300"
            >
              Valider
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
