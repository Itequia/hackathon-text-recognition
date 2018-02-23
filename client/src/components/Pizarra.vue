<template>
  <div class="pizarra">
    <h3> {{msg}} </h3>
    <TextBox startText="Esto es una caja de texto" jsonStartx="100" jsonStarty="200"/>
    <TextBox startText="Esto es una caja de texto" jsonStartx="400" jsonStarty="400"/>
    <TextBox startText="Esto es una caja de texto" jsonStartx="900" jsonStarty="800"/>
    <TextBox startText="Esto es una caja de texto" jsonStartx="1300" jsonStarty="600"/>
    <TextBox startText="Esto es una caja de texto" jsonStartx="1500" jsonStarty="1000"/>
    
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TextBox from './TextBox'

@Component({
  components: { TextBox }
})
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
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
