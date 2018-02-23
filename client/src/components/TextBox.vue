<template>
  <div class="text-box card noselect"
  		@mousedown="startMovement"
  		@dblclick="isEditting = !isEditting"
  		:style="style">
    	
    	<div v-if="!isEditting">
    		{{text}}
    	</div>
    	<div v-else>
    		<input type="text" @keyup.enter="isEditting = !isEditting" v-model="text">
    	</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TextBox extends Vue {
  @Prop() startText: string;
  @Prop() jsonStartx: string;
  @Prop() jsonStarty: string;

  private isMoving: boolean = false
  private x: number = 0
  private y: number = 0
  private startx: number = 0
  private starty: number = 0
  private isEditting: boolean = false

  
  	mounted() {
  		this.startx = parseInt(this.jsonStartx)
  		this.starty = parseInt(this.jsonStarty)
  		this.text = this.startText
  		this.x = this.startx
  		this.y = this.starty
  		window.addEventListener('mousemove', this.move)
  		window.addEventListener('mouseup', this.stopMovement)
  	}
  	beforeDestroy () {
  		window.removeEventListener('mousemove', this.move)
  		window.removeEventListener('mouseup', this.stopMovement)
  	}
  
  	get style() {
  		return {
  			top: this.y + 'px',
  			left: this.x + 'px'
  		}
  	}
  
  	startMovement(event: MouseEvent) {
  		if (this.isEditting) return
  		this.startx = event.clientX
  		this.starty = event.clientY
  		this.isMoving = true
  	}
  
  	stopMovement(event: MouseEvent) {
  		this.isMoving = false
  	}
  
  	move(event: MouseEvent) {
  		if (!this.isMoving) return
  		this.x += (event.clientX - this.startx)
  		this.y += (event.clientY - this.starty)
  		this.startx = event.clientX
  		this.starty = event.clientY
  	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.text-box {
		position: absolute;
		border: 1px solid grey;
		height: 50px;
		width: auto;
		line-height: 50px;
		cursor: move;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		padding: 10px;
	}
</style>
