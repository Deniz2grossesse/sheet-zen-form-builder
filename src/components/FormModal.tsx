
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
import { useState } from "react"
import { Heart } from "lucide-react"

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
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div 
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1A1A1A] to-[#252525] p-[1px] transition-all hover:scale-[1.03] hover:shadow-xl hover:shadow-[#FF4B00]/30 cursor-pointer group"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="relative h-[200px] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#1A1A1A] to-[#252525] p-6 transition-all group-hover:bg-black/50">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF4B00]/20 to-[#FF6B00]/20 opacity-0 transition-opacity group-hover:opacity-100" />
            
            {isHovering && (
              <div className="absolute -bottom-2 -right-2 opacity-70">
                <Heart size={60} className="text-[#FF4B00] animate-pulse" fill="#FF4B00" />
              </div>
            )}

            <h3 className="relative z-10 text-xl font-bold text-white mb-3 transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:from-[#FF4B00] group-hover:to-[#FF6B00] group-hover:bg-clip-text group-hover:text-transparent">
              {title}
            </h3>
            
            <div className="relative z-10 opacity-60 group-hover:opacity-90 transition-opacity duration-300">
              <div className="flex items-center gap-1 text-sm">
                <Heart size={14} className="text-[#FF4B00]" fill="#FF4B00" />
                <span>{fields.length} champs</span>
              </div>
            </div>
            
            {isHovering && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10">
                <Heart size={100} className="text-[#FF4B00] animate-heartbeat" fill="#FF4B00" />
              </div>
            )}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-[#1A1A1A] border border-[#FF4B00]/20 text-white rounded-3xl backdrop-blur-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#FF4B00] to-[#FF6B00] bg-clip-text text-transparent flex items-center gap-2">
            <Heart size={20} className="text-[#FF4B00]" fill="#FF4B00" />
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {fields.map((field) => (
            <div key={field.id} className="grid gap-2 group">
              <label className="text-sm text-white group-hover:text-[#FF4B00] transition-colors duration-200 flex items-center gap-1">
                <Heart size={12} className="text-[#FF4B00] opacity-0 group-hover:opacity-100 transition-opacity" fill="#FF4B00" />
                {field.label}
              </label>
              {field.type === "select" ? (
                <Select>
                  <SelectTrigger className="bg-[#252525] border-[#333] text-white rounded-xl hover:border-[#FF4B00] focus:border-[#FF4B00] focus:ring-[#FF4B00]/20 transition-all duration-200">
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
                  className="bg-[#252525] border-[#333] text-white rounded-xl hover:border-[#FF4B00] focus:border-[#FF4B00] focus:ring-[#FF4B00]/20 transition-all duration-200" 
                  placeholder="Enter value..."
                />
              )}
            </div>
          ))}
          <Button 
            className="w-full bg-gradient-to-r from-[#FF4B00] to-[#FF6B00] hover:opacity-90 rounded-xl flex items-center gap-2 group relative overflow-hidden"
          >
            <span className="relative z-10">Valider</span>
            <Heart size={16} className="text-white relative z-10 group-hover:animate-ping" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B00] to-[#FF4B00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
