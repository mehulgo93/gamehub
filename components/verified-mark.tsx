import { Check } from "lucide-react";
import { Hint } from "./hint";

export const VerifiedMark = () => {
  const label = "Verified";
  return (
    <div className="p-0.5 flex items-center justify-center h-4 w-4 rounded-full bg-blue-600">
      <Hint label={label} side="top" asChild>
        <Check className="h-[10px] w-[10px] text-primary stroke-[4px] hover:bg-white/10 hover:text-primary" />
      </Hint>
    </div>
  );
};
