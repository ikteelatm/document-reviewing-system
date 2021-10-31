import React, {useState, useEffect} from 'react';
import {CONSTANTS } from '../../Constants';
import {loadDocuments} from '../Utilities/Utils';
import Document from '../Document/Document';
import './Files.css';
import Menu from '../Menu/Menu';

const Files = () => {
    const [term, setTerm] = useState("");
    const [documents, setDocuments] = useState([]);
    const [displayedDocuments, setDisplayedDocuments] = useState([]);

    /**
     * When page loads, call /load-documents API and bring the files
     */
    useEffect(() => {
        loadDocuments().then(documents => {
            setDocuments(documents);
            setDisplayedDocuments(documents);
        })
    }, []);

    /**
     * This Hook is to prevent from searching every time the use type a char
     * When the user pause typing, after 500ms, I will search for requested file
     */
    useEffect(() => {
        const timeOutId = setTimeout(() => term && handleSearch(term), CONSTANTS.SEARCH_DELAY_BEFORE_REST_CALL);
        return () => clearTimeout(timeOutId);
    }, [term]);

    const handleSearch = async (term) => {
        const tmpDocuments = documents.filter(document => document.name.toLowerCase().includes(term))
        setDisplayedDocuments(tmpDocuments);
    }

    /**
     * Return the searchBar JSx, onChange, I'm updating the the query through setState
     * @returns {JSX.Element}
     */
    const searchJsx = () => {
        return (
            <div className='searchBar'>
                <input name='search_term' type='text' value={term} placeholder='Search...'
                       className='form-control mr-sm-0' onChange={event => setTerm(event.target.value)}>
                </input>
            </div>
        );
    }

    /**
     * All documents Jsx
     * @returns {JSX.Element}
     */
    const filesJsx = () => {
        return (
            <div className='row documents'>
                {displayedDocuments.length > 0 && displayedDocuments.map((document, index) => {
                    return <Document key={index} props={document}/>
                })}
            </div>
        );
    }


    return (
        <div className='container files'>
            <Menu/>
            {searchJsx()}
            {filesJsx()}
        </div>
    )
}

export default Files;