import React, { Component } from 'react';

import Pets from '../images/dog-cat.jpeg';
import './Home.css';

export class Home extends Component {

  shelterStaff = [
    {
      name: 'Brandon Leek',
      id: Math.round(Math.random() * 10),
    },
    {
      name: 'Donna Leek',
      id: Math.round(Math.random() * 10),
    },
    {
      name: 'Liz Nye',
      id: Math.round(Math.random() * 10),
    },
    {
      name: 'Brandon Leek',
      id: Math.round(Math.random() * 10),
    },
  ];

  setStaff = () => {
    const mapStaff = this.shelterStaff.map((name, id) => {
      return this.setState({
        staff: mapStaff,
        ...name,
        ...id,
      });
    });
    console.log(this.state.staff);
  };

  render() {
    return (
      <div className="home">
        <header>
          <h1>Welcome to Petful Adoption Center</h1>
          <h4>A free-to-adopt, no-kill shelter for cats & dogs!</h4>
        </header>
        <section>
          <p>
            We have a long-standing policy: all cats and dogs are free to adopt...
          </p>
          <img src={Pets} alt="leopard-cat-border-collie-img" />
          <p>... so what's the catch, you ask? The catch is you must adopt choose the cat or dog that has been here the longest!</p>
          <p>
            You don't have to pay us a dime, but you
            must take who we currently have had in our care for the
            most amount of time This
            policy will never be adjusted, ever, as it would defeat the purpose
            of why this shelter was started in the first place.
          </p>
        </section>
      </div>
    );
  }
}

export default Home;
