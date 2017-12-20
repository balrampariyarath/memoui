import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {fetchAllMemos} from '../actions/memo';


class Home extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            memoDisplay: {},
            startDate: '',
            endDate: '',
            with: ''
        };
        this.setMemos = this.setMemos.bind(this);
        this.setFilter = this.setFilter.bind(this);
    }

    componentDidMount() {
        if (this.props.memos.length === 0)
            this.props.dispatch(fetchAllMemos());
        this.renderMemos = this.renderMemos.bind(this);
    }

    // grouping memos according to dates and setting them into a state 'memoDisplay'
    setMemos(memos){
        let memoDisplay = {};
        memos.forEach(function(memo){
            var key = Date.parse(memo.date);
            if(memoDisplay[key]!=undefined)
                memoDisplay[key] = memoDisplay[key].concat({
                    ...memo
                });
            else
                memoDisplay[key] = [{
                    ...memo
                }];
        });
        this.setState({memoDisplay: memoDisplay});
    }

    setFilter(e){
        e.preventDefault();
        const memos = this.props.memos;
        const startDate = this.state.startDate;
        const endDate = this.state.endDate;
        const withFilter = this.state.with;
        let memoFiltered = [];
        if(withFilter!='')
            memos.forEach(memo=>{
                if(memo.person.toLowerCase() == withFilter.toLowerCase())
                    memoFiltered.push(memo);
            });
        else 
            memoFiltered = memos;
        if(startDate == '' || endDate == '')
            this.setMemos(memoFiltered);
        else{
            var filtered = memoFiltered.filter(function(memo){
                return ((Date.parse(startDate)<=Date.parse(memo.date)) && (Date.parse(memo.date)<=Date.parse(endDate)))
            }.bind(this));
            this.setMemos(filtered);
        }
    }

    //invocation of setMemos
    componentWillReceiveProps(nextProps){
        this.setMemos(nextProps.memos);
    }

    renderMemos() {
        if (this.props.fetching)
            return (
                <p>Loading...</p>
            )
        // displaying as a group
        const keys = Object.keys(this.state.memoDisplay);
        const groupedMemos = this.state.memoDisplay;
        return keys.map((memoKey, index) => {
            return (
                <div>
                    <h3> {groupedMemos[memoKey][0].date} </h3>
                    {
                        groupedMemos[memoKey].map(memo=>{
                            return (
                                <div style={{padding: '8px', borderBottomColor: 'black', borderBottomStyle: 'solid', borderBottomWidth: '1px'}}>
                                    <p>{memo.desc}</p>
                                    <h6>with: {memo.person}</h6>
                                </div>
                            );
                        })
                    }
                    
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
                    {memos.length>0? memos:<h3>No Results</h3>}
                </div>
                <div style={{ backgroundColor: '#f1f1f1', width: '34%', height: '500px', display: 'inline-block', marginLeft: '2.5%', padding: '20px', textAlign: 'center', boxSizing: 'border-box' }}>
                    <form onSubmit={this.setFilter}>
                        <input type="text" name="with" placeholder="With?" value={this.state.with} onChange={(val)=>{this.setState({with: val.target.value})}} />
                        <br/><br/>
                        <label htmlFor='start'>Start:</label>
                        <input type="date" name="date" placeholder="Date" id='start' value={this.state.startDate} 
                        onChange={(val)=>{this.setState({startDate: val.target.value})}} />
                        <label htmlFor='end'>End:</label>
                        <input type="date" name="date" placeholder="Date" id='end' value={this.state.endDate} 
                        onChange={(val)=>{this.setState({endDate: val.target.value})}} />
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