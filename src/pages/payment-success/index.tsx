import { useSearchParams } from "next/navigation";
import PaymentSuccess from "../../../components/Success-payment/success";

function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams?.get("oid");

  return (
    <div>
      <PaymentSuccess orderId={orderId} />
    </div>
  );
}

export default PaymentSuccessPage;
