import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TextModalProps {
  btnLabel: string;
  title?: string;
  description: string;
}

const TextModal = ({btnLabel, title, description}: TextModalProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button size="sm" className="bg-red-500 hover:bg-red-600 cursor-pointer rounded-xl">{btnLabel}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TextModal;
