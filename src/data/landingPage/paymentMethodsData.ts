import type { PaymentMethod } from "../../types/paymentMethods.interface";

export const paymentMethods: PaymentMethod[] = [
    {
      id: "bkash",
      image: "/public/paymentMethods/bkash-payment.webp"
    },
    {
      id: "nagad_rocket_visa_master",
      image: "/public/paymentMethods/rocket_nagad_master_visa.png"
    },
    {
      id: "india",
      image: "/public/paymentMethods/india_flag.webp", 
      label: "Pay from India (Card)",
    },
    {
      id: "international",
      image: "/public/paymentMethods/globe.webp", 
      label: "Pay Internationally (Card)",
    },
  ];