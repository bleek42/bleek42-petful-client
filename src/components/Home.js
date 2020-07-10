import React, { Component } from 'react';

export class Home extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Welcome to Petful Adoption Center</h1>
          <p>Home of the "FF" animal adoption policy!</p>
        </header>
        <section>
          <p>
            The "FF" policy stands for Free but you must take First the cat or
            dog (whichever it happens to be) that's been here the longest!
          </p>
          <p>
            That's right, our policy is you don't have to pay us a dime, but you
            must take whatever animal we currently have had in our care for the
            most amount of time. I hope you don't have a strong preference! This
            policy will never be adjusted, ever, as it would defeat the purpose
            of why this shelter was started in the first place.
          </p>
        </section>
      </div>
    );
  }
}

export default Home;
