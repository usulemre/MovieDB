import React, { useEffect, useState } from 'react'
import axios from 'axios';
import SingleContent from '../../SingleContent/SingleContent';
import CostumPignation from '../../CostumPignation/CostumPignation';
import Genres from '../../Gender';
import useGenre from '../../../Hooks/useGenre';

export default function Series() {

    const [page, setpage] = useState(1);
    const [content, setcontent] = useState([]);
    const [numOfPages, setnumOfPages] = useState();
    const [selectedGenres, setselectedGenres] = useState([]);
    const [genres, setgenres] = useState([]);
    const genreforURL = useGenre(selectedGenres);

     const fetchMovies = async () =>{
         const {data} = await axios(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
         );
         console.log(data.total_pages);
         setcontent(data.results);
         setnumOfPages(data.total_pages);
     }

     useEffect(() =>{
       fetchMovies();
     },[page,genreforURL])

    return (
        <div>
            <div className='pageTitle'>Series</div>
            <Genres 
            type='tv'
            selectedGenres={selectedGenres}
            setselectedGenres={setselectedGenres}
            genres={genres}
            setgenres={setgenres}
            setpage={setpage}/>
            <div className='trending'>
                    {content && content.map((c)=>(
                            <SingleContent 
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            meadia_type="tv"
                            vote_average={c.vote_average}
                            />))}
                </div>
                {numOfPages>1 && (
                        <CostumPignation setpage={setpage} numOfPages={numOfPages}/>
                )}
        </div>
    )
}
