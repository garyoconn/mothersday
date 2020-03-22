import React from "react";
import $ from "jquery";

class Particle {
  constructor(svg, coordinates, friction) {
    this.svg = svg;
    this.steps = $(window).height() / 2;
    this.item = null;
    this.friction = friction;
    this.coordinates = coordinates;
    this.position = this.coordinates.y;
    this.dimensions = this.render();
    this.rotation = Math.random() > 0.5 ? "-" : "+";
    this.scale = 1.3 + Math.random();
    this.siner = 200 * Math.random();
  }

  destroy() {
    this.item.remove();
  }

  move() {
    this.position = this.position - this.friction;
    let top = this.position;
    let left =
      this.coordinates.x +
      Math.sin((this.position * Math.PI) / this.steps) * this.siner;
    this.item.css({
      transform:
        "translateX(" +
        left +
        "px) translateY(" +
        top +
        "px) scale(" +
        this.scale +
        ") rotate(" +
        this.rotation +
        (this.position + this.dimensions.height) +
        "deg)"
    });

    if (this.position < -this.dimensions.height) {
      this.destroy();
      return false;
    } else {
      return true;
    }
  }

  render() {
    this.item = $(this.svg, {
      css: {
        transform:
          "translateX(" +
          this.coordinates.x +
          "px) translateY(" +
          this.coordinates.y +
          "px)"
      }
    });
    $("body").append(this.item);
    return {
      width: this.item.width(),
      height: this.item.height()
    };
  }
}

const star =
  '<svg viewBox="0 0 576 512"><path fill="#fcba03" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/></svg>';

const heart =
  '<svg viewBox="0 0 512 512"><path fill="red" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/></svg>';

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const data = [star, heart];

let isPaused = false;
window.onblur = function() {
  isPaused = true;
}.bind(this);
window.onfocus = function() {
  isPaused = false;
}.bind(this);

let particles = [];

setInterval(function() {
  if (!isPaused) {
    particles.push(
      new Particle(
        data[randomInt(0, data.length - 1)],
        {
          x: Math.random() * $(window).width(),
          y: $(window).height()
        },
        1 + Math.random() * 3
      )
    );
  }
}, 200);

function update() {
  particles = particles.filter(function(p) {
    return p.move();
  });
  requestAnimationFrame(update.bind(this));
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "mother",
      siblings: "Bill"
    };
  }

  componentDidMount() {
    update();
    const titles = [
      "mother",
      "mentor",
      "mammy",
      "teacher",
      "mam",
      "hero",
      "mum",
      "friend",
      "ma"
    ];
    let i = 0;
    this.interval = setInterval(() => {
      if (i === 8) i = -1;
      this.setState({ title: titles[++i] });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="App">
        <div class="background"></div>
        <div class="content">
          <h2>Happy mothers day</h2>
          <br />
          <br />
          <br />
          <h3>
            Thanks for being the best <br />
            <strong>{this.state.title}</strong> <br />
            That we could ever ask for.
          </h3>
          <br />
          <h4>
            Much love, <br />
            Bill, Jo, Kate, and Peter.
          </h4>
        </div>
      </div>
    );
  }
}

export default App;
