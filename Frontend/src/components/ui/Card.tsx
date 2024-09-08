import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

interface CardProps {
    title: string,
    bodyText: string,
    imgSrc?: string,
    linkText: string,    
    linkRoute: string,
    createButton: boolean,
    createButtonAction?: () => void
}

const Card: React.FC<CardProps> = ({title, bodyText, imgSrc, linkText, linkRoute, createButton, createButtonAction}) => (
       <div className="flex">
       <div className={`card card-compact bg-base-100 w-80 h-fit shadow-lg`}>
        <figure>
            <img src={imgSrc} className="h-full"/>
        </figure>
        <div className="card-body">
            <div className="flex flex-row items-center">
                <h2 className="w-full card-title">{title}</h2>
                {createButton &&
                <button onClick={createButtonAction} className="flex items-center justify-end rounded-full p-2 hover:bg-customGreen hover:text-white">
                    <FontAwesomeIcon icon={faPlus} className=""/>
                </button>
                }
            </div>
            <p>{bodyText}</p>
            <div className="flex card-actions justify-end">
                <Link to={`${linkRoute}`} className="font-semibold hover:underline hover:text-blue-700"> {linkText} </Link>
            </div>
        </div>
      </div>
      </div>
)

export default Card