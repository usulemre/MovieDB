import React, { useEffect, useState } from 'react'
import axios from 'axios';
import SingleContent from '../../SingleContent/SingleContent';
import './Trending.css'
import CostumPignation from '../../CostumPignation/CostumPignation';

export default function Trebding() {

    const [page, setpage] = useState(1)

    const [content, setcontent] = useState([]);

    const [numOfPages, setnumOfPages] = useState();
   
    const fetchData = async () => {
        const {data} = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
        
        );
        setcontent(data.results);
        setnumOfPages(data.total_pages);
    };

    useEffect(() =>{
       fetchData();
       // eslint-disable-next-line
    },[page]);
       
    return (
        <div>
            <div className='pageTitle'>Trending</div>
                <div className='trending'>
                    {content && content.map((c)=>(
                            <SingleContent 
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            meadia_type={c.media_type}
                            vote_average={c.vote_average}
                            />))}
                </div>
                <CostumPignation setpage={setpage} numOfPages={numOfPages}/>
        </div>
    );
};
