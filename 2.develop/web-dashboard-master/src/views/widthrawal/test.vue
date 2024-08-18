<template>
  <div class="gauge-container">
    <a-progress
      type="dashboard"
      :percent="value"
      :gap-degree="30"
      :stroke-width="12"
      :width="200"
      :format="() => ''"
      stroke-color="#1890ff"
    />
    <div class="gauge-labels">
      <span v-for="n in 11" :key="n" class="gauge-number" :style="getLabelStyle(n)">
        {{ (n - 1) * 10 }}
      </span>
    </div>
    <div class="gauge-graduations">
      <span v-for="n in 101" :key="n" class="gauge-tick" :style="getTickStyle(n)"></span>
    </div>
    <div class="gauge-center-circle"></div>
    <div class="gauge-center-text">
      <div>综合评分</div>
      <div class="gauge-score">{{ value }}分</div>
    </div>
    <div class="gauge-pointer" :style="pointerStyle"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 74,
    };
  },
  computed: {
    pointerStyle() {
      const angle = (this.value / 100) * 240 - 120; // Map value to the angle
      return {
        transform: `rotate(${angle}deg)`,
      };
    },
  },
  methods: {
    getLabelStyle(n) {
      const angle = (n - 1) * 24 - 120; // Map position to the angle
      const rad = (angle * Math.PI) / 180;
      const radius = 90; // Radius of the labels
      return {
        left: `${100 + radius * Math.cos(rad)}px`,
        top: `${100 + radius * Math.sin(rad)}px`,
      };
    },
    getTickStyle(n) {
      const angle = (n - 1) * 2.4 - 120; // Map position to the angle
      const rad = (angle * Math.PI) / 180;
      const outerRadius = 95; // Outer radius for tick end
      const innerRadius = outerRadius - (n % 10 === 1 ? 10 : 5); // Length varies for major/minor ticks

      return {
        left: `${100 + innerRadius * Math.cos(rad)}px`,
        top: `${100 + innerRadius * Math.sin(rad)}px`,
        width: `${outerRadius - innerRadius}px`,
        height: '2px', // Horizontal tick
        transform: `rotate(${angle}deg) translateX(-50%)`,
      };
    },
  },
};
</script>

<style scoped>
.gauge-container {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
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
  font-size: 12px;
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
  background-color: #000;
  transform-origin: left center;
}

.gauge-center-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 14px;
  height: 14px;
  background-color: transparent; /* Make the background transparent */
  border: 2px solid #1890ff; /* Add a border to create a ring */
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.gauge-center-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 16px;
  z-index: 2;
}

.gauge-score {
  font-size: 24px;
  font-weight: bold;
}

.gauge-pointer {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 50%;
  background-color: #1890ff;
  transform-origin: bottom center;
  transform: rotate(-120deg);
  z-index: 0;
}
</style>
