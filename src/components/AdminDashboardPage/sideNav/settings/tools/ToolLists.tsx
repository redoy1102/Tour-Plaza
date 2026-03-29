import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import toast from "react-hot-toast";
import { toolsTableHeader } from "@/data/admin/AdminDashboardMenuData";
import ImagePreviewHolder from "../../shared/ImagePreviewHolder";
import { SquarePen, Trash } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/Redux/hooks";
import { removeTool } from "@/Redux/slices/toolsSlice";

interface ToolListsProps {
  handleEditTool: (toolId: string | null) => void;
}

const ToolLists = ({ handleEditTool }: ToolListsProps) => {
  const dispatch = useAppDispatch();
  const tools = useAppSelector((state) => state.tools.items);
  const handleDelete = (id: string) => {
    toast((t) => (
      <div className="flex flex-col items-start gap-4">
        <p>Are you sure you want to delete this tool?</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              dispatch(removeTool(id));
              toast.success("Tool deleted successfully!");
              toast.dismiss(t.id);
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="border-gray-200">
      {tools.length === 0 ? (
        <p className="text-gray-600">No tools added yet.</p>
      ) : (
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                {toolsTableHeader.map((header) => (
                  <TableHead
                    key={header.id}
                    className={header.align === "right" ? "text-right" : ""}
                  >
                    {header.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {tools.map((tool, index) => (
                <TableRow key={tool.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <ImagePreviewHolder imageSrc={tool.imageFile} />
                  </TableCell>
                  <TableCell>{tool.name}</TableCell>
                  <TableCell>{tool.description}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditTool(tool.id)}
                        className="p-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition cursor-pointer"
                      >
                        <SquarePen className="h-3 w-3"/>
                      </button>
                      <button
                        onClick={() => handleDelete(tool.id)}
                        className="p-1 bg-red-500 hover:bg-red-600 text-white rounded-md transition cursor-pointer"
                      >
                        <Trash className="h-3 w-3"/>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ToolLists;
