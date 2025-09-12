import { configureStore } from '@reduxjs/toolkit'
// import postsSlice from "./Reducers/PostReducer"
import { postApi } from './Services/Post'
import { setupListeners } from '@reduxjs/toolkit/query'
export const store = configureStore({
    reducer:{
        [postApi.reducerPath]: postApi.reducer
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(postApi.middleware)

    
})

// export default store
setupListeners(store.dispatch)