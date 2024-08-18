<template>
  <div class="report-container">
    <div class="flow-line">
      <div class="circle">
        <CheckCircleFilled  style="color: #52c41a;"/>
      </div>
      <div class="dashed-line"></div>
      <div class="circle">
        <CheckCircleFilled  style="color: #52c41a;"/>
      </div>
      <div class="dashed-line"></div>
      <div >
        <CheckCircleFilled  style="color: #52c41a;"/>
      </div>
    </div>   
  </div>
</template>

<script>
export default {
  name: 'SummaryReport',
}
</script>

<style scoped>
.report-container {
  display: flex;
}

.flow-line {
  position: relative;
  width: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
  margin-right: 20px;
}

.dashed-line {
  width: 2px;
  background-color: transparent;
  height: 100px;
  border-left: 2px dashed #52c41a;
  margin-bottom: 5px;
}
</style>
