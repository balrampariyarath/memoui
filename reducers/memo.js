const memo = (
    state = {
        fetchingAllMemos: false,
        allMemos: [],
    },
    action,
) => {
    switch(action.type) {
        case 'FETCHED_ALL_MEMOS':
            return {
                ...state,
                allMemos: action.payload,
                fetchingAllMemos: false,
            };
        case 'FETCHING_ALL_MEMOS':
            return { ...state, fetchingAllMemos: true };
        default:
            return state;
    }
};

export default memo;