import { Grid, Box, Typography } from '@mui/material';
import { CmsTenant } from '../../../types/tenant'
import Image from 'next/image';
import logoImage from "../../Header/asset/CoreZigma.png"

type Props = {
    tenant: CmsTenant | null;
}

export const Footer = ({ tenant }: Props) => {
    // const linkGroups = tenant?.footer?.value?.elements?.linkGroups

    //Temporary Link Groups
    const linkGroups = [{}, {}, {}, {}]

    const footerLogo = tenant?.footerLogo?.url //Unused as of now

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} sx={{ backgroundColor: "#444444", color: '#fff' }}>
                <Grid item md={3} xs={6} sx={{ alignItems: 'center', justifyContent: 'start', display: 'flex' }}>
                    <Image
                        data-testid="header_logo_image"
                        src={logoImage}
                        alt={logoImage}
                        style={{
                            objectFit: "contain",
                            objectPosition: "center",
                            width: "100px",
                            height: "100%",
                            padding: 20
                        }}
                    />
                </Grid>
                <Grid item md={9} xs={6} sx={{ alignItems: 'start', display: 'flex', textAlign: 'start' }}>
                    {linkGroups.length > 0 && linkGroups.map((colData, colIndex) => (
                        <Grid key={colIndex} item md={3} xs={3} sx={{ paddingY: 3 }}>
                            <Typography>
                                {/* Link List */}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>

            </Grid>
        </Box>
    )
}
