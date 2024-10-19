/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box, Grid } from '@mui/material';
import { Button, NumberField, SelectSearch } from 'core-library/components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { pricingSchema, PricingFormType } from './validation';
import { useFormFocusOnError } from 'core-library/hooks';
import { useBusinessQueryContext } from 'core-library/contexts';

type Props = {
  onSubmit: (values: PricingFormType) => void;
  submitLoading?: boolean;
};

export const PricingForm: React.FC<Props> = ({ onSubmit, submitLoading }) => {
  const { businessQueryGetAllCurrencies } = useBusinessQueryContext();
  const { data } = businessQueryGetAllCurrencies(['getAllCurrencies']);
  const form = useForm<PricingFormType>({
    mode: 'all',
    resolver: yupResolver(pricingSchema),
    defaultValues: pricingSchema.getDefault(),
  });
  const { control, handleSubmit, clearErrors, setFocus, formState } = form;
  useFormFocusOnError<PricingFormType>(formState.errors, setFocus);

  return (
    <Grid container direction='column' rowSpacing={4} gap={2}>
      <Grid item md={6} lg={4}>
        <NumberField<PricingFormType>
          name='pricing'
          control={control}
          label='Pricing'
          decimalScale={2}
          onBlur={() => clearErrors()}
        />
      </Grid>
      <Grid item md={6} lg={4}>
        <SelectSearch
          control={control}
          name='currency'
          options={data ?? []}
          label='Select currency'
        />
      </Grid>
      <Box marginTop={5}>
        <Button
          sx={{ width: '100%' }}
          onClick={handleSubmit(onSubmit)}
          variant='contained'
        >
          Create
        </Button>
      </Box>
    </Grid>
  );
};
