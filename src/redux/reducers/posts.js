const initialState = {
    posts: []
}

export default function (state = initialState, action) {

    switch (action.type) {

        case 'SET_POSTS': {
            return {
                ...state,
                post: action.payload
            }
        }

        default: {
            return state
        }
    }
}