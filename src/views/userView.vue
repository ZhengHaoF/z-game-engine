<template>
  <div id="main">
    <audio id="bg-audio" preload="auto" controls autoplay loop src="/assets/music/backgroundMusic/BGM01.mp3"></audio>

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

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {initEngine, tets} from "../engine/js/engine"
import {onMounted} from "vue";

onMounted(() => {
  initEngine()
  tets()
})
</script>

<style scoped>
#bg-audio{
  position: absolute;
  opacity: 0;
}
#main {
  background-color: #ccc;
  background-image: url('/assets/backgroundImg/その他_プールA.png');
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
}

#canvas-left {
  width: 30%;
  /*background-color: green;*/
  float: left;
  height: 100%;
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
}

#footer-header {
  width: 20%;
  background-color: #000000AA;
  height: 100%;
  float: left;
  position: relative;
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
  color: #cccccc;
  font-size: 1.5em;
  padding: 20px;
  box-sizing: border-box;
}
</style>
