import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

const KbdCreateButton = () => {
  return (
    <Button
      size="sm"
      className="bg-red-500 hover:bg-red-600 cursor-pointer rounded-xl flex items-center gap-2"
    >
      Create
      <KbdGroup className="flex items-center gap-1 opacity-80">
        {" "}
        {/* Tighten the internal group */}
        <Kbd className="bg-transparent border-none p-0 min-w-0">⌘</Kbd>
        <span className="text-[10px]">+</span>
        <Kbd className="bg-transparent border-none p-0 min-w-0">K</Kbd>
      </KbdGroup>
    </Button>
  );
};

export default KbdCreateButton;
