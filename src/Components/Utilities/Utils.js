
import {CONSTANTS} from '../../Constants';

export const loadDocuments = async () => {
    return await fetch(CONSTANTS.LOAD_DOCUMENTS, {
        method: 'GET',
    })
        .then(res => {
            //console.log(res);
            if (!res.ok || (res.status !== 200 && res.status !== 201)) {
                throw new Error('Failed');
            }

            return res.json();
        })
        .then(resData => {
            //console.log(resData);
            return resData;
        })
        .catch(err => {
            // Do something for an error here
            console.log("Error Reading data " + err);
            throw new Error('Failed');
        });
}

export const uploadDocuments = async (req) => {
    return await fetch(CONSTANTS.UPLOAD_URI, {
        method: 'POST',
        body: req
    })
        .then(res => {
            //console.log(res);
            if (!res.ok || (res.status !== 200 && res.status !== 201)) {
                throw new Error('Failed');
            }

            return res.json();
        })
        .then(resData => {
            //console.log(resData);
            return resData;
        })
        .catch(err => {
            // Do something for an error here
            console.log("Error Reading data " + err);
            throw new Error('Failed');
        });
}