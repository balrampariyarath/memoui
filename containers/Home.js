import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {fetchAllMemos} from '../actions/memo';


class Home extends React.Component {
    componentDidMount() {
        if (this.props.memos.length === 0)
            this.props.dispatch(fetchAllMemos());
        this.renderMemos = this.renderMemos.bind(this);
    }

    renderMemos() {
        if (this.props.fetching)
            return (
                <p>Loading...</p>
            )
        return this.props.memos.map((memo, index) => {
            return (
                <div>
                    <h3> {memo.date} </h3>
                    <div style={{padding: '8px', borderBottomColor: 'black', borderBottomStyle: 'solid', borderBottomWidth: '1px'}}>
                        <p>{memo.desc}</p>
                        <h6>with: {memo.person}</h6>
                    </div>
                </div>
            );
        });
    }

    render () {
        let memos = this.renderMemos();
        return (
            <div>
                <h2>Memos</h2>
                <div style={{ backgroundColor: '#f1f1f1', width: '60%', display: 'inline-block', height: '500px', overflowY: 'scroll', float: 'left' }}>
                    {memos}
                </div>
                <div style={{ backgroundColor: '#f1f1f1', width: '34%', height: '500px', display: 'inline-block', marginLeft: '2.5%', padding: '20px', textAlign: 'center', boxSizing: 'border-box' }}>
                    <form>
                        <input type="text" name="with" placeholder="With?" />
                        <br/><br/>
                        <input type="date" name="date" placeholder="Date" />
                        <br/><br/>
                        <button>Search</button>
                        <br/><br/>
                    </form>
                </div> <br/><br/><br/>
                <Link to="/addMemo">
                    <button>Add Memo</button>
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
})(Home);