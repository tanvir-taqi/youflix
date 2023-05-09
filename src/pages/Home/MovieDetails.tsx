import React from 'react';
import { useLoaderData } from 'react-router-dom';


interface MovieDetailsProps {
    movie?: {
        id: number
        adult: boolean
        backdrop_path: string
        belongs_to_collection: {
            id: number
            name: string
            backdrop_path: string
            poster_path: string
        }
        genres: {
            id: number
            name: string
        }[]
        budget: number
        homepage: string
        imdb_id: string
        original_language: string
        original_title: string
        popularity: number
        poster_path: string
        production_companies: {
            id: number
            logo_path: string
            name: string
            origin_country: string
        }[]
        production_countries: {
            iso_3166_1: string
            name: string
        }[]
        spoken_languages: {
            english_name: string
            iso_639_1: string
            name: string
        }[]
        release_date: string
        overview: string
        revenue: number
        runtime: number
        title: string
        tagline: string
        video: boolean
        vote_average: number
        vote_count: number
    }
}

const MovieDetails = () => {
    const movie: any = useLoaderData()

    const { original_title, poster_path, tagline, runtime, release_date, genres, overview } = movie

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} className=' md:max-w-[700px] md:max-h-[600px] h-full w-full filter brightness-75' alt="Movie poster" />
                <div className='flex flex-col items-start md:p-20 p-4 justify-center text-left space-y-6'>
                    <h3 className='text-3xl'>{original_title}</h3>
                    <p className='text-gray-400'>{tagline}</p>
                    <div>
                        {
                            genres.map((gn: { id: number; name: string; }) => <p key={gn.id} className='border border-red-600 px-4 py-1 rounded-2xl'>{gn?.name}</p>)
                        }
                    </div>
                    <p className=''>Runtime:{runtime}min <span className='mx-5'>Released On: {release_date}</span></p>
                    <p className='flex  flex-wrap'>{overview}</p>
                </div>
            </div>

        </div>
    );
};

export default MovieDetails;