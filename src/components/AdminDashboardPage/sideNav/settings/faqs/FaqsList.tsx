import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import toast from "react-hot-toast";
import { faqTableHeader } from "@/data/admin/AdminDashboardMenuData";
import EditButton from "../../shared/EditButton";
import DeleteButton from "../../shared/DeleteButton";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { removeFaq } from "@/Redux/slices/faqSlice";

interface FaqsListProps {
  handleEditFaq: (faqId: string | null) => void;
}

const FaqsList = ({ handleEditFaq }: FaqsListProps) => {
  const dispatch = useAppDispatch();
  const faqs = useAppSelector((state) => state.faqs.items);

  const handleDelete = (faqId: string) => {
    toast((t) => (
      <div className="flex flex-col items-start gap-4">
        <p>Are you sure you want to delete this FAQ?</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              dispatch(removeFaq(faqId));
              toast.success("FAQ deleted successfully!");
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
    <div className=" border-gray-200">
      {faqs.length === 0 ? (
        <p className="text-gray-600">No FAQs added yet.</p>
      ) : (
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                {faqTableHeader.map((header) => (
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
              {faqs.map((faq, index: number) => (
                <TableRow key={faq.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{faq.faqTitle}</TableCell>
                  <TableCell className="font-medium">
                    {faq.faqDescription}
                  </TableCell>

                  <TableCell className="text-right flex items-center justify-end gap-2">
                    <EditButton onEdit={handleEditFaq} index={faq.id} />
                    <DeleteButton onDelete={handleDelete} index={faq.id} />
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

export default FaqsList;
