<template>
  <div class="envelope">
    <div class="diagonal-line diagonal-line-one"></div>
    <div class="diagonal-line diagonal-line-two"></div>
    <span class="text">密码</span>
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
  width: 200%;  /* Increase to ensure the lines reach the corners */
  height: 100%; /* Ensure the height fits the container */
  border: 1px solid grey;
  z-index: 1; /* Set a lower z-index for lines */
}

.diagonal-line-one {
  transform: rotate(33deg);
  transform-origin: top left;
  top: -50%;
  left: -50%;
}

.diagonal-line-two {
  transform: rotate(-33deg);
  transform-origin: top right;
  top: -50%;
  right: -50%;
}

.text {
  position: relative;
  z-index: 2; /* Set a higher z-index to bring text in front */
  background-color: #f0f0f0;
  font-size: 16px;
  padding: 0 5px; /* Adjust padding to make background visible around the text */
}
</style>
