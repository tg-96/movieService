import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css"

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

    return <div className={styles.container}>
        {loading ?
            (<div className={styles.loader}>
                <span>Loading...</span>
            </div>) : (
                <div className={styles}>
                    <Movie
                        key={movie.id}
                        id={movie.id}
                        coverImg={movie.medium_cover_image}
                        genres={movie.genres}
                        title={movie.title}
                        year={movie.year}
                    />
                </div>)}
    </div>
}

export default Detail