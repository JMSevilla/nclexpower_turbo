/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import React, {useState , useEffect} from 'react';
import { RegistrationForm } from './RegistrationForm';
import { RegistrationFormType } from 'core-library/system';
import { useRouter } from "core-library/core/router";
import { useDecryptOrder } from "core-library/core/utils/useDecryptOrder";
import { useOrderNumber } from "core-library/contexts/auth/hooks";
import {AccountCreationData} from "core-library/types/types";

export const RegistrationBlock = () => {
    const router = useRouter();

    const orderDetail = useDecryptOrder();

    const [orderNumber, setOrderNumber] = useOrderNumber();
    const [productId, setProductId] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    
    useEffect(() => {
      if(orderDetail){
        setProductId(orderDetail?.pricingId);
        setAmount(orderDetail?.amount);
      }
    }, [orderDetail]);

    async function handleSubmit(values: RegistrationFormType) {
        
      if(orderNumber) {
        const filteredValues: AccountCreationData = {
          firstname: values.firstname,
          middlename: values.middlename,
          lastname: values.lastname,
          email: values.email,
          password: values.password,
          orderNumber,
          productId,
          totalAmount: amount,
        };
      }
    }

    const handleBack = () => {
        router.push((route) => route.order_summary);
      };

    return (
        <RegistrationForm onSubmit={handleSubmit} handleBack={handleBack} />
    )
  }