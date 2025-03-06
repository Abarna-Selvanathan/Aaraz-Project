import { useSearchParams } from "next/navigation";
import PaymentSuccess from "../../../components/Success-payment/success";

function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams?.get("oid");

  // Check if orderId is null and handle accordingly
  const validOrderId: string | undefined = orderId ?? undefined;

  return (
    <div>
      <PaymentSuccess orderId={validOrderId} />
    </div>
  );
}

export default PaymentSuccessPage;
