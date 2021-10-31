import React, {useState, useEffect} from 'react';
import Menu from '../Menu/Menu';
import './Upload.css';
import {uploadDocuments} from '../Utilities/Utils';

const Upload = () => {
    const [offensiveWords, setOffensiveWords] = useState([]); // set the offensive words
    const [selectedFile, setSelectedFile] = useState(''); // set when a file been browsed
    const [doesUploaded, setDoesUploaded] = useState(''); // Track upload success or failure

    /**
     * This Hook used to get and update offensiveWords from localStorage
     */
    useEffect(() => {
        const persistData = localStorage.getItem('offensive_words');
        const persistentOffensive = persistData !== null ? JSON.parse(persistData) : [];
        setOffensiveWords(persistentOffensive);
    }, []);

    /**
     * This Hook is for storing offensiveWords in localStorage so it will be persistent
     */
    useEffect(() => {
        localStorage.setItem('offensive_words', JSON.stringify(offensiveWords));
    }, [offensiveWords]);

    const addToOffensiveWords = (event) => {
        event.preventDefault();
        const offensiveWord = event.target.elements.offensive.value.trim();
        event.target.reset();
        const isExist = offensiveWords.some(word => word === offensiveWord);
        if(isExist) {
            //Offensive word already exist..no need to add it
            return;
        }
        const tmpOffensiveWords = [
            offensiveWord,
            ...offensiveWords
        ];
        setOffensiveWords(tmpOffensiveWords);
    }

    /**
     * Removing offensive word from the list of offensive words
     * @param offensiveWord
     */
    const removeOffensiveWord = (offensiveWord) => {
        const filteredOffensiveWords = offensiveWords.filter(word => offensiveWord !== word);
        setOffensiveWords(filteredOffensiveWords);
    }

    /**
     * This is another functionality been added where it can see the user much time to remove
     * all the offensive words
     */
    const removeAllOffensiveWords = () => {
        setOffensiveWords([]);
    }

    /**
     * This method responsible to prepare the request been send to post data into server and display a success message
     * When it's failing to upload file, an error message will be displayed properly
     * Once the user browsing another document, the message be shown will disappear so we can know the result of the
     * next file upload
     */
    const uploadToServer = () => {
        const file = new FormData();
        file.append('document', selectedFile);
        file.append('offensiveWords', JSON.stringify(offensiveWords));
        uploadDocuments(file).then(res => {
            if(!res || res.error)
                setDoesUploaded(false);
            else
                setDoesUploaded(true);
        }).catch(err => {
            console.error(err);
            setDoesUploaded(false);
        })
    }

    /**
     * Store the selected file when browsing and choosing a file
     * @param event
     */
    const storeSelectedFile = (event) => {
        setDoesUploaded('');
        event.preventDefault();
        setSelectedFile(event.target.files[0]);
    }

    /**
     * The header JSX been showing in the page
     * @returns {JSX.Element}
     */
    const headerSectionJsx = () => {
        return (
            <div>
                <h1 className='upload_title'>Lawgeex Document Review</h1>
                <div className='choose_file'>
                    <input className='bg-info' type="file" name="document" onChange={(event) => storeSelectedFile(event)}/>
                </div>
            </div>
        )
    }

    /**
     * The offensive section JSX of the page
     * @returns {JSX.Element}
     */
    const offensiveSectionJsx = () => {
        return (
            <div className='offensive_section'>

                <div className='offensive_words'>
                    <form className='form' onSubmit={addToOffensiveWords}>
                        <input name='offensive' type='text' placeholder='Add Offensive word...' className='form-control mr-sm-0'>
                        </input>
                        <button className='btn btn-success'>Add</button>
                    </form>

                    <h3 align='left' className='offensive_words_title'>Offensive words to strip</h3>
                    <button className='remove_all_offensive_word_btn btn btn-danger' onClick={() => removeAllOffensiveWords()}>
                        Remove All Offensive Words
                    </button>
                    <div className='row offensive_words_list'>
                        {offensiveWords.length > 0 && offensiveWords.map(offensiveWord => {
                            return (
                                <div key={offensiveWord} className='card bg-info shadow-sm'>
                                    <span className='offensive_word'> {offensiveWord} </span>
                                    <button className='remove_offensive_word_btn btn btn-danger' onClick={() => removeOffensiveWord(offensiveWord)}>
                                        Remove
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

    /**
     * The footer JSX which includes basically the submit and the success/error message been displayed
     * @returns {JSX.Element}
     */
    const footerJsx = () => {
        return (
            <div>
                <button className='btn btn-primary' onClick={() => uploadToServer()}>Submit</button>
            {doesUploaded === true ? <h2 className='bg-success'>File was uploaded successfully</h2> :
                doesUploaded === false ? <h2 className='bg-danger'>Failed to upload file</h2> : ''}
            </div>
        )
    }

    return (
        <div className='container'>
            <Menu/>
            {headerSectionJsx()}
            {offensiveSectionJsx()}
            {footerJsx()}
        </div>

    )

}

export default Upload;