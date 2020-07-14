import React, { Component } from 'react';

import {
  getPeople,
  addPerson,
  getAllPets,
  getNextPets,
  adoptPet,
} from './APIService';
import './Adopt.css';

class Adopt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: [],
      people: [],
      staff: [],
      user: sessionStorage.getItem('user-name') || null,
      hasError: null,
    };
  }

  componentDidMount() {
    this.getData();
    this.interval = setInterval(() => {
      const { user, people } = this.state;
      if (!people.length || !user) {
        return;
      }
      if (people[0] === user && people.length < 5) {
        this.demoUsers();
      } else if (people[0] !== user && people.length > 1) {
        this.handleQueue();
      }
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getData = async () => {
    try {
      const petData = await getNextPets();
      const peopleData = await getPeople();
      this.setState({
        pets: petData,
        people: peopleData,
      });
    } catch (error) {
      this.setState({
        hasError: true,
      });
    }
  };

  handleAdopt = (pet) => {
    adoptPet(pet).then(() => {
      const { people, user } = this.state;
      if (people[0] === user) {
        sessionStorage.removeItem('user-name');
        this.setState({
          user: null,
        });
      }
      this.getData();
    });
  };

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

  handleQueue = () => {
    const { pets } = this.state;
    const types = Object.entries(pets).filter(([pet, types]) => pet !== null);
    if(types.length === 0) {
      return;
    }
    const petAdopted = types[Math.floor(Math.random() * types.length)][0];
    this.handleAdopt(petAdopted);
  };

  demoUsers = () => {
    const person = this.shelterStaff[this.state.people.length - 1];
    addPerson(person).then(() => {
      this.getData();
    });
  };

  handleAddPerson = (ev) => {
    ev.preventDefault();
    const userName = ev.target.user.value;
    addPerson(userName).then(() => {
      sessionStorage.setItem('user-name', userName);
      this.setState({
        user: userName,
      });
      this.getData();
    });
  };

  render() {
    const { pets, people, user, staff, hasError } = this.state;
    const canAdopt = (!people.length && user) || people[0] === user;
    if(hasError === true) {
      return (
        <div className="error">
          <h4>Uh-oh!</h4>
      <p>Looks like something went wrong... Please refresh! If the problem persists, please contact { staff }</p>
        </div>
      )
    }
    return (
      <div className="adopt-page">
        <header className="adopt-header">
          <h1>Welcome to the adoption page!</h1>
        </header>
        <section className="people-queue">
          <ul>
            {Object.entries(people).map((person) => (
              <li key={person}>{person}</li>
            ))}
            {!user ? (
              <li>
                <form onSubmit={() => this.handleAddPerson}>
                  <label htmlFor="user">Enter name to get in line</label>
                  <input type="text" name="user" />
                  <button>Submit</button>
                </form>
              </li>
            ) : (
              ''
            )}
          </ul>
        </section>

        <section className="pet-queue">
          {Object.entries(pets).map((type) => {
            const { cat, dog } = type[1];
            return (
              <div className="adopt">
                <h4>Click details arrow to see our next dog!</h4>
                <details className="dogs">
                  <img src={dog.imageURL} alt={dog.description} />
                  <ul>
                    <li>Name - {dog.name}</li>
                    <li>Breed - {dog.breed}</li>
                    <li>Gender - {dog.gender}</li>
                  </ul>
                  <p>{dog.story}</p>
                  <button onClick={() => this.handleAdopt('dog')}>
                    Adopt this Dog!
                  </button>
                </details>
                <h4>Click details arrow to see our next cat!</h4>
                <details className="cats">
                  <img src={cat.imageURL} alt={cat.description} />
                  <ul>
                    <li>{cat.name}</li>
                    <li>{cat.breed}</li>
                    <li>{cat.gender}</li>
                  </ul>
                  <p>{cat.story}</p>
                  <button
                    disabled={!canAdopt}
                    onClick={() => this.handleAdopt('cat')}
                  >
                    Adopt this Cat!
                  </button>
                </details>
              </div>
            );
          })}
        </section>
      </div>
    );
  }
}

export default Adopt;
