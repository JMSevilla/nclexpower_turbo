import { Box, Grid, Typography, } from "@mui/material";
import { ContactMapBG } from "../../../components/icons/ContactMapBG";
import { ContactMock } from '../../../core/constant/ContactPageMock/ContactMock'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export const ContactMap: React.FC = () => {
  return (
    <Grid
      container
      sx={{
        background: 'linear-gradient(to right, #007AB7, #3b82f6)',
        height: '100%'
      }}
    >
      <Grid
        item
        xs={12}
        lg={5}
        xl={6}
        sx={{ order: { lg: 2 }, padding: 2, borderRadius: 12 }}
      >
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61889.25949965333!2d121.07112228838166!3d14.190167593167704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd63622ef41bdb%3A0x8e40a98927976acb!2sPalo%20Alto%2C%20Calamba%2C%204027%20Laguna!5e0!3m2!1sen!2sph!4v1720281264058!5m2!1sen!2sph" width="100%" height="100%" loading="lazy"></iframe>
      </Grid>
      <Grid
        item
        xs={12}
        lg={7}
        xl={6}
        sx={{ p: { xs: 2, sm: 4, lg: 6, xl: 12 } }}
      >
        <Box sx={{ maxWidth: { xs: "xl", lg: "3xl" } }}>
          <div className="flex items-center justify-center">
            <ContactMapBG />
          </div>
          <Grid item lg={12} >
            {ContactMock.map((item, key) => (
              <Card key={key} sx={{ backgroundColor: 'transparent', boxShadow: 4, marginY: 3, border: 1, borderColor: '#F3F3F3' }}>
                <CardContent sx={{ padding: 3 }}>
                  <div className="flex items-center justify-start">
                    <item.icon className="mr-2 text-white" />
                    <Typography variant="h5" sx={{ color: '#F3F3F3', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>
                      {item.title}
                    </Typography>
                  </div>
                  <Typography sx={{ color: '#ced4da', fontFamily: 'Arial, sans-serif' }}>
                    {item.subTitle}
                  </Typography>
                </CardContent>
              </Card>
            )
            )}
          </Grid>
        </Box>
      </Grid >
    </Grid >
  );
};
