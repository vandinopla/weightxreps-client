import { useCurrentSession, useReactiveSetting } from '../session/session-handler';


export const kg2lb = kg => round( kg*2.204623 ,1);

/**
 * The complete Triforce, or one or more components of the Triforce.
 * @typedef {Object} WeightValueParams
 * @property {Number} value El valor en Kilograms
 * @property {Number} inkg 1:en KG  0:en LBs 
 * @property {boolean} nounit if TRUE no muestra weight unoit
 * @property {boolean} round -if true, mete round.
 * @property {string} prefix -if true, mete prefix.
 */

/** 
 * @param { ...WeightValueParams } props 
 */
export default function WeightValue( props )
{  
    //let {session, userSettings} = useGetSession(); 
    const session                 = useCurrentSession();
    const changeValue             = useReactiveSetting( session?.userSettings?.convertDisplayUnits );   
    const sessionUseKg            = session?.user?.usekg;
    //
    // unit original en que se escribio este valor....
    //
    let originalUnit            = props.inkg? "kg":"lbs";
    const KG2LBS                = 2.204623;

    //
    // en la DB se guarda todo en KILOS.
    //
    let w       = props.value;
    let unit    = "kg";


    //
    // hay que convertir?  if...
    // 1) changeValue deriba en un LBS :  A) changeValue==1 && user.usekg==0   B) changeValue==2 && user.usekg==1
    //
    if( (changeValue==1 && sessionUseKg==0) //<--- a "su unit" y su unit es LBS 
        || (changeValue==2 && sessionUseKg==1) //<--- al unit "opuesto" y su unis es KG
        || ( changeValue==0 && props.inkg==0 ) //<--- el peso de este weight is LBS
         )
         {
            w *= 2.204623;
            unit = "lbs";
         } 


    // if( (!changeValue && props.inkg==0) || (changeValue && session.user.usekg==0 ) ) {
    //     w *= 2.204623;
    //     unit = "lbs";
    // } 

    if( props.round || (unit != originalUnit) )
    {
        w = Math.round(w);
    }

    //kg = #09c
    //lbs = #cc6800 

    return <>{props.prefix||""}{round(w,1)} <b style={{color: unit=='kg'? '#09c':'#cc6800', fontSize:"0.9em", display:props.nounit?"none":"inline" }}>{unit+(unit != originalUnit?"*":"")}</b></>; 
}


function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}