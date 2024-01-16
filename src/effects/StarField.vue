<template>
    <canvas id="starfield" ref="starfield"></canvas>
</template>

<script>
export default {
  name: 'StarField',
  data: function() {
    return {
      particles: [],
      bgColor: '#060a17',
      // 4:3:2
      // red:blue:yellow
      starColors: [
        {
          center: '#cfc54a',
          outline: '#cfaf4a',
        },
        {
          center: '#cfc54a',
          outline: '#cfaf4a',
        },
        {
          center: '#86232a',
          outline: '#721e24',
        },
        {
          center: '#86232a',
          outline: '#721e24',
        },
        {
          center: '#86232a',
          outline: '#721e24',
        },
        {
          center: '#86232a',
          outline: '#721e24',
        },
        {
          center: '#9fb7ff',
          outline: '#b3c6ff',
        },
        {
          center: '#9fb7ff',
          outline: '#b3c6ff',
        },
        {
          center: '#9fb7ff',
          outline: '#b3c6ff',
        },
      ],
      maxParticles: 240,
      numGridX: 12,
      numGridY: 20,
      particleAlphaFadeIn: 15,
      particleAlphaFadeOut: 12,
      particleDelayMax: 2,
      particleTimerMax: 100,
      particleTimerMin: 8,
      drawMs: 100, // Rate at which to draw animated background
      debug: false,
    };
  },
  methods: {
    drawStar: function(context, point, alpha = 1) {
      // Fade in alpha compensation
      if (point.delay < this.particleAlphaFadeIn && point.delay > 0) {
        alpha = 1 / point.delay;
      } else if (point.timer <= this.particleAlphaFadeOut) {
        // Fade out alpha compensation
        alpha =
          point.timer * (1 / Math.abs(this.particleAlphaFadeOut - point.timer));
        if (alpha > 1) {
          alpha = 1;
        }
      }

      // Circle
      context.globalAlpha = alpha;
      context.beginPath();
      context.lineWidth = 1;
      context.strokeStyle = point.colors.outline;
      context.fillStyle = point.colors.center;
      context.arc(point.x, point.y, 2, 0, 2 * Math.PI);
      context.fill();
      context.stroke();

      // Starburst
      context.beginPath();
      context.lineWidth = 1;
      context.moveTo(point.x, point.y);
      const maxStarburstLen = 2;
      context.lineTo(
        point.x + Math.floor(Math.random() * maxStarburstLen + 1),
        point.y + Math.floor(Math.random() * maxStarburstLen + 1),
      );
      context.lineTo(
        point.x - Math.floor(Math.random() * maxStarburstLen + 1),
        point.y - Math.floor(Math.random() * maxStarburstLen + 1),
      );
      context.moveTo(point.x, point.y);
      context.lineTo(
        point.x + Math.floor(Math.random() * maxStarburstLen + 1),
        point.y - Math.floor(Math.random() * maxStarburstLen + 1),
      );
      context.lineTo(
        point.x - Math.floor(Math.random() * maxStarburstLen + 1),
        point.y + Math.floor(Math.random() * maxStarburstLen + 1),
      );
      context.fill();
      context.stroke();
    },
    checkPoint: function(point) {
      // Check the point to ensure it doesn't occupy
      // the same grid square bounds as another point
      if (this.squareOccupied(point.square)) {
        return false;
      }
      return true;
    },
    fillParticles: function(canvas) {
      while (this.particles.length < this.maxParticles) {
        const clrIdx = Math.floor(Math.random() * this.starColors.length);
        const point = {
          x: Math.floor(Math.floor(Math.random() * canvas.width)),
          y: Math.floor(Math.floor(Math.random() * canvas.height)),
          timer: Math.floor(
            Math.random() * (this.particleTimerMax - this.particleTimerMin) +
              this.particleTimerMin +
              1,
          ),
          delay: Math.floor(Math.random() * this.particleDelayMax + 1),
          square: { x: 0, y: 0 }, // filled next,
          colors: this.starColors[clrIdx],
        };
        point.square = this.getSquare(point, canvas);
        if (this.checkPoint(point, canvas)) {
          this.particles.push(point);
        }
      }
    },
    squareOccupied: function(square) {
      for (const particle of this.particles) {
        if (particle.square.x == square.x && particle.square.y == square.y) {
          return true;
        }
      }
    },
    getSquare: function(point, canvas) {
      // Divide into grid
      const widthOfSquare = Math.floor(canvas.width / this.numGridX);
      const heightOfSquare = Math.floor(canvas.height / this.numGridY);

      // For each grid square, check if x and y are greater than
      // widthOfSquare*squareIndex AND less than widthOfSquare*squareIndex+widthOfSquare
      // If so, return this grid square
      for (let x = 0; x < this.numGridX; x++) {
        for (let y = 0; y < this.numGridY; y++) {
          if (
            point.x >= widthOfSquare * x &&
            point.y >= heightOfSquare * y &&
            point.x < widthOfSquare * x + widthOfSquare &&
            point.y < heightOfSquare * y + heightOfSquare
          ) {
            return { x, y };
          }
        }
      }
      return { x: 0, y: 0 };
    },
    drawGridlines: function(canvas, context) {
      const widthOfSquare = Math.floor(canvas.width / this.numGridX);
      const heightOfSquare = Math.floor(canvas.height / this.numGridY);

      for (let x = 0; x < this.numGridX; x++) {
        context.strokeStyle = 'white';
        context.moveTo(widthOfSquare * x, 0);
        context.lineTo(widthOfSquare * x, canvas.height);
        context.stroke();
        context.fill();
      }

      for (let y = 0; y < this.numGridY; y++) {
        context.strokeStyle = 'white';
        context.moveTo(0, heightOfSquare * y);
        context.lineTo(canvas.width, heightOfSquare * y);
        context.stroke();
        context.fill();
      }
    },
    resizeHandler: function() {
      this.$refs.starfield.width = this.$refs.starfield.clientWidth;
      this.$refs.starfield.height = document.body.scrollHeight;
    },
    animate: function() {
      const canvas = this.$refs.starfield;
      const context = canvas.getContext('2d');

      canvas.height = canvas.clientHeight;
      canvas.width = canvas.clientWidth;

      context.fillStyle = this.bgColor;
      context.fillRect(0, 0, canvas.width, canvas.height);

      if (this.debug) {
        this.drawGridlines(canvas, context);
      }

      if (this.particles.length > this.maxParticles) {
        this.particles = this.particles.slice(0, this.maxParticles);
      } else {
        this.fillParticles(canvas);
      }

      const newParticles = [];
      for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].delay = this.particles[i].delay - 1;
        if (
          this.particles[i].delay < this.particleAlphaFadeIn &&
          this.particles[i].delay > 0
        ) {
          this.drawStar(context, this.particles[i]);
          newParticles.push(this.particles[i]);
        } else if (this.particles[i].delay <= 0) {
          this.particles[i].delay = 0; // Prevent unbound negatives
          this.particles[i].timer = this.particles[i].timer - 1;
          if (this.particles[i].timer > 0) {
            this.drawStar(context, this.particles[i]);
            newParticles.push(this.particles[i]);
          }
        }
      }
      this.particles = newParticles;

      setTimeout(() => {
        window.requestAnimationFrame(this.animate);
      }, this.drawMs);
    },
  },
  created() {
    window.addEventListener('resize', this.resizeHandler);
  },
  unmounted() {
    window.removeEventListener('resize', this.resizeHandler);
  },
  mounted() {
    this.resizeHandler();
    window.requestAnimationFrame(this.animate);
  },
};
</script>

<style scoped>
#starfield {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  z-index: -1;
  width: 100%;
  height: auto;
  min-height: 100%;
}
</style>
