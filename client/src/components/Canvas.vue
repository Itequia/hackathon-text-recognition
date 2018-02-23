<template>
<div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { data } from '../assets/example.js';
// const data = require('./../assets/example.js');

@Component
export default class Canvas extends Vue {
	created() {
		console.log(data)
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

</style>
