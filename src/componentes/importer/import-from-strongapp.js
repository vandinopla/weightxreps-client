import { ImportFromWXR } from "./import-from-wxr" 

const NEWLINE = /\\n/g;

/** 
 * @param {File} file 
 * @param {(status:string)=>void} informStatus 
 * @returns {Promise<string>}informStatusinformStatus
 */
const formatStrongToWeightxreps = async (file, informStatus) => {


    informStatus("Are the weights are in kilograms?");

    var usekg = true;

    if( !window.confirm("WEIGHT UNIT\n\nThe weights in the file are in (kg)Kilograms? (If you cancel then (lbs)Pounds will be assumed)\n\nAccept = KG\nCancel = LB"))
    {
        usekg = false;
    }

    informStatus("Prepearing to parse cvs");

    const Papa = await import(/* webpackChunkName: "papaparse" */"papaparse");
     
    return new Promise(( resolve, reject )=>{


        informStatus("Parsing starts...");

        let day;
        let ename;
        let log = "";
        let rowsDone = 0;
        let abortedError;
        let ignoreErrors;
        let userWasPrompted = false;

        Papa.parse(file, {
            delimiter:",", 
            header:true,
            encoding:"utf-8",
            skipEmptyLines:"greedy",

            chunk: function(results, parser ) 
            { 
                for (let i = 0; i < results.data.length; i++) 
                {
                    const data = results.data[i]; 
                    let dayChanged = false;  

                    try
                    {

                    //
                    // DAY
                    //
                    if(!day || day!=data.Date )
                    {
                        day = data.Date;

                        log += data.Date.split(" ")[0]+"\n"; // YYYY-MM-DD 

                        log += data['Workout Name']+"\n";
                        dayChanged = true;

                        if( data.Duration.length )
                        {
                            log += `@Workout Duration: ${data.Duration}\n`;
                        }

                        //
                        // LOG
                        //
                        if( data['Workout Notes']?.length )
                        {
                            log += data['Workout Notes'] +"\n";

                            console.log("--------")
                            console.log( data['Workout Notes'].replace(NEWLINE,"\n") )
                            console.log( "asasa\nasdasd" )
                            console.log("--------")
                        }
                    }

                    //
                    // ENAME
                    //
                    if( !ename || ename!=data['Exercise Name'] || dayChanged )
                    {
                        ename = data['Exercise Name'];
                        log += `#${data['Exercise Name']}\n`;
                    }

                    //
                    // EROW
                    //
                    let W = parseFloat(data["Weight"]) || 1;
                    let R = parseFloat(data["Reps"]) || 1; 
                    let RPE = parseFloat(data["RPE"]) || ""; 

                    log += `${W}${usekg?"kg":"lbs"} x ${R} ${RPE}\n`;

                    }
                    catch(e)
                    {
                        if( !userWasPrompted )
                        {
                            userWasPrompted = true;
                            
                            if( window.confirm("WHAT TO DO?\n\nThere was an error parsing some portion(s) of the file. Do you wan't to ignore it and continue tyring to import the file?\n\nAccept = IGNORE ERRORS/ CONTINUE\nCancel = ABORT") )
                            {
                                ignoreErrors = true;
                            }
                        }

                        if( ignoreErrors )
                        {
                            //nothing...
                        }
                        else 
                        {
                            abortedError = e;
                            parser.abort();
                            return;
                        } 
                    }

                };  

                rowsDone+=results.data.length;
                informStatus(`Parsed ${rowsDone} rows...`);
            },
            
            complete: ()=>{

                if( abortedError )
                {
                    reject(`The file you attempt to import has errors, can't proceed :(`);
                    return;
                }

                informStatus("Parsing complete...");
                resolve( log ); 
            },
            error: err => reject(`Error parsing cvs --> ${err.message}`)
        });

    });
}

export const ImportFromWStrongapp = ()=>{ 

    return <ImportFromWXR formatFile={ formatStrongToWeightxreps } fileInputLabel="Select strongapp backup file .cvs" fileInputFileExtensions=".csv"/>
}