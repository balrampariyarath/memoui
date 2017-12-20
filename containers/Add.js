import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {addNewMemo} from '../actions/memo';


class Add extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            description: '',
            uploadNotes: '',
            date: '',
            with: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        const data = {
            description: this.state.description,
            uploadNotes: this.state.uploadNotes,
            date: this.state.date,
            with: this.state.with
        }
        this.props.dispatch(addNewMemo(data));
    }

    render() {
        return (
            <div>
                <h2>Add Memos</h2>
                <form onSubmit={this.handleSubmit}>
                    Description: <textarea rows="5" cols="50" name="desc" /> <br/><br/>
                    Upload Notes: <input type="file" name="image" /> <br/><br/>
                    Date: <input type="date" name="date" /> <br/><br/>
                    With: <input type="text" name="person" /> <br/><br/>
                    <input type="submit" value="Save Memo" />
                </form> <br/><br/><br/><br/>
                <Link to="/">
                    <button>Go Home</button>
                </Link>
            </div>
        )
    }
}

export default connect(store => {
    return {
        memos: store.memo.allMemos,
        fetching: store.memo.fetchingAllMemos,
    };
})(Add);