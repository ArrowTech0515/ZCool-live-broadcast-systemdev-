<script setup lang="ts">

const props = defineProps({
  gaugeValue: {
    type: Number,
    default: 0,
  }
})

const center = ref('60%')

const centerStyle = computed(() => ({
  top: center.value,
  left: center.value,
  transform: 'translate(-50%, -50%)',
}))

const pointerStyle = computed(() => {
  const angle = (props.gaugeValue % 101) * 270 / 100 - 135
  return {
    transform: `rotate(${angle}deg)`,
    transformOrigin: 'bottom center',
    position: 'absolute',
    width: '3px',
    height: '45px',
    backgroundColor: '#1890ff',
    top: `calc(${center.value} - 45px)`,
    left: center.value,
  }
})

function getLabelStyle(n) {
  const angle = (n - 1) * 270 / 10 + 135
  const rad = (angle * Math.PI) / 180
  const radius = 40
  return {
    left: `calc(${center.value} + ${radius * Math.cos(rad)}px)`,
    top: `calc(${center.value} + ${radius * Math.sin(rad)}px)`,
  }
}

function getTickStyle(n) {
  const angle = n * 270 / 100 + 135
  const rad = (angle * Math.PI) / 180
  const outerRadius = 50
  const innerRadius = outerRadius - (n % 10 === 0 ? 2 : 1)
  
  return {
    left: `calc(${center.value} + ${innerRadius * Math.cos(rad)}px)`,
    top: `calc(${center.value} + ${innerRadius * Math.sin(rad)}px)`,
    width: `${outerRadius - innerRadius}px`,
    height: '1px',
    transform: `rotate(${angle}deg) translateX(-50%)`,
  }
}

</script>

<template>
  <div class="gauge-container">
    <a-progress
      type="dashboard"
      :percent="props.gaugeValue % 101"
      :gap-degree="70"
      :stroke-width="7"
      :format="() => ''"
      stroke-color="#1890ff"
    />
    <div class="gauge-labels">
      <span v-for="n in 11" :key="n" class="gauge-number" :style="getLabelStyle(n)">
        {{ (n - 1) * 10 }}
      </span>
    </div>
    <div class="gauge-graduations">
      <span v-for="n in 51" :key="n" class="gauge-tick" :style="getTickStyle((n - 1) * 2)"></span>
    </div>
    <!-- <div class="gauge-center-circle" :style="centerStyle"></div> -->
    <div class="gauge-center-text" :style="centerStyle">
      <div style="font-size: 9px;">综合评分</div>
      <div class="gauge-score">{{ props.gaugeValue % 101 }}分</div>
    </div>
    <div class="gauge-pointer_div">
      <span class="gauge-pointer_span" :style="pointerStyle"></span>
    </div>
  </div>
</template>

<style>

/* Gauge Styles */
.gauge-container {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto;
}

.progress-wrapper {
  width: 100px; /* Reduce the size of a-progress */
  height: 100px; /* Maintain aspect ratio */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.gauge-labels {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.gauge-number {
  position: absolute;
  font-size: 6px;
  transform: translate(-50%, -50%);
}

.gauge-graduations {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.gauge-tick {
  position: absolute;
  background-color: #1890ff;
  transform-origin: left center;
}

.gauge-center-text {
  position: absolute;
  text-align: center;
  margin-top: 5px;
  font-size: 10px;
  z-index: 2;
}

.gauge-score {
  font-size: 14px;
  margin-top: 8px;
  font-weight: bold;
}

.gauge-pointer_div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  pointer-events: none;
}

.gauge-pointer_span {
  position: absolute;
  transform-origin: bottom center;
  width: 2px;
  height: 45px;
  background-color: #1890ff;
}
</style>