import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  copied: string | null;
  onCopy: (text: string) => void;
  targetCopy: string;
}

const CopyButton = ({ copied, onCopy, targetCopy }: CopyButtonProps) => {
  return (
    <button
      onClick={() => onCopy(targetCopy)}
      className={`p-1.5 rounded-md transition-all duration-200 flex items-center justify-center cursor-pointer
        ${
          copied === targetCopy
            ? "bg-green-100 text-green-600"
            : "bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600 opacity-100"
        }`}
      title="Copy Email"
    >
      {copied === targetCopy ? (
        <Check className="w-3 h-3" />
      ) : (
        <Copy className="w-3 h-3" />
      )}
    </button>
  );
};

export default CopyButton;
