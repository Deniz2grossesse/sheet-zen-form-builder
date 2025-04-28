
import { Heart } from "lucide-react";
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
import { useState } from "react";

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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div 
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1A1A1A] to-[#252525] p-[1px] transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-[#FF4B00]/20 cursor-pointer group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative h-[200px] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#1A1A1A] to-[#252525] p-6 transition-all group-hover:bg-black/50">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF4B00]/20 to-[#00E0FF]/20 opacity-0 transition-opacity group-hover:opacity-100" />
            
            {/* Floating hearts */}
            <div className="absolute inset-0 overflow-hidden">
              {isHovered && (
                <>
                  <Heart className="absolute text-[#FF4B00] w-6 h-6 animate-bounce opacity-70" style={{top: '20%', left: '20%', animationDelay: '0.1s'}}/>
                  <Heart className="absolute text-[#FF4B00] w-4 h-4 animate-bounce opacity-50" style={{top: '30%', right: '30%', animationDelay: '0.3s'}}/>
                  <Heart className="absolute text-[#FF4B00] w-5 h-5 animate-bounce opacity-60" style={{bottom: '25%', left: '40%', animationDelay: '0.7s'}}/>
                </>
              )}
            </div>

            {/* Card Title with Heart */}
            <div className="flex items-center gap-2 relative z-10">
              <Heart className={`w-5 h-5 transition-all duration-300 ${isHovered ? 'text-[#FF4B00] scale-125' : 'text-white/50'}`} />
              <h3 className="text-xl font-bold text-white transition-colors duration-200 group-hover:bg-gradient-to-r group-hover:from-[#FF4B00] group-hover:to-[#00E0FF] group-hover:bg-clip-text group-hover:text-transparent">
                {title}
              </h3>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-[#1A1A1A] border border-[#333] text-white rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#FF4B00] to-[#00E0FF] bg-clip-text text-transparent flex items-center gap-2">
            <Heart className="text-[#FF4B00] w-6 h-6" />
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {fields.map((field) => (
            <div key={field.id} className="grid gap-2">
              <label className="text-sm text-white hover:text-[#FF4B00] transition-colors duration-200 flex items-center gap-1">
                <Heart className="w-3 h-3 text-[#FF4B00]/70" />
                {field.label}
              </label>
              {field.type === "select" ? (
                <Select>
                  <SelectTrigger className="bg-[#252525] border-[#333] text-white rounded-xl hover:border-[#FF4B00] transition-colors duration-200">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent className="bg-[#252525] border-[#333] rounded-xl">
                    {field.options?.map((option) => (
                      <SelectItem 
                        key={option} 
                        value={option.toLowerCase()}
                        className="text-white hover:bg-[#333] hover:text-[#00E0FF] transition-colors duration-200"
                      >
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input 
                  className="bg-[#252525] border-[#333] text-white rounded-xl hover:border-[#FF4B00] transition-colors duration-200" 
                  placeholder="Enter value..."
                />
              )}
            </div>
          ))}
          <Button 
            className="w-full bg-gradient-to-r from-[#FF4B00] to-[#00E0FF] hover:opacity-90 rounded-xl relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Heart className="w-4 h-4 group-hover:scale-125 transition-all" />
              Valider
            </span>
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
