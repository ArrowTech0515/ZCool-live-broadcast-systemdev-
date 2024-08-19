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
    <div class="gauge-center-circle" :style="centerStyle"></div>
    <div class="gauge-center-text" :style="centerStyle">
      <!-- <div>综合评分</div>
      <div class="gauge-score">{{ gaugeValue }}分</div> -->
    </div>
    <div class="gauge-pointer" :style="[pointerStyle, centerStyle]"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gaugeValue: 30,
      center: '30%', // Variable for centering components
    };
  },
  computed: {
    // pointerStyle() {
    //   const angle = ((this.gaugeValue / 100) * 270) - 135; // Map gaugeValue to the correct angle
    //   return {
    //     transform: `rotate(${angle}deg) translateX(-50%)`, // Apply rotation based on the calculated angle
    //     transformOrigin: '50% 0%', // Rotate around the correct point (bottom center of the pointer)
    //     height: '15%', // Adjust height if necessary for better visual alignment
    //   };
    // },
    pointerStyle() {
  const baseAngle = ((this.gaugeValue / 100) * 270) - 135; // Calculate the base angle based on gaugeValue
  const angle = baseAngle + 60; // Rotate the pointer by an additional 60 degrees
  return {
    transform: `rotate(${angle}deg) translate(-50%, -30px)`, // Rotate and translate the pointer up by 30px
    transformOrigin: '50% 100%', // Ensure the pointer rotates around its base (bottom center)
    height: '15%', // Keep the height consistent
  };
},

    centerStyle() {
      return {
        top: this.center, // Use the center variable for top position
        left: this.center, // Use the center variable for left position
        transform: 'translate(-50%, -50%)', // Center the element
      };
    },
  },
  methods: {
    getLabelStyle(n) {
      const angle = (n - 1) * 270 / 10 + 135; // Map position to the angle within 180 degrees
      const rad = (angle * Math.PI) / 180;
      const radius = 40; // Radius of the labels
      return {
        left: `calc(${this.center} + ${radius * Math.cos(rad)}px)`,
        top: `calc(${this.center} + ${radius * Math.sin(rad)}px)`,
      };
    },
    getTickStyle(n) {
      const angle = n * 270 / 100 + 135; // Map position to the angle within 180 degrees
      const rad = (angle * Math.PI) / 180;
      const outerRadius = 50; // Outer radius for tick end
      const innerRadius = outerRadius - (n % 10 === 0 ? 2 : 1); // Length varies for major/minor ticks

      return {
        left: `calc(${this.center} + ${innerRadius * Math.cos(rad)}px)`,
        top: `calc(${this.center} + ${innerRadius * Math.sin(rad)}px)`,
        width: `${outerRadius - innerRadius}px`,
        height: '1px', // Horizontal tick
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
  width: 10px;
  height: 10px;
  background-color: transparent; /* Make the background transparent */
  border: 3px solid #1890ff; /* Add a border to create a ring */
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

.gauge-pointer {
  position: absolute;
  width: 2px;
  height: 15%;
  background-color: #1890ff;
  transform-origin: 50% 100%; /* Rotate around the bottom center */
  z-index: 0;
}
</style>
