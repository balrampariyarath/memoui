export function fetchAllMemos() {
    return dispatch => {
        dispatch({ type: 'FETCHING_ALL_MEMOS' })
        fetch(
            'http://localhost:8000/api/memos/history/?ordering=-date'
        )
        .then(response => response.json())
        .then(data => {
            console.log(data);
            dispatch({
                type: 'FETCHED_ALL_MEMOS',
                payload: data,
            });
        })
        .catch(err => console.log(err));
    };
}

export function addNewMemo(memo) {
    return dispatch => {
        const values = {
            desc: memo.description,
            image: memo.uploadNotes,
            date: memo.date,
            person: memo.with,
        };
        console.log(values);
        dispatch({ type: 'ADDING_MEMO' });
        fetch('http://localhost:8000/api/memos/add', {
            method: 'POST',
            body: JSON.stringify(values),
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
        })
        .catch(err => console.log(err));
    };
}