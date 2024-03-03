import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { JOwnerContext } from "../../pages/journal-context";
import { JDayContext } from "./jday-context";
import Rating from '@material-ui/lab/Rating';
import { useGetSbdStatsLazyQuery } from "../../data/generated---db-types-and-hooks";
import { AsciiSpinner } from "../ascii-spinner";
import Tooltip from '@material-ui/core/Tooltip';
import { Alert } from "@material-ui/lab";
import LanguageIcon from '@material-ui/icons/Language';
import { Button } from "@material-ui/core";
import { OpenConfirmModal } from "../Dialog";
import { MENU } from "../main-menu";

const TYPES = ["SQ","BP","DL"];
const SBDRankContext = createContext({
    isBeingUsed:()=>{}
})

export const SetSBDRank = ({ weight, isf, bw, type })=>{

    const jowner    = useContext(JOwnerContext);
    const jday      = useContext(JDayContext);
    const typeIndex = TYPES.indexOf(type);
    const enabled   = typeIndex>-1;
    const sbdContext = useContext(SBDRankContext);

    const [loadSbdStats, { data, loading, error }]  = useGetSbdStatsLazyQuery();

    if(!bw) bw = jday?.bw;
    if(!isf) isf = jowner?.isf;

    useEffect(()=>{

        if( enabled )
        {
            loadSbdStats();
        }

    }, [enabled]);


    if( !enabled ) return "";

    if( loading ) return <AsciiSpinner label={""} styles={{ display:"inline-block"}}/>;

    if( data?.sbdStats )
    {
        // same gender and weight class
        let total           = 0;
        const wclasses      = data?.sbdStats.perclass.filter( row=> (1-Number(row.wclass.male) == isf) && (!bw || ( bw>row.wclass.min && bw<=row.wclass.max ))  ); 
        const betterThan    = wclasses.reduce( (t,row)=>t+row.graph.reduce((l,sbd,i)=> {
            const isBetter = weight>i*5;
            const lifts    = sbd[typeIndex];

            total += lifts;

            return l + (isBetter ? lifts : 0)
        
        },0),0 );
        const percent = betterThan/total;

        if( percent<0.05 ) {
            return "";
        }

        sbdContext && sbdContext.isBeingUsed();

        return <Rating name="half-rating-read" defaultValue={ percent * 5 } precision={0.5} readOnly onClick={()=>alert(1)}/> 
    }

    return "";
    //return `${weight} @ ${bw} ${isf?"F":"M"}`;
    //return <Rating name="size-small" defaultValue={2} size="small" style={{  marginLeft:5, marginTop:3}}/>
}

export const SBDRankLeyend = ({ children })=>{
    const [show, setShow] = useState(false);
    const menuItem = useMemo(()=>MENU.find(itm=>itm.goto=="/sbd-stats"),[]);

    const explainToUser = ()=>OpenConfirmModal({ open:true
        , title:menuItem.label
        , info: <div>Squat, Bench and Deadlift exercises (or tagged with #sq, #bp or #dl) are compared against the <a href="https://www.openpowerlifting.org/" target="_blank">openpowerlifting.org</a> database to see how well the estimated 1RM generated by your set compares against the 1RM of powerlifting athletes in competition (obviously not a fair comparition but it serves as a gauge).
                    <br/><br/>
                    We filter, if available, only lifts in your same weight class and same gender. If you don't type your bodyweight in the log, then it will be compared against all weight classes of your same gender.
                </div>
        , verb: "Ok, got it" 
        , canCancel: false
    }); 

    


    return <SBDRankContext.Provider value={{ isBeingUsed:()=>!show && setShow(true) }}>
                { children }
                { show && <Alert severity="info" icon={<menuItem.Icon/>} action={
                                <Button color="inherit" size="small" variant="outlined" onClick={explainToUser}>
                                    What is this?
                                </Button>
                            }><a href={menuItem.goto}><strong>{menuItem.label}</strong></a> is being used.</Alert>}
           </SBDRankContext.Provider>

}