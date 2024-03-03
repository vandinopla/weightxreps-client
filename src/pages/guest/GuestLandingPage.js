import { Box, Button, Container, Dialog, Grid, makeStyles, Typography, useTheme } from "@material-ui/core";  
//import Typewriter from 'typewriter-effect';  

// 
import SinceBadgeSrc from "../../banners/since-badge.png"; 
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import { FeaturesDisplay } from "./features-display";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles( theme=>({

    root: { 
        //background: theme.palette.type=="dark"?"none": "linear-gradient(180deg, #fafafa 1%, rgba(0,0,0,0.03) 45%, #fafafa 86%)"
         
        paddingTop: 50,
        "& .MuiTypography-root": {
            //color:"#333 !important",
            "& strong": {
                //color: theme.palette.getContrastText()
            }
        }
    },
 

    typewritterBanner: {
        display:"inline",
        textShadow: "2px 2px 2px #A5A5A5",
 
    },

    subtitle: {
        margin:"30px 0",
        //color:"#7d7c83",
         
    },

    SecondSection: { 
        //background:"radial-gradient(circle, rgba(255,255,255,1) 1%, rgba(234,239,244,1) 50%, rgba(255,255,255,1) 100%)",
        //paddingTop:theme.spacing(5),
        paddingBottom:theme.spacing(5), 
    }

}));// //theme.palette.type=="dark"? "#444" : "#444",


export const SectionTitle = ({ line1, line2, color }) => {

    const theme = useTheme();

    return      <><div className="line" style={{ width:80, borderTop:"3px solid "+theme.palette.text.disabled, marginBottom:5 }}></div>
                 <Typography ><strong>{line1}</strong></Typography> 
                <Typography variant="h2" gutterBottom>  <strong>{line2}</strong></Typography>
                </>;
}


export const GuestLandingPage = ()=>{
 
    const classes = useStyles();
    const theme = useTheme(); 

    return <Box className={ classes.root }> 


        <div className={ classes.SecondSection } > 

            <Container >
            <Grid container spacing={5}>
                <Grid item md={6}>

                <a href="https://web.archive.org/web/20110901000000*/https://weightxreps.net" target="_blank" style={{float:"right"}}>
                <img src={SinceBadgeSrc} alt="Since 2011 Badge"  />
                    </a>

                <SectionTitle line1="WELCOME TO" line2="WEIGHT X REPS" color={theme.PINK_COLOR}/>
 
 
                            <Typography variant="h6" className={classes.subtitle} >
                            Read as <strong>Weight for Reps</strong>, is an <a href="https://github.com/bandinopla/weightxreps-client" target="_blank"><strong>Open Source</strong></a>  online training journal system that will allow you to keep your training data organized and tracked.
Several charts and graphs will aid you in better undertsanding your training.
 
                            </Typography> 
 

                            <div style={{ marginTop: theme.spacing(3)}}>
                
                <a  href='https://play.google.com/store/apps/details?id=net.weightxreps.app&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
                    <img  width="200" alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/>
                </a>
            </div>

                </Grid>
                <Grid item md={6}> 
 

                            <SectionTitle line1="LOG A WORKOUT? EWWW..." line2="¿What's the point?" color={theme.GREEN_COLOR}/>


                            <Typography variant="h6" className={classes.subtitle} >
                                It is very easy too see days, weeks and even months just pass you by without paying right of passage in the form of personal fitness improvements! ;)
                                
                                Work, family &amp; life in general will offer you several pathways to gradually steer away from holding onto a somewhat decent fitness level. 
                                
                            </Typography> 
                            <Button size="large" onClick={()=>window.scrollTo(0,0)} color="primary" variant="outlined" endIcon={<ArrowUpwardIcon/>}>TAKE ACTION</Button>
                     
                    </Grid>
                </Grid> 
            </Container>
        </div>

<Box marginTop={10}>
    <img src="/banner-a.jpg" className="banner-fullrow sha"/>
    <Box paddingTop={2}>
    <Alert severity="info">
        [*] Fitness awareness means you live your day to day life knowing were you at strength wise. Health isn't free, it is paid with an everyday constant effort.
    </Alert>
    </Box>
</Box>
 
        <SectionSeparator>Features</SectionSeparator> 


        <Box textAlign="center" >
            <FeaturesDisplay/>
        </Box>

        <SectionSeparator>Are you ready?</SectionSeparator> 

        <Box marginBottom={6}>      
            <div>
                <Box textAlign={"center"} marginBottom={4}>
                    <Button onClick={()=>window.scrollTo(0,0)} variant="outlined" endIcon={<ArrowUpwardIcon />} size="large">
                        Let's go!
                    </Button>
                </Box>
                
                <img src="/banner-starttoday2.jpg" className="banner-fullrow  sha"/>
            </div>
        </Box>  

    </Box>
}



const SectionSeparator = ({ children })=>{
    return <Box marginTop={8} marginBottom={2}><Typography variant="h3" display="block"><div className="app-section-separator">{children}</div></Typography> </Box>;
}

 


// const TypeWritterText = ()=>{
//     const classes = useStyles();
//     return <div className={ classes.typewritterBanner}><Typewriter 
//                     options={{
//                         strings: [ "Track your <strong>progress</strong>", 
//                                     'Evaluate your <strong>overall volume</strong>',
//                                     "Log your <strong>workouts</strong>"],
//                         autoStart: true,
//                         loop: true,
//                     }}
//             /></div>;
// }

 