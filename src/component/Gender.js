import axios from 'axios'
import React, { useEffect } from 'react'
import Chip from '@material-ui/core/Chip';

export default function Gender({
    selectedGenres,
    setselectedGenres,
    genres,
    setgenres,
    setpage,
    type
}) {
    
    const Addhandler = (genre) =>{
        setselectedGenres([...selectedGenres,genre]);
        setgenres(genres.filter((g) =>g.id !== genre.id));
        setpage(1);
    }

    const deleteHandler = (genre) =>{
        setselectedGenres(selectedGenres.filter((selected) =>
        selected.id !== genre.id));
        setgenres([...genres,genre]);
        setpage(1);
    }

    const fetchGenres = async () =>{
      const {data} = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      ); 
      setgenres(data.genres); 
    }
    
    useEffect(() =>{
      fetchGenres();

      return () =>{
          setgenres({});
          // eslint-disable-next-line
      };
    },[]);

    return (
        <div style={{padding:'6px 0'}}>
             {selectedGenres && selectedGenres.map((genre) =>(
            <Chip 
            label={genre.name} 
            style={{margin:2}} 
            key={genre.id}
            color='primary'
            size='small'
            clickable
            onDelete={() =>deleteHandler(genre)}/>
            ))
            }
            {genres && genres.map((genre) =>(
            <Chip 
            label={genre.name} 
            style={{margin:2}} 
            key={genre.id}
            size='small'
            clickable
            onClick={()=>(Addhandler(genre))}/>
            ))
            }
        </div>
    )
}
