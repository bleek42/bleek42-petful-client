import React, { Component } from 'react';

import {
    getPeople,
    addPerson,
    getAllPets,
    getNextPets,
  adoptPet,
  deletePerson,
} from './APIService';
import './Adopt.css';

class Adopt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pets: [],
            people: [],
            staff: [],
            allPets: [],
            user: '',
            hasError: null,
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        try {
            const petData = await getNextPets();
      const peopleData = await getPeople();
      const setAllPets = await getAllPets();
            this.setState({
                pets: petData,
        people: peopleData,
        allPets: setAllPets
      });
        } catch (error) {
            this.setState({
                hasError: true,
            });
        }
  };
  
  startQueue = (ev) => {
    ev.preventDefault();
    const userName = ev.target.user.value;
    const { user, people, allPets } = this.state;
    if(user) {
      addPerson(userName).then((userName) => {
        this.getData().then((data) => {
            this.interval = setInterval((data) => {
                let num = Math.floor((Math.random() * 2));
                if(num === 1) {
                    adoptPet('dog');
                    deletePerson(people[0]);
                } else {
                    adoptPet('cat');
                    deletePerson(people[0])
                }
                this.setState({
                    user: userName,
                    people: data.people,
                    pets: data.pets,
                    allPets: data.allPets
                })
            })
        })
      })
    }
  }

  componentWillUnmount() {
    const { user, people } = this.state;
    if(user === people[0]) {
      clearInterval(this.interval);
    }
  }

    handleAdopt = (pet) => {
        adoptPet(pet).then(() => {
            const { people, user } = this.state;
            if (people[0] === user) {
                this.setState({
                    user: null,
                });
            }
            this.getData();
        });
    };

    render() {
        const { pets, people, user, hasError } = this.state;
        const canAdopt = (!people.length && user) || people[0] === user;
        console.log(user);
        console.table(pets.currentPets);
        console.log(user);
        if (hasError === true) {
            return (
                <div className="error">
                    <h4>Uh-oh!</h4>
                    <p>
                        Looks like something went wrong... Please refresh! If the problem
                        persists, please contact a staff member.
                    </p>
                </div>
            );
        }
        return (
            <div className="adopt-page">
                <header className="adopt-header">
                    <h1>Welcome to the adoption page!</h1>
                </header>
                <section className="people-queue">
                    <ul>
                        {Object.values(people).map((person) => (
                            <li key={person}>{person}</li>
                        ))}
                    </ul>
                    {!user ? (
                        <form onClick={() => this.startQueue}>
                            <label htmlFor="user">Enter name to get in line</label>
                            <input type="text" name="user" />
                            <button disabled={user}>Submit</button>
                        </form>
                    ) : (
                        ''
                    )}
                </section>
                <section className="pet-queue">
                    {Object.entries(pets).map((type) => {
                        const { cat, dog } = type[1];
                        console.table(type);
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
                                    <button
                                        
                                        onClick={() => this.handleAdopt('dog')}
                                    >
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
