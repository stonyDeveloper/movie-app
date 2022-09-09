<template>
  <div class="root">
    <LoadingState v-if="loading"></LoadingState>
    <div class="content" v-else>
      <div class="poster">
        <img :src="movie.Poster" alt="" />
      </div>
      <div class="movie-details">
        <button class="btn btn-primary" @click="goBack">&#8592; Back</button>
        <div class="title">{{ movie.Title }}</div>

        <div class="subtext">
          <div class="type">{{ movie.Type }}</div>
          <div class="mid">&middot;</div>
          <div class="release-date">{{ movie.Released }}</div>
        </div>

        <div class="more-info">
          <div class="labelled">
            <div class="label plot">Plot:</div>
            <div class="value">{{ movie.Plot }}</div>
          </div>

          <div class="labelled">
            <div class="label actor">Actor:</div>
            <div class="value">{{ movie.Actors }}</div>
          </div>

          <div class="labelled centered">
            <div class="label">Genre:</div>
            <div class="value">
              <div class="pills">
                <div
                  class="pill"
                  v-for="pill in movie.Genre.split(', ')"
                  :key="pill"
                >
                  {{ pill }}
                </div>
              </div>
            </div>
          </div>

          <div class="labelled">
            <div class="label">IMDB Rating:</div>
            <div class="rating">{{ movie.imdbRating }}⭐️</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import LoadingState from "@/components/LoadingState.vue";

export default {
  name: "SingleMovieView",
  created() {
    this.fetchMovie();
  },
  computed: {
    ...mapState(["loading", "movie"]),
  },
  methods: {
    fetchMovie() {
      const movieId = this.$route.params.movieId;
      this.$store.dispatch("fetchSingleMovie", movieId);
    },

    goBack() {
      this.$router.back();
    },
  },
  components: { LoadingState },
};
</script>

<style scoped>
.content {
  width: 90%;
  margin-inline: auto;
  max-width: 400px;
}
.root {
  margin-top: 4rem;
}
.btn {
  /* padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 100px;
  background: #c53939;
  cursor: pointer; */
  padding: 0 24px;
  font-size: 16px;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  border: 1px solid #c53939;
  color: #c53939;
  background-color: transparent;
  height: 32px;
}

.btn:hover {
  opacity: 0.7;
}

.btn-primary {
  color: #c53939;
}
.poster img {
  width: 100%;
}

@media (min-width: 768px) {
  .poster img {
    width: 100%;
  }

  .movie-details {
    width: 478px;
  }
  .content {
    width: 90%;
    max-width: 733px;
    margin-inline: auto;
    display: grid;
    grid: 1fr / 290px auto;
    gap: 32px;
  }
}

.title {
  font-size: 36px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-top: 32px;
  line-height: 1.2;
  margin-bottom: 8px;
}

.subtext {
  display: flex;
  gap: 8px;
  opacity: 0.5;
}

.type {
  text-transform: capitalize;
}

.more-info {
  display: flex;
  flex-flow: column;
  margin-top: 24px;
  line-height: 150%;
  gap: 10px;
}

.labelled {
  display: grid;
  grid: 1fr / max-content auto;
  gap: 8px;
}

.labelled.centered {
  align-items: center;
}

.label.plot,
.label.actor {
  /* margin-top: -62px; */
}

.value {
  opacity: 0.5;
  line-height: 160%;
}

.pills {
  display: flex;
  gap: 8px;
}

.pill {
  padding: 8px 24px;
  background-color: #424242;
  border-radius: 100px;
}
</style>
