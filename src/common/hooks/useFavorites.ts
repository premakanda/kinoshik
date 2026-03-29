// hooks/useFavorites.ts
import { useState } from 'react'

export type FavoriteMovie = {
    id: number
    title: string
    posterUrl: string | null
    vote_average: number
}

export type ToggleFavoritePayload = {
    id: number
    title: string
    img: string | null
    vote: number
}

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<FavoriteMovie[]>(() => {
        try {
            return JSON.parse(localStorage.getItem('favorites') || '[]') as FavoriteMovie[]
        } catch {
            return []
        }
    })

    const toggleFavorite = (movie: ToggleFavoritePayload) => {
        const exists = favorites.some(fav => fav.id === movie.id);
    
    let newFavorites: FavoriteMovie[];
    if (exists) {
        newFavorites = favorites.filter(fav => fav.id !== movie.id);
    } else {
        newFavorites = [...favorites, {
            id: movie.id,
            title: movie.title,
            posterUrl: movie.img,
            vote_average: movie.vote
        }];
    }
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
    }

    const isFavorite = (id: number) => {
        return favorites.some(fav => fav.id === id)
    }

    return { favorites, toggleFavorite, isFavorite }
}