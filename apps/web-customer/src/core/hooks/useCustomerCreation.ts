import { CreateCustomerParams } from "core-library/api/types";
import { useBusinessQueryContext } from "core-library/contexts";
import React from "react";

export const useCustomerCreation = () => {
  const { businessQueryCreateCustomer } = useBusinessQueryContext();
  const { mutateAsync, isLoading } = businessQueryCreateCustomer();

  async function createCustomerAsync(params: CreateCustomerParams) {
    await mutateAsync({ ...params });
  }

  return {
    createCustomerAsync,
    isLoading,
  };
};
