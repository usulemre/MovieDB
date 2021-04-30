import React from 'react'
import './SingleContent.css';
import { img_300,unavailable } from '../../component/config/config';
import { Badge } from '@material-ui/core';

export default function SingleContent({
    id,
    poster,
    title,
    date,
    meadia_type,
    vote_average}) {
    return (
        <div className='media'>
            <Badge badgeContent={vote_average} color={vote_average>7 ? "primary":"secondary"}/>
            <img 
            className='poster' 
            src={poster ? `${img_300}/${poster}`: unavailable} 
            alt={title}/>
            <b className='title'>{title}</b>
            <span className='sunTitle'>
              {meadia_type === 'tv' ? 'TV Series':"Moveies"}
              <span className='sunTitle'>{date}</span>
            </span>
        </div>
    )
}
