import './Document.css';
import React, {useState} from 'react';
import ReactCardFlip from 'react-card-flip';

/**
 * This component is the document appears in the list of uploaded documents
 * Once the user mouseHover the document in will flip and shows the number for times each offensive word appears
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Document = ({props}) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const {offensiveCountMap, name} = props;

    return (
        <ReactCardFlip className='' isFlipped={isFlipped} flipDirection="horizontal">
        <div onMouseEnter={() => setIsFlipped((prev) => !prev)} className="document">
            <div className='card bg-info mb-3 shadow-sm h-100'>
                {name}
            </div>
        </div>
        <div className='cardBack' onMouseLeave={() => setIsFlipped((prev) => !prev)}>
            <div className='card bg-info mb-3 shadow-sm h-100'>
                {Object.entries(offensiveCountMap).map(([key, value]) => {
                    return <span key={key} className='backCard_offensive'>{key}:{value}</span>
                })}
            </div>
        </div>
        </ReactCardFlip>
    )
}

export default Document;