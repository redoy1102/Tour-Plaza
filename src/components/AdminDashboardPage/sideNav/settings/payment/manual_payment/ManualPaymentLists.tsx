import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SquarePen, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { paymentMethodsTableHeader } from "@/data/admin/AdminDashboardMenuData";
import { useAppSelector } from "@/Redux/hooks";
import { useDispatch } from "react-redux";
import { removePayment } from "@/Redux/slices/paymentSlice";
// import ImagePreviewHolder from "../../../shared/ImagePreviewHolder";

interface ManualPaymentListsProps {
  handleEditPaymentMethod: (paymentMethodId: string | null) => void;
}

const ManualPaymentLists = ({
  handleEditPaymentMethod,
}: ManualPaymentListsProps) => {
  const dispatch = useDispatch();
  const paymentMethods = useAppSelector((state) => state.paymentMethods.items);

  const handleDelete = (paymentMethodId: string) => {
    toast((t) => (
      <div className="flex flex-col items-start gap-4">
        <p>Are you sure you want to delete this payment method?</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              dispatch(removePayment(paymentMethodId));
              toast.success("Payment method deleted successfully!");
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
      {paymentMethods.length === 0 ? (
        <p className="text-gray-600">No payment methods added yet.</p>
      ) : (
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                {paymentMethodsTableHeader.map((header) => (
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
              {paymentMethods.map((paymentMethod, index: number) => (
                <TableRow key={paymentMethod.id}>
                  <TableCell>{index + 1}</TableCell>
                  {/* <TableCell>
                    <ImagePreviewHolder
                      imageSrc={paymentMethod.imageFile}
                      altText={paymentMethod.name}
                      imgWidth={20}
                      imgHeight={10}
                    />
                  </TableCell> */}
                  <TableCell className="font-medium">
                    {paymentMethod.name}
                  </TableCell>
                  <TableCell className="font-medium">
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: paymentMethod.description ?? "",
                      }}
                    />
                  </TableCell>
                  <TableCell className="text-right flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEditPaymentMethod(paymentMethod.id)}
                      className="cursor-pointer"
                    >
                      <SquarePen />
                    </button>
                    <button
                      onClick={() => handleDelete(paymentMethod.id)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <Trash />
                    </button>
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

export default ManualPaymentLists;
