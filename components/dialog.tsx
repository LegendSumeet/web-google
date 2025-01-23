import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
    DialogClose,
    DialogTitle,
} from "@/components/ui/dialog";

// Define a prop type for the component
interface DialogDemoProps {
  htmlContent: string;
}

export function DialogDemo({ htmlContent }: DialogDemoProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="z-10">View Content</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500] md:max-w-[900px] lg:max-w-[1200px] max-h-[80vh] overflow-hidden">
        <DialogTitle className="text-sm font-semibold">HTML Content</DialogTitle>
        <div className="py-4 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 120px)' }}>
          <div
            className=""
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild className="absolute bottom-2 right-4">
            <Button type="button">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
