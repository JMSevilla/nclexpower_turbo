import { Box, Grid, Typography, } from "@mui/material";
import { ContactHeroBG } from "../../../components/icons/ContactHeroBG";
import { SocialMediaMock } from "../../../core/constant/ContactPageMock/SocialMediaMock";

export const ContactHero: React.FC = () => {
  return (
    <Grid
      container
      sx={{
        background: 'linear-gradient(to right, #007AB7, #3b82f6)',
        height: '100vh',
        padding: 10
      }}
    >
      <Grid
        item
        xs={12}
        lg={5}
        xl={6}
        sx={{ order: { lg: 2 }, padding: 2, borderRadius: 12 }}
      >
        <ContactHeroBG />
      </Grid>
      <Grid
        item
        xs={12}
        lg={7}
        xl={6}
        sx={{ p: { xs: 2, sm: 4, lg: 6, xl: 12 } }}
      >
        <Box sx={{ maxWidth: { xs: "xl", lg: "3xl" } }}>
          <Grid item lg={12} >
            <Typography variant="h2" sx={{ color: 'white', fontWeight: 700, marginBottom: 1.5, fontFamily: 'Poppins' }}>
              Contact Us
            </Typography>
            <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita repellat beatae laudantium corrupti voluptatibus quae nihil, nisi eius officiis porro! Quam facere, voluptatem perferendis fugit perspiciatis neque provident rem sit.</p>
          </Grid>
          <div className="mt-6 flex items-center justify-start text-white text-xl">
            <span className="text-2 xl">Visit us at |  </span>
            <div className="flex">
              {SocialMediaMock.map((item) => (
                <item.icon className="mx-2 border p-1.5 rounded-lg hover:bg-sky-400 hover:text-black cursor-pointer" fontSize="large" />
              ))}
            </div>
          </div>
        </Box>
      </Grid >
    </Grid >
  );
};
