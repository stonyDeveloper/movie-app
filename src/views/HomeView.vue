<template>
  <div class="home">
    <form class="input-container" @submit.prevent="search(1)">
      <input
        type="text"
        placeholder="Enter movie title..."
        v-model="searchKeyword"
      />
      <button class="btn btn-primary">Search</button>
    </form>

    <div class="error">
      {{ error }}
    </div>

    <LoadingState v-if="loading"></LoadingState>

    <div class="illustration" v-if="movieList.length == 0 && !loading">
      <img src="@/assets/movie_illustration.png" alt="" />
    </div>

    <div class="container">
      <div class="movie-list" v-if="movieList !== 0 && !loading">
        <div
          class="movie"
          v-for="movie in movieList"
          :key="movie.imdbID"
          @click="goToMovie(movie.imdbID)"
        >
          <div class="image">
            <img :src="movie.Poster" alt="" />
          </div>
          <div class="title">
            {{ movie.Title }}
          </div>
          <div class="additional">
            <div class="type">{{ movie.Type }}</div>
            <div class="mid">&middot;</div>

            <div class="year">{{ movie.Year }}</div>
          </div>
        </div>
      </div>

      <div class="pagination">
        <div
          :class="['page', { active: page == currentPage }]"
          v-for="page in totalPages"
          :key="page"
          @click="currentPage = page"
        >
          {{ page }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingState from "@/components/LoadingState.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "HomeView",
  data: () => ({
    searchKeyword: "",
    currentPage: 1,
  }),
  computed: {
    ...mapState(["movieList", "loading", "error", "totalResults"]),
    totalPages() {
      return Math.ceil(this.totalResults / 10);
    },
  },
  methods: {
    ...mapActions(["fetchAllMovies", "clearList"]),
    search(page) {
      if (page) {
        this.currentPage = page;
      }
      this.$router.replace({ query: { s: this.searchKeyword } });
      const options = {
        searchPhrase: this.searchKeyword,
        page: this.currentPage,
      };
      this.fetchAllMovies(options);

      // this.$route.query.searchPhrase = this.searchKeyword;
    },
    goToMovie(movieId) {
      this.$router.push(`/${movieId}`);
    },
  },
  mounted() {
    this.clearList();
    this.searchKeyword = this.$route.query.s;
    if (this.searchKeyword) {
      this.search();
    }
  },
  watch: {
    currentPage() {
      this.search();
    },
  },
  components: { LoadingState },
};
</script>

<style scoped>
.error {
  text-align: center;
  margin-block: 1rem;
  color: #c53939;
  font-size: 20px;
}

.input-container {
  width: calc(100vw - 64px);
  max-width: 507px;
  height: 56px;
  margin-top: 70px;
  margin-inline: auto;
  padding: 3px;
  display: flex;
  background: #313030;
  border-radius: 100px;
  position: sticky;
  top: 80px;
  box-shadow: 0 1rem 2rem rgb(0 0 0 / 10%);
  z-index: 90;
}

.input-container:focus-within {
  box-shadow: 0 0 0 2px #c53939;
}

.input-container input {
  flex-basis: 100%;
  padding-inline: 20px 16px;
  background: transparent;
  border: none;
  color: white;
  font-size: 16px;
}

.input-container input:focus,
.input-container input:focus-within,
.input-container input:focus-visible {
  outline: none;
  border: none;
}

.btn {
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 100px;
  background: #c53939;
  cursor: pointer;
}

.btn-primary {
  color: white;
}

.illustration {
  margin-top: 144px;
  width: 100%;
}

.illustration img {
  width: 90%;
  max-width: 715px;
  margin-inline: auto;
  display: block;
  -webkit-box-reflect: below -100px linear-gradient(transparent, transparent, #0004);
}

.movie-list {
  max-width: 1200px;
  margin-inline: auto;
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, auto));
  gap: 32px;
  justify-content: center;
}

@media (min-width: 800px) {
  .movie-list {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (max-width: 400px) {
  .input-container {
    width: 94%;
  }

  .input-container input:focus,
  .input-container input:focus-within,
  .input-container input:focus-visible {
    outline: none;
    border: none;
  }
}

@media (max-width: 800px) {
  input:focus,
  select:focus,
  textarea:focus,
  button:focus {
    outline: none;
  }

  .illustration img {
    -webkit-box-reflect: below -50px linear-gradient(transparent, transparent, #0004);
  }
}

.movie {
  width: 100%;
  transition: transform 300ms ease;
  cursor: pointer;
}

.movie:hover {
  transform: scale(1.05);
}

.movie .additional {
  display: flex;
  gap: 8px;
  opacity: 0.55;
}

.movie .title {
  font-weight: 700;
}

.movie .image img {
  width: 100%;
  height: 310px;
  object-fit: cover;
}

.movie .type {
  text-transform: capitalize;
}

.movie .additional .mid {
  font-size: 40px;
  line-height: 20px;
}

.pagination {
  display: flex;
  gap: 4px;
  width: 100%;
  overflow-x: auto;
  margin-block: 32px;
}

.page.active {
  background: #c53939;
}

.page {
  min-width: 40px;
  height: 40px;
  display: grid;
  place-content: center;
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  /* background: yellow; */
}

.page:not(.active):hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
