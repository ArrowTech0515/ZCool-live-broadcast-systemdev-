<template>
  <div class="envelope">
    <div class="diagonal-line diagonal-line-one"></div>
    <div class="diagonal-line diagonal-line-two"></div>
    <span class="text" style="background: lightgrey; z-index: 1;">密码</span>
  </div>
</template>

<style scoped>
.envelope {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 40px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  font-weight: bold;
  color: #000;
  overflow: hidden;
}


/* Add crossing diagonals */
.diagonal-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px solid grey;
}

.diagonal-line-one {
  transform: rotate(32deg);
  transform-origin: top left;
}

.diagonal-line-two {
  transform: rotate(-32deg);
  transform-origin: top right;
}
</style>
