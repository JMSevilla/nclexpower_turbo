import {
  useBusinessQueryContext,
  useExecuteToast,
} from "core-library/contexts";
import { PricingForm } from "./PricingForm";
import { PricingParams } from "core-library/types/types";

export function PricingFormBlock() {
  const { businessQueryCreatePricing } = useBusinessQueryContext();
  const { mutateAsync, isLoading } = businessQueryCreatePricing();
  const { executeToast } = useExecuteToast();

  async function onSubmit(values: PricingParams) {
    await mutateAsync({ ...values });
    executeToast("Successfully Added", "top-right", false, { type: "success" });
  }
  return <PricingForm onSubmit={onSubmit} submitLoading={isLoading} />;
}
