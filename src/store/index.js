import { createStore } from "vuex";
import { searchMovie, getSingleMovie } from "@/api/movies";

export default createStore({
    state: {
        movieList: [],
        error: null,
        loading: null,
        movie: null,
        totalResults: 0,
    },
    getters: {},
    mutations: {
        UPDATE_LIST(state, movieList) {
            state.movieList = movieList;
        },
        SET_ERROR(state, errorMessage) {
            state.error = errorMessage;
        },
        SET_LOADING(state, loadingState) {
            state.loading = loadingState;
        },
        SET_MOVIE(state, movieObj) {
            state.movie = movieObj;
        },
        SET_RESULT_COUNT(state, count) {
            state.totalResults = parseInt(count);
        },
    },
    actions: {
        updateList({ commit }, movieList) {
            commit("UPDATE_LIST", movieList);
        },
        clearList({ commit }) {
            commit("UPDATE_LIST", []);
        },
        async fetchAllMovies({ commit }, options) {
            try {
                const { searchPhrase, page } = options;
                commit("SET_LOADING", true);
                const res = await searchMovie(searchPhrase, page);
                const data = res.data;

                if (data.Response === "True") {
                    const movieList = res.data.Search;
                    const totalResults = res.data.totalResults;
                    commit("SET_RESULT_COUNT", totalResults);

                    commit("UPDATE_LIST", movieList);
                    commit("SET_ERROR", null);
                } else {
                    commit("UPDATE_LIST", []);
                    commit("SET_ERROR", data.Error);
                }
            } catch (err) {
                console.log(err);
            } finally {
                commit("SET_LOADING", false);
            }
        },
        async fetchSingleMovie({ commit }, movieId) {
            try {
                commit("SET_LOADING", true);
                const response = await getSingleMovie(movieId);
                const { data } = response;
                console.log(data);
                commit("SET_MOVIE", data);
                commit("SET_ERROR", null);
                // commit("UPDATE_LIST");
            } catch (err) {
                console.log(err);
                commit("SET_ERROR", err.message);
            } finally {
                commit("SET_LOADING", false);
            }
        },
    },
    modules: {},
});