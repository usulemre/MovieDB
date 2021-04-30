import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { Button, createMuiTheme, ThemeProvider } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import axios from 'axios';
import SingleContent from '../../SingleContent/SingleContent';
import CostumPignation from '../../CostumPignation/CostumPignation';

export default function Search() {
    
    const [type, settype] = useState(0);
    const [page, setpage] = useState(1);
    const [content, setcontent] = useState();
    const [searchText, setsearchText] = useState("");
    const [numOfPages, setnumOfPages] = useState()


    const darkTheme = createMuiTheme(({
        palette: {
          type:'dark',
          primary:{
            main:'#fff',
          },
        },
      }));

      const fetchSearch = async () =>{
         const { data } = await axios(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
        );
        setcontent(data.results);
        setnumOfPages(data.total_pages);
      };

      useEffect(()=>{
        window.scroll(0,0);
          fetchSearch();
      },[page,type])

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <div style={{display:'flex'}}>
                    <TextField 
                    style={{flex:1}}
                    className='searchBox'
                    label='Search'
                    variant='filled'
                    onChange={(e) => setsearchText(e.target.value)}
                    />
                    <Button 
                    variant='contained' 
                    style={{marginLeft:10}}
                    onClick={fetchSearch}>
                        <SearchIcon />
                    </Button>
                </div>
                <Tabs 
                textColor='primary' 
                indicatorColor='primary'
                value={type}
                onChange={(event,newValue) =>{
                  settype(newValue);
                  setpage(1);
                }}>
                   <Tab style={{width:'50%'}} label='Search TV'/>
                   <Tab style={{width:'50%'}} label='Search TV Series'/>
                </Tabs>
            </ThemeProvider>
            <div className='trending'>
                    {content && content.map((c)=>(
                            <SingleContent 
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            meadia_type={type ? 'TV' : 'movie'}
                            vote_average={c.vote_average}
                            />))}
                            {searchText &&
                            !content &&
                            (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
                </div>
                {numOfPages>1 && (
                        <CostumPignation setpage={setpage} numOfPages={numOfPages}/>
                )}
        </div>
    )
}
