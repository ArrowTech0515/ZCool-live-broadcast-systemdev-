<template>
  <div class="gauge-container">
    <a-progress
      type="dashboard"
      :percent="gaugeValue"
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
      <div>综合评分</div>
      <div class="gauge-score">{{ gaugeValue }}分</div>
    </div>
    <div class="gauge-pointer_div">
      <span class="gauge-pointer_span" :style="pointerStyle"></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gaugeValue: 10,
      center: '30%', // Center the gauge correctly
    };
  },
  computed: {
    centerStyle() {
      return {
        top: this.center,
        left: this.center,
        transform: 'translate(-50%, -50%)',
      };
    },
    pointerStyle() {
      const angle = this.gaugeValue * 270 / 100 - 135; // Correctly map gaugeValue to the angle
      return {
        transform: `rotate(${angle}deg)`,
        transformOrigin: 'bottom center',
        position: 'absolute',
        width: '2px',
        height: '45px',
        backgroundColor: '#1890ff',
        top: `calc(${this.center} - 45px)`,
        left: this.center,
      };
    },
  },
  methods: {
    getLabelStyle(n) {
      const angle = (n - 1) * 270 / 10 + 135;
      const rad = (angle * Math.PI) / 180;
      const radius = 40;
      return {
        left: `calc(${this.center} + ${radius * Math.cos(rad)}px)`,
        top: `calc(${this.center} + ${radius * Math.sin(rad)}px)`,
      };
    },
    getTickStyle(n) {
      const angle = n * 270 / 100 + 135;
      const rad = (angle * Math.PI) / 180;
      const outerRadius = 50;
      const innerRadius = outerRadius - (n % 10 === 0 ? 2 : 1);

      return {
        left: `calc(${this.center} + ${innerRadius * Math.cos(rad)}px)`,
        top: `calc(${this.center} + ${innerRadius * Math.sin(rad)}px)`,
        width: `${outerRadius - innerRadius}px`,
        height: '1px',
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
  background-color: #000;
  transform-origin: left center;
}

.gauge-center-circle {
  position: absolute;
  width: 9px;
  height: 9px;
  background-color: transparent;
  border: solid 3px #1890ff;
  border-radius: 50%;
  z-index: 1;
}

.gauge-center-text {
  position: absolute;
  text-align: center;
  font-size: 10px;
  z-index: 2;
}

.gauge-score {
  font-size: 16px;
  font-weight: bold;
}

.gauge-pointer_div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  pointer-events: none; /* Prevent interaction with the pointer */
}

.gauge-pointer_span {
  position: absolute;
  transform-origin: bottom center;
  width: 2px;
  height: 45px;
  background-color: #1890ff;
}
</style>
