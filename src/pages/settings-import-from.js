import { Typography } from "@material-ui/core";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ImportFromWXR } from "../componentes/importer/import-from-wxr";
import { ImportFromWStrongapp } from "../componentes/importer/import-from-strongapp";
import { Alert } from "@material-ui/lab";

/**
 * @typedef {Object} Importer
 * @property {string} label The image / icon representative of the importer.
 * @property {JSX.Element} widget The widget in charge of the import
 */
/**
 * @type {Importer[]}
 */
const importers = [
    {
        label:<img src="/logo.png" width={150}/>,
        widget:<ImportFromWXR/>
    },
    {
        label:<a href="https://www.strong.app/" target="_blank" title="Visit competitor's site, grrrrrr..."><img src="/strongapp-logo.jpg" width={150} alt="Strongapp logo"/></a>,
        widget:<ImportFromWStrongapp/>
    }
]

export const ImportFromWidget = ({ user })=>{
    return <div>  
            <Alert severity="info">
                You can DM the admin to code a new parser for some other app you'd like to import data from.
            </Alert>
            <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell width={200}>Import data from...</TableCell>
                    <TableCell >Import</TableCell> 
                </TableRow>
                </TableHead>
                <TableBody> 
                    {
                        importers.map( (importer,i)=>(<TableRow key={i}>
                            <TableCell component="th" scope="row" style={{maxWidth:200}}>
                                { importer.label }
                            </TableCell>
                            <TableCell >
                            { importer.widget }</TableCell> 
                        </TableRow> ) )
                    }
                    
                </TableBody>
            </Table>
            </TableContainer>

    </div>
};