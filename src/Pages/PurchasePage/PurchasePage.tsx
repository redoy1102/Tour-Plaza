import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { PhoneCall, Lock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/Redux/hooks";
import { addEnrollment } from "@/Redux/slices/enrollmentSlice";
import toast from "react-hot-toast";

const PurchasePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const courses = useAppSelector((state) => state.courses.items);
  const promoCodes = useAppSelector((state) => state.promoCodes.items);
  console.log("Available Promo Codes:", promoCodes);
  const paymentMethods = useAppSelector((state) => state.paymentMethods.items);
  const currentStudent = useAppSelector(
    (state) => state.student.currentStudent,
  );

  const [searchParams] = useSearchParams();
  const promoCode = searchParams.get("promo");
  console.log("Applied Promo Code from URL:", promoCode);

  const course = courses.find((c) => c.id === courseId);
  const [selectedPayment, setSelectedPayment] = useState("bkash");

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-20">
        <h1 className="text-2xl font-bold text-slate-800">
          কোর্স পাওয়া যায়নি
        </h1>
      </div>
    );
  }

  const priceAfterDiscount = course?.price
    ? course.price - (course.discount ?? 0)
    : 0;
  const promoDiscountValue =
    promoCodes.find((p) => p.code === promoCode)?.discountPercentage || 0;
  const promoDiscount = promoCode
    ? (priceAfterDiscount * promoDiscountValue) / 100
    : 0;
  const finalPrice = priceAfterDiscount - promoDiscount;

  const appliedPromo = promoCodes
    ? promoCodes.find((p) => p.discountPercentage === promoDiscountValue)
    : undefined;

  const handlePayment = () => {
    if (!currentStudent) {
      toast.error("পেমেন্ট করতে প্রথমে লগইন করুন!");
      return;
    }
    if (!courseId) return;
    dispatch(
      addEnrollment({
        studentId: currentStudent.id,
        courseId,
        amount: finalPrice,
        status: "inProgress",
      }),
    );
    toast.success("পেমেন্ট সফল হয়েছে! কোর্সে ভর্তি হয়েছেন।");
    navigate("/student/my-courses");
  };

  return (
    <div className="container mx-auto px-4 md:px-12 xl:px-4 py-16 mt-20">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 md:p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            কমপ্লিট পেমেন্ট
          </h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Section: Course Summary */}
            <div className="space-y-8">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                  <div className="w-full md:w-32 h-20 bg-slate-100 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={course.bannerImage}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 leading-tight">
                    {course.title}
                  </h2>
                </div>

                <div className="space-y-4">
                  <h3 className="text-md font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                    পেমেন্ট ডিটেইলস
                  </h3>

                  <div className="flex justify-between items-center text-slate-600">
                    <span>কোর্সের মূল্য</span>
                    <span className="font-bold">
                      {course?.price ? `৳ ${course.price.toLocaleString()}` : 0}
                    </span>
                  </div>

                  {(course?.discount || promoDiscount > 0) && (
                    <div className="flex justify-between items-center text-emerald-600">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded text-xs font-bold border border-emerald-100 uppercase">
                          {appliedPromo && (course?.discount || 0) > 0
                            ? `${appliedPromo.code} & Discount`
                            : (course?.discount || 0) > 0
                              ? "Discount"
                              : appliedPromo
                                ? "Promo Code"
                                : ""}
                        </div>
                        <span className="text-sm">অ্যাপ্লাইড</span>
                      </div>
                      <span className="font-bold">
                        - ৳
                        {(
                          (course?.discount || 0) + promoDiscount
                        ).toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-lg font-bold text-slate-900">
                      টোটাল পেমেন্ট:
                    </span>
                    <span className="text-xl font-black text-slate-900">
                      ৳{finalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-orange-50/50 p-4 rounded-xl border border-orange-100">
                <div className="bg-orange-100 p-2 rounded-full">
                  <PhoneCall className="w-5 h-5 text-orange-600" />
                </div>
                <p className="text-slate-700 text-xs md:text-base">
                  প্রয়োজনে কল করুন{" "}
                  <span className="font-bold text-orange-600">
                    8801339865068
                  </span>{" "}
                  (সকাল ১০টা থেকে রাত ১০টা)
                </p>
              </div>
            </div>

            {/* Right Section: Payment Methods */}
            <div className="space-y-6">
              <h3 className="text-md font-bold text-slate-900">
                পেমেন্টের মাধ্যম
              </h3>

              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`relative flex items-center p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      selectedPayment === method.id
                        ? "border-primary bg-amber-50/10 shadow-md"
                        : "border-slate-100 hover:border-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-4 w-full">
                      <input
                        type="radio"
                        name="payment"
                        className="w-5 h-5 accent-primary"
                        checked={selectedPayment === method.id}
                        onChange={() => setSelectedPayment(method.id)}
                      />
                      <span className="font-bold text-slate-700">
                        {method.name}
                      </span>
                    </div>
                  </label>
                ))}
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 mt-8 space-y-6 text-right lg:text-left">
                <div className="flex justify-between items-center">
                  <span className="text-md font-bold text-slate-700">
                    টোটাল পেমেন্ট:
                  </span>
                  <span className="text-xl font-black text-slate-900">
                    ৳{finalPrice.toLocaleString()}
                  </span>
                </div>

                <Button
                  className="w-full h-14 bg-primary hover:bg-red-500 text-white text-md font-black rounded-xl shadow-lg shadow-red-200 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  onClick={handlePayment}
                >
                  পেমেন্ট সম্পন্ন করি
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Button>

                <div className="flex items-center justify-center gap-2 text-emerald-600 text-xs font-semibold">
                  <Lock className="w-4 h-4" />
                  সিকিউরড পেমেন্ট
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasePage;
