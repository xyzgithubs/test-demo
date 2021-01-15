<template>
  <div class="fans-container">
    <!-- 1.准备放echarts容器 -->
    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div ref="main" style="width: 600px; height: 400px"></div>
    <h2>demo</h2>
    <map-demo></map-demo>
  </div>
</template>

<script >
// 2.引入
import echarts from "echarts";
import mapDemo from "./components/mapDemo";
export default {
  components: { mapDemo },
  name: "fansIndex",
  data() {
    return {};
  },
  created() {},
  mounted() {
    // 3.初始化dom要写在mounted
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(this.$refs.main);

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: "ECharts 入门示例",
      },
      tooltip: {},
      legend: {
        data: ["销量"],
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  },
};
</script>

<style>
</style>
