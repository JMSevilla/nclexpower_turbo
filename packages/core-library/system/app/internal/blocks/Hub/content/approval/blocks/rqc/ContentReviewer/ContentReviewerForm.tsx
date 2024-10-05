import { Box, Typography, Chip } from '@mui/material';
import { Button, ControlledCheckbox, TextField, Card } from '../../../../../../../../../../components';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { crbSchema, crbType } from './validation';
import { author, mainContent, RadioData } from "./ContentReviewerData";
import { CustomPopover } from '../../../../../../../../../../components/Popover/Popover';

type Props = {}

export default function ContentReviewerForm({ }: Props) {
  const form = useForm<crbType>({
    mode: "all",
    resolver: yupResolver(crbSchema),
  });

  const { control, handleSubmit, reset, setValue, watch, clearErrors } = form;

  const selectedOption = watch('option');

  const onSubmit = (values: crbType) => {
    console.log("Selected Option:", values);
    reset();
  };

  return (
    <FormProvider {...form}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
        <Box>
          <Typography sx={{ fontSize: '2rem', fontWeight: 'bold', color: '#560bad' }}>
            Content Details:
          </Typography>
          {author.map((item, index) => (
            <Box key={index}>
              <Typography sx={{ fontSize: '1rem', color: '#606060' }}>Author Details: </Typography>
              <Typography sx={{ fontSize: '1rem', color: '#606060' }}>{item.author}</Typography>
              <Typography sx={{ fontSize: '1rem', color: '#606060' }}>{item.createdDate}</Typography>
            </Box>
          ))}
        </Box>
        <Chip sx={{ backgroundColor: 'transparent', color: '#560bad', border: "1px solid #560bad" }} label="Pending" />
      </Box>
      <Box sx={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: "end" }}>
        <CustomPopover
          icon={<ArrowDropDownIcon />}
          open={true}
          label='Review Changes'
          sx={{
            px: 4,
            py: 2,
            backgroundColor: "#343a40",
            borderRadius: "10px",
            color: '#F3F3F3',
            '&:hover': {
              backgroundColor: '#212529',
            },
          }}>
          <Card sx={{ width: "100%", padding: 6, border: "1px solid #80ed99" }}>
            <Typography sx={{ fontSize: '1.4rem', color: "#560bad" }}>
              Write your review
            </Typography>
            <hr className='my-4' />
            <div className="flex flex-col">
              <TextField
                control={control}
                multiline
                rows={4}
                name="comment"
                placeholder="Leave a comment..."
                sx={{ width: 500 }}
                onBlur={() => clearErrors()}
              />
              {RadioData.map((item, index) => (
                <ControlledCheckbox
                  key={index}
                  name="option"
                  control={control}
                  label={item.title}
                  value={item.value}
                  checked={selectedOption === item.value}
                  onChange={() => setValue('option', item.value)}
                />
              ))}
            </div>
            <Button
              onClick={handleSubmit(onSubmit)}
              sx={{
                py: 1.5,
                width: "100%",
                backgroundColor: "#80ed99",
                borderRadius: "10px",
                color: '#030303',
                '&:hover': {
                  backgroundColor: '#386641',
                  color: '#F3F3F3'
                },
              }}>
              Submit Review
            </Button>
          </Card>
        </CustomPopover>
      </Box>
      {mainContent.map((item, index) => (
        <Box key={index} sx={{ marginBottom: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: "flex-col", alignItems: 'center', marginBottom: 4, gap: 2 }}>
            <Chip sx={{ backgroundColor: '#560bad', color: '#F3F3F3' }} label={item.type} />
            <Chip sx={{ backgroundColor: 'transparent', color: '#560bad', border: "1px solid #560bad" }} label={item.mainType} />
          </Box>
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: 4, color: "#560bad" }}>
            {item.question}
          </Typography>
          <div className="flex flex-col">
            <Typography sx={{ fontSize: '1rem', color: "#606060" }}>
              Cognitive Level: {item.cognitiveLevel}
            </Typography>
            <Typography sx={{ fontSize: '1rem', color: "#606060" }}>
              Content Area: {item.contentArea}
            </Typography>
            <Typography sx={{ fontSize: '1rem', color: "#606060" }}>
              Client Needs: {item.clientNeeds}
            </Typography>
            <Typography sx={{ fontSize: '1.2rem', fontWeight: "bold", color: "#560bad", marginTop: 4 }}>
              Answer Options :
            </Typography>
            {item.mainContentAnswerCollections.map((answerItem, idx) => (
              <ol key={idx} className='mb-4'>
                <li>{answerItem.answer}</li>
              </ol>
            ))}
            <Box sx={{ backgroundColor: "#560bad", padding: 4, color: "#F3F3F3" }}>
              Correct Answer: {item.answerKey}
            </Box>
            <hr className='my-4' />
          </div>
        </Box>
      ))}
    </FormProvider>
  )
}