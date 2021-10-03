<template>
  <div class="traffic-light">
    <div class="light red" :class="{active:this.state === 1}"></div>
    <div class="light yellow" :class="{active:[0,2].includes(this.state)}"></div>
    <div class="light green" :class="{active:this.state === 3}"></div>
  </div>
</template>

<script>
export default {
  name: "TrafficLight",
  props: ["color"],

  data: () => ({
    state: -1,
    colors: [
      { name: 'yellow', interval: 300, next: 1 },
      { name: 'red', interval: 1000, next: 2 },
      { name: 'yellow', interval: 300, next: 3 },
      { name: 'green', interval: 1500, next: 0 },
    ]
  }),
  methods: {
    switcher() {
      this.state = this.colors[this.state].next;
      this.$router.push({name: 'Home', params: { color: this.colors[this.state].name}});
    }
  },
  mounted() {
    if (this.color == 'red')
      this.state = 1;
    else if (this.color == 'yellow')
      this.state = 2;
    else if (this.color == 'green')
      this.state = 3;
    else
      this.state = 0;
  },
  updated() {
    setTimeout(this.switcher, this.colors[this.state].interval);
  }
}
</script>

<style scoped>
.traffic-light {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 30px;
  border: 1px solid black;
  padding: 10px;
}

.light {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  border: 1px solid black;
  opacity: 0.3;
}

.red {
  background-color: red;
}

.yellow {
  background-color: yellow;
}

.green {
  background-color: green;
}

.active {
  opacity: 1;
}
</style>