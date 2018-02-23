<template>
  <div class="pizarra">
    <h3> {{msg}} </h3>
    <TextBox v-for="line in lines" :startText="line.text" :jsonStartx="line.left" :jsonStarty="line.top"/>
  
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TextBox from './TextBox';
import fakedata from '../assets/fake-data.json'

import Line from '../models/Line'

@Component({
  components: { TextBox }
})
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  private lines: Line[] = []

  mounted () {
    // console.log(fakedata);
    this.generateLinesFromJson()
  }

  generateLinesFromJson () {
    this.lines = fakedata.recognitionResult.lines.map(line => {
      return new Line(line.boundingBox[1], line.boundingBox[0], line.text)
    })
    console.log(this.lines);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
