import React from 'react'

interface CardProps {
    title: string,
    bodyText: string,
    imageFilePath: string,
    button: React.ReactNode
}

const ImageCard: React.FC<CardProps> = ({title, bodyText, imageFilePath, button}) => (
       <div className="card bg-base-100 w-96 h-100 shadow-xl">
        <figure>
          <img src={imageFilePath}/>
        </figure>
        <div className="card-body">
            <h2 className="card-title">{title}</h2>
            <p>{bodyText}</p>
          <div className="card-actions justify-end">
            {button}
          </div>
        </div>
      </div>
)

export default ImageCard