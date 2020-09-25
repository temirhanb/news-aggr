const initialState = {
    site: 'ural56'
}

export default function (state = initialState, action) {
    switch (action.type) {
        case'CHANGE_SITE': {
            return {
                ...state,
                site: action.payload
            }
        }
        default: {
            return state
        }
    }
}