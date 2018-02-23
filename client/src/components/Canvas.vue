<template>
<div 
	class="canvas"
	:style="{ width: canvasStyle.width +'px',  height: canvasStyle.height +'px' }"
	>
	<div
		v-for="(item, key) in data"
		:key="key"
		:id="'textBox'+key"
		class="textBox"
		:style="calculatePositionItem(key, item.boundingBox)"
	>{{ item.text }}</div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Canvas extends Vue {
	@Prop() private data!: [];

	canvasStyle = {
		width: 1000,
		height: 800
	}

	minX = Number.MAX_VALUE
	minY = Number.MAX_VALUE
	maxX = Number.MIN_VALUE
	maxY = Number.MIN_VALUE

	created() {
		for (let line of this.data) {
			for (const key in line.boundingBox) {
				let position = line.boundingBox[key]
				if(Number(key) % 2 == 0) {
					this.minX = this.minX > position ? position : this.minX
					this.maxX = this.maxX < position ? position : this.maxX
				}
				else {
					this.minY = this.minY > position ? position : this.minY
					this.maxY = this.maxY < position ? position : this.maxY
				}
			}
		}
	}

	calculatePositionItem(index:number, arrayPositions: any): any {

		let leftPosition = ((arrayPositions[0] - this.minX)/ this.canvasStyle.width) * 100
		let topPosition = ((arrayPositions[1] - this.minY)/this.canvasStyle.height) * 100

		let style = {
			left: leftPosition/1.5 +'%',
			top: topPosition/1.5 +'%',
		}
		return style
	}
}
</script>

<style scoped lang="stylus">
	.canvas
		position relative
	
	.textBox
		position absolute
</style>
