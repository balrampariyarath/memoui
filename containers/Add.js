import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {fetchAllMemos} from '../actions/memo';


class Add extends React.Component {
    render() {
        return (
            <div>
                <h2>Add Memos</h2>
                <form>
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

export default Add;