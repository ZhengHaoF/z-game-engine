<template>
  <div id="main">
    <audio id="bg-audio" class="game-audio" preload="auto" controls autoplay loop src=""></audio>
    <audio id="role-audio" class="game-audio" preload="auto" controls autoplay loop src=""></audio>
    <div id="canvas">
      <div id="canvas-left">

      </div>
      <div id="canvas-middle">

      </div>
      <div id="canvas-right">

      </div>
    </div>
    <div id="footer">
      <div id="footer-header">
        <div id="footer-header-img">

        </div>
      </div>
      <div id="footer-main">
        <div id="footer-main-text">

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import 'animate.css';
import {initEngine} from "../engine/js/engine"
import {onMounted} from "vue";

onMounted(() => {
  initEngine()
})
</script>

<style scoped>
.game-audio{
  position: absolute;
  opacity: 0;
}
#main {
  background-color: #ccc;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

#canvas {
  height: 80%;
  width: 100%;
  /*background-color: blue;*/
}

#footer {
  height: 20%;
  width: 100%;
  z-index: 9999;
}

#canvas-left {
  width: 30%;
  /*background-color: green;*/
  float: left;
  height: 100%;
  /*background-image: url("/assets/roleImg/栞那a_0_1891.png");*/
  background-clip: content-box;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

}

#canvas-middle {
  width: 40%;
  /*background-color: yellow;*/
  float: left;
  height: 100%;
}

#canvas-right {
  width: 30%;
  /*background-color: aqua;*/
  float: left;
  height: 100%;
  background-clip: content-box;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

#footer-header {
  width: 20%;
  background-color: #000000AA;
  height: 100%;
  float: left;
  position: relative;
  z-index: 10;
}

#footer-header-img {
  background-repeat: no-repeat;
  background-position: center;
  box-sizing: border-box;
  background-position-x: center;
  background-position-y: center;
  width: 120px;
  height: 120px;
  border-radius: 999px;
  overflow: hidden;
  text-align: center;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

}

#footer-main {
  width: 80%;
  background-color: #000000AA;
  height: 100%;
  float: left;
  box-sizing: border-box;
  z-index: 10;
}
#footer-main-text{
  color: #cccccc;
  font-size: 1.5em;
  padding: 20px;
}
</style>
