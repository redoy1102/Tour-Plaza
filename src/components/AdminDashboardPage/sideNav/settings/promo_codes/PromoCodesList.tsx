import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import toast from "react-hot-toast";
import { promoCodesTableHeader } from "@/data/admin/AdminDashboardMenuData";
import type { PromoCodeFormValue } from "@/schemas/admin/adminSchema";
import { formatDateShort } from "@/lib/utils";
import EditButton from "../../shared/EditButton";
import DeleteButton from "../../shared/DeleteButton";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { addPromoCode, updatePromoCode } from "@/Redux/slices/promoCodeSlice";

interface PromoCodesListProps {
  handleEditPromoCode: (promoCodeId: string | null) => void;
}

const PromoCodesList = ({
  handleEditPromoCode,
}: PromoCodesListProps) => {
  const dispatch = useAppDispatch();
  const promoCodes = useAppSelector((state) => state.promoCodes.items);

  const handleDelete = (index: string) => {
    toast((t) => (
      <div className="flex flex-col items-start gap-4">
        <p>Are you sure you want to delete this promo code?</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setPromoCodes((prev) => prev.filter((_, i) => i !== index));
              toast.success("Promo code deleted successfully!");
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
      {promoCodes.length === 0 ? (
        <p className="text-gray-600">No promo codes added yet.</p>
      ) : (
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                {promoCodesTableHeader.map((header) => (
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
              {promoCodes.map((promoCode, index: number) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">
                    {promoCode.code}
                  </TableCell>
                  <TableCell className="font-medium">
                    {promoCode.discountPercentage}%
                  </TableCell>
                  <TableCell className="font-medium">
                    {promoCode.startDate
                      ? formatDateShort(promoCode.startDate)
                      : ""}
                  </TableCell>
                  <TableCell className="font-medium">
                    {promoCode.endDate
                      ? formatDateShort(promoCode.endDate)
                      : ""}
                  </TableCell>

                  <TableCell className="text-right flex items-center justify-end gap-2">
                    <EditButton onEdit={handleEditPromoCode} index={index} />
                    <DeleteButton onDelete={handleDelete} index={index} />
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

export default PromoCodesList;
