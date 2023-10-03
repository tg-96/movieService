import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Movie from "../components/Movie";

function Detail() {
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const getMovie = async () => {
        const json = await (
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        setMovie(json.data.movie);
        setLoading(false);
    }
    useEffect(() => {
        getMovie();
    }, []);

    return <div>
        {loading ?
            (<h1>Loading...</h1>) : (
                <div>
                    <Movie
                        key={movie.id}
                        id={movie.id}
                        summary={movie.summary}
                        coverImg={movie.medium_cover_image}
                        genres={movie.genres}
                        title={movie.title}/>
                </div>)}
    </div>
}

export default Detail