<template>
  <div style="width: 82%; float: right">
    <h1 class="mt-3">Statisctics by genre</h1>
    <apexchart
      class="mt-5"
      type="pie"
      width="480"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  data() {
    return {
      getGenreStatistics: [],
      stats: null,
      series: [],
      chartOptions: {
        labels: [],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 100,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  },
  watch: {
    getGenreStatistics() {
      this.getGenreStatistics.forEach((e) => {
        this.chartOptions.labels.push(e.genre);
        this.series.push(Number(e.percent.toFixed(1)));
      });
    },
  },

  apollo: {
    getGenreStatistics: {
      query: gql`
        query getGenreStatistics {
          getGenreStatistics {
            genre
            records
            percent
          }
        }
      `,
    },
  },
};
</script>

<style>
</style>