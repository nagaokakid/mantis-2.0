import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

interface CardProps {
    title: string,
    bodyText: string,
    linkText: string,
    linkDest: string
    createButton?: React.ReactNode,
    width: number,
    height: number
}

const SimpleCard: React.FC<CardProps> = ({title, bodyText, linkText, linkDest, createButton, width, height}) => (
       <div className={`card bg-base-100 w-${width} h-${height} shadow-xl`}>
        <div className="card-body">
            <div className="flex-row">
                <h2 className="card-title">{title}</h2>
                {createButton && <FontAwesomeIcon icon={faPlus} className="justify-end"/>}
            </div>
            <p>{bodyText}</p>
            <div className="card-actions justify-end">
              
            </div>
        </div>
      </div>
)

export default SimpleCard