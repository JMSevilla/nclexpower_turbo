import ContentApproverForm from './ContentApproverForm';
import ContentReviewerForm from './ContentReviewerForm';
import { Button, Card } from '../../../../../../../../../../components';
import FirstPageIcon from '@mui/icons-material/FirstPage';

type Props = {
  nextStep(values: {}): void;
  previousStep(): void;
  values: {};
}

export default function ContentReviewerBlock({ nextStep, previousStep }: Props) {
  const handlePreviousStep = () => {
    previousStep();
  };

  return (
    <Card sx={{ padding: 6, height: '110vh' }}>
      <Button
        onClick={handlePreviousStep}
        sx={{
          marginBottom: 4,
          px: 4,
          py: 2,
          backgroundColor: "#560bad",
          borderRadius: "10px",
          color: '#F3F3F3',
          '&:hover': {
            backgroundColor: '#212529',
          },
        }}
      >
        <FirstPageIcon /> Go Back
      </Button>
      <ContentReviewerForm />
      <ContentApproverForm />
    </Card>
  );
}
