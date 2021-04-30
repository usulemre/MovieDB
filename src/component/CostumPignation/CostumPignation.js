import React from 'react'
import  Pagination  from '@material-ui/lab/Pagination';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

export default function CostumPignation({setpage,numOfPages}) {

    const darkTheme = createMuiTheme({
        palette:{
            type:'dark',
        },
    });

    const pignationHandler = (page) =>{
        setpage(page)
        window.scroll(0,0);
    }

    return (
        <div style={{
            width:'100%',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            padding:'10px 0px',
            margin:'20px 0 20px'
        }}>
            <ThemeProvider theme={darkTheme}>
            <Pagination
            color="primary"
            count={numOfPages} 
            onChange={(e) => {pignationHandler(e.target.textContent)}}
            hideNextButton
            hidePrevButton/>
            </ThemeProvider>
        </div>
    )
}
