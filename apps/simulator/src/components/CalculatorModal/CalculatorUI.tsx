import React from 'react';
import { Box, Button, Grid, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useCalculator } from '@repo/core-library/hooks/useCalculator'
import { EvaIcon } from '@repo/core-library/components';

export const CalculatorModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const { input, handleClick, handleClear, handleBack, setInput } = useCalculator();
  const keypadValues = [
    "7", "8", "9",
    "4", "5", "6",
    "1", "2", "3",
    "0", "."
  ];
  const operatorValues = [
    "+", "-", "/", "*", "="
  ];

  const buttonStyle = {
    width: '100%',
    backgroundColor: '#f3f3f3',
    fontSize: '1.35rem',
    boxShadow: '0px 3px 3px rgba(0, 0, 0, 0.3)',
    height: 60
  };

  const operatorStyle = {
    backgroundColor: '#007AB7',
    color: '#f3f3f3',
    fontSize: '1.35rem',
    marginBottom: 0.5,
    height: 69
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <Box sx={{ backgroundColor: '#007AB7', border: '4px', padding: 2 }}>
        <div className="flex items-center justify-between">
          <DialogTitle className="text-white">Calculator</DialogTitle>
          <DialogActions>
            <Button onClick={onClose}>
              <EvaIcon name="close-circle-outline" fill="#f3f3f3" width={30} height={30} />
            </Button>
          </DialogActions>
        </div>
        <DialogContent>
          <Box p={2} className="bg-slate-100 rounded-md">
            <TextField
              fullWidth
              margin="normal"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              sx={{
                backgroundColor: '#86BCEA',
                "& .MuiInputBase-input": {
                  padding: 3,
                  fontSize: 30,
                  borderRadius: 5,
                  textAlign: 'end',
                }
              }}
            />
            <Box className="flex items-center justify-between">
              <Grid container spacing={2}>
                <Grid item xs={10} container spacing={2}>
                  <Grid item xs={6}>
                    <Button fullWidth onClick={handleClear} sx={buttonStyle}>
                      C
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button fullWidth onClick={handleBack} sx={buttonStyle}>
                      <EvaIcon name="backspace-outline" fill="#007bff" width={24} height={24} />
                    </Button>
                  </Grid>
                  {keypadValues.map((value) => (
                    <Grid item xs={4} key={value}>
                      <Button
                        fullWidth
                        sx={buttonStyle}
                        onClick={() => handleClick(value)}
                      >
                        {value}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
                <Grid item xs={2}>
                  {operatorValues.map((operator) => (
                    <Button
                      fullWidth
                      sx={operatorStyle}
                      onClick={() => handleClick(operator)}
                      variant="contained"
                      key={operator}
                    >
                      {operator}
                    </Button>
                  ))}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

