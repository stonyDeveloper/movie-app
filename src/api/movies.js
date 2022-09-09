import axios from "axios";

const baseURL = "https://www.omdbapi.com/";
const apiKey = "8f52fb04";

function searchMovie(searchPhrase, page = 1) {
    return axios.get(
        `${baseURL}?apikey=${apiKey}&s=${searchPhrase}&page=${page}`
    );
}

function getSingleMovie(movieId) {
    return axios.get(`${baseURL}?apikey=${apiKey}&i=${movieId}`);
}
export { searchMovie, getSingleMovie };