// TrafficSignal.ts

// The State interface defines the methods that concrete state classes should implement.
interface State {
  changeSignal(): void;
}

// Concrete state class for the red signal.
class RedSignal implements State {
  constructor(private signal: TrafficSignal) {}

  // Change the signal to yellow and delegate to the traffic signal context object.
  changeSignal(): void {
    console.log("Red signal, stop!");
    this.signal.setState(this.signal.getYellowSignal());
  }
}

// Concrete state class for the yellow signal.
class YellowSignal implements State {
  constructor(private signal: TrafficSignal) {}

  // Change the signal to green and delegate to the traffic signal context object.
  changeSignal(): void {
    console.log("Yellow signal, get ready to go!");
    this.signal.setState(this.signal.getGreenSignal());
  }
}

// Concrete state class for the green signal.
class GreenSignal implements State {
  constructor(private signal: TrafficSignal) {}

  // Change the signal to yellow and delegate to the traffic signal context object.
  changeSignal(): void {
    console.log("Green signal, go!");
    this.signal.setState(this.signal.getYellowSignal());
  }
}

// The TrafficSignal class represents the context object that maintains a reference to the current state.
class TrafficSignal {
  private redSignal: State;
  private yellowSignal: State;
  private greenSignal: State;

  private state: State;

  constructor() {
    // Initialize the concrete state objects and set the initial state to the red signal.
    this.redSignal = new RedSignal(this);
    this.yellowSignal = new YellowSignal(this);
    this.greenSignal = new GreenSignal(this);

    this.state = this.redSignal;
  }

  // Set the current state to the given state.
  public setState(state: State): void {
    this.state = state;
  }

  // Getters for the concrete state objects.
  public getRedSignal(): State {
    return this.redSignal;
  }

  public getYellowSignal(): State {
    return this.yellowSignal;
  }

  public getGreenSignal(): State {
    return this.greenSignal;
  }

  // Delegate the change signal functionality to the current state object.
  public changeSignal(): void {
    this.state.changeSignal();
  }
}

// Usage:
// Create a traffic signal object and change the signal states.
const signal = new TrafficSignal();
signal.changeSignal(); // Output: Red signal, stop!
signal.changeSignal(); // Output: Yellow signal, get ready to go!
signal.changeSignal(); // Output: Green signal, go!
signal.changeSignal(); // Output: Yellow signal, get ready to go!
signal.changeSignal(); // Output: Red signal, stop!
