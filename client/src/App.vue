<template>
  <div id="app">
    <Pizarra msg="Hackaton Text Recognission"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import Pizarra from './components/Pizarra.vue';

@Component({
  components: {
    Pizarra,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 1000px;
  background: #DEE1EA;
  border: 20px solid #B77A4E;
}
</style>
