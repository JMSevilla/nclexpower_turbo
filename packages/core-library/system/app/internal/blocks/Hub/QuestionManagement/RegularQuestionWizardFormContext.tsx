import { yupResolver } from "@hookform/resolvers/yup";
import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { FormProvider, useForm } from "react-hook-form";
import { UseFormReturn } from "react-hook-form";
import { regularQuestionSchema } from "./validation";
import { RegularQuestionFormType } from "./types";
import { useRegularQuestionFormDirtyState } from "./useRegularQuestionFormDirtyState";

export interface UseRegularQuestionWizardFormContextValue {
  dependants: Partial<RegularQuestionFormType>[];
  form: UseFormReturn<RegularQuestionFormType>;
  isDirty: boolean;
  setIsDirty: (value: boolean) => void;
  onUpdate(values: Partial<RegularQuestionFormType>, isDirty?: boolean): void;
}

interface RegularQuestionWizardFormContextProviderProps {
  formKey: string;
  dependants: Partial<RegularQuestionFormType>[];
}

const RegularQuestionWizardFormContext =
  createContext<UseRegularQuestionWizardFormContextValue>({
    dependants: [] as Partial<RegularQuestionFormType>[],
    form: {} as UseFormReturn<RegularQuestionFormType>,
    onUpdate: () => null,
    setIsDirty: () => null,
    isDirty: false,
  });

export const useRegularQuestionWizardFormContext = () =>
  useContext(RegularQuestionWizardFormContext);

export const RegularQuestionWizardFormContextProvider: React.FC<
  React.PropsWithChildren<RegularQuestionWizardFormContextProviderProps>
> = ({ children, formKey, dependants }) => {
  const form = useForm<RegularQuestionFormType>({
    resolver: yupResolver(regularQuestionSchema),
    mode: "onChange",
    criteriaMode: "all",
    defaultValues:
      regularQuestionSchema.getDefault() as RegularQuestionFormType,
  });
  const { isDirty, setIsDirty } = useRegularQuestionFormDirtyState(
    form.formState
  );

  return (
    <FormProvider {...form}>
      <RegularQuestionWizardFormContext.Provider
        value={useMemo(
          () => ({
            form,
            isDirty,
            dependants: dependants!,
            setIsDirty,
            onUpdate: () => {},
          }),
          [dependants, form, formKey, isDirty]
        )}
      >
        {children}
      </RegularQuestionWizardFormContext.Provider>
    </FormProvider>
  );
};
