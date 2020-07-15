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
			allPets: [],
			user: sessionStorage.getItem('user') || null,
			hasError: null,
		};
	}

	componentDidMount() {
		this.getData();
    const setAllPets = getAllPets();
    this.setState({
      allPets: setAllPets
    })
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
  
  startQueue = (ev) => {
    ev.preventDefault();
    const userName = ev.target.user.value;
    const { user, allPets } = this.state;
    if(user) {
      sessionStorage.setItem('user', userName);
      addPerson(userName).then(() => {
        setInterval(() => {
          console.table(allPets);
        }, 5000)
      })
      this.setState({
        user: userName,
        people: [userName]
      })
    }
  }

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

	handleAdopt = (pet) => {
		adoptPet(pet).then(() => {
			const { people, user } = this.state;
			if (people[0] === user) {
				sessionStorage.removeItem('user', user);
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
						<form onClick={(ev) => this.startQueue}>
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
										disabled={!canAdopt}
										onClick={() => this.handleAdopt('dogs')}
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
										disabled={!canAdopt}
										onClick={() => this.handleAdopt('cats')}
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
