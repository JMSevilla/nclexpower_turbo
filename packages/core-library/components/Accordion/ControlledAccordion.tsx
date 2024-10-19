import * as React from 'react';
import { styled } from '@mui/material/styles';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid black`,
  background: '#d0d6e4',
  borderRadius: '4px',
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    {...props}
  />
))(({ theme }) => ({
  padding: '10px',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row',
  '& .MuiAccordionSummary-expandIconWrapper': {
    transition: 'none',
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'none',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#ffffff',
}));

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface ReusableAccordionProps<T extends FieldValues> {
  items: AccordionItem[];
  control: Control<T>;
  name: Path<T>;
  titleColor?: string;
  titleFontWeight?: string;
  titleFontSize?: string;
}

export const ControlledAccordion = <T extends FieldValues>({
  items,
  control,
  name,
  titleColor = '#000',
  titleFontWeight = 'normal',
  titleFontSize = '1rem',
}: ReusableAccordionProps<T>) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
        >
          <AccordionSummary
            aria-controls={`panel${index}d-content`}
            id={`panel${index}d-header`}
            expandIcon={
              expanded === `panel${index}`
                ? <IndeterminateCheckBoxIcon sx={{ fontSize: '2rem', color: '#0F2A71' }} />
                : <AddBoxIcon sx={{ fontSize: '2rem', color: '#0F2A71' }} />
            }
          >
            <Typography
              sx={{
                color: titleColor,
                fontWeight: titleFontWeight,
                fontSize: titleFontSize,
              }}
            >
              {item.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Controller
              name={name}
              control={control}
              render={({ field }) => <Typography>{item.content}</Typography>}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};
