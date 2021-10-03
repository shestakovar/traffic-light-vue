<template>
  <div class="traffic-light">
    <div class="light red" :class="{active:this.state === 1}"></div>
    <div class="light yellow" :class="{active:[0,2].includes(this.state)}"></div>
    <div class="light green" :class="{active:this.state === 3 && isBlinking}"></div>
    <div>{{ timeLeft / 1000 }} секунд</div>
  </div>
</template>

<script>
export default {
  name: "TrafficLight",
  props: ["color"],
  data: () => ({
    isBlinking: true,
    state: -1,
    timeLeft: 0,
    colors: [
      { name: 'yellow', interval: 3000, next: 1 },
      { name: 'red', interval: 10000, next: 2 },
      { name: 'yellow', interval: 3000, next: 3 },
      { name: 'green', interval: 15000, next: 0 },
    ]
  }),
  methods: {
    switcher() {
      this.isBlinking = true;
      this.state = this.colors[this.state].next;
      this.timeLeft = this.colors[this.state].interval;
      this.startTimer();
      this.$router.push({ name: 'Home', params: { color: this.colors[this.state].name } });
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.timeLeft = this.timeLeft - 1000;
      }, 1000);
    },
    startBlinking() {
      this.blinking = setInterval(() => {
        this.isBlinking = !this.isBlinking;
      }, 500);
    },
    stopTimer() {
      clearTimeout(this.timer);
    },
    stopBlinking() {
      clearTimeout(this.blinking);
    },
  },
  created() {
    if (this.color == 'red')
      this.state = 1;
    else if (this.color == 'yellow')
      this.state = 2;
    else
      this.state = 3;
    if (this.$route.path != `/${this.colors[this.state].name}`) this.$router.push({ name: 'Home', params: { color: this.colors[this.state].name } });
  },
  mounted() {
    this.timeLeft = this.colors[this.state].interval;
    this.startTimer();
  },
  watch: {
    timeLeft(time) {
      if (time === 3000) {
        this.startBlinking();
      }
      if (time === 0) {
        this.stopTimer();
        this.stopBlinking();
        this.switcher();
      }
    }
  },
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