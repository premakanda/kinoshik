import { createSlice } from '@reduxjs/toolkit'

type FavoriteMovie = {
    id: number
    title: string
    posterUrl: string
    vote_average: number
}

const loadFavorites = (): FavoriteMovie[] => {
    return JSON.parse(localStorage.getItem('favorites') || '[]')
}

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        items: loadFavorites()
    },
    reducers: {
        toggleFavorite: (state, action: { payload: FavoriteMovie }) => {
            const exists = state.items.some(item => item.id === action.payload.id)
            
            if (exists) {
                state.items = state.items.filter(item => item.id !== action.payload.id)
            } else {
                state.items.push(action.payload)
            }
            
            localStorage.setItem('favorites', JSON.stringify(state.items))
        }
    }
})

export const { toggleFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer