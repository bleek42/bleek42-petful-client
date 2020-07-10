// import React, { Component } from 'react';
// import { getNextPets, adoptDog, adoptCat } from '../components/APIService';

// export class Pet extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       pets: [],
//       hasError: null,
//     };
//   }

//   async componentDidMount() {
//     try {
//       const nextPets = await getNextPets();
//       this.setState({
//         pets: nextPets,
//       });
//     } catch (err) {
//       this.setState({
//         hasError: true,
//       });
//     }
//   }

//   handleAdopt = async (ev) => {
//     ev.preventDefault();
//     try {
//       const dog = await adoptDog();
//       const cat = await adoptCat();
//     } catch (error) {
//       this.setState({
//         hasError: true,
//       });
//     }
//   };

//   render() {
//     const { pets } = this.state;
//     return (
//       <div>
//         <h1>Next Dog</h1>
//         <ul>
//           {Object.entries(pets).map((type) => {
//             console.table(type[1]);
//             const { cat, dog } = type[1];
//             return (
//               <div>
//                 <details>
//                   <img src={cat.imageURL} alt={cat.description} />
//                   <ul>
//                     <li>{cat.name}</li>
//                     <li>{cat.breed}</li>
//                     <li>{cat.gender}</li>
//                   </ul>
//                   <p>{cat.story}</p>
//                 </details>
//                 <details>
//                   <img src={dog.imageURL} alt={dog.description} />
//                   <ul>
//                     <li>{dog.name}</li>
//                     <li>{dog.breed}</li>
//                     <li>{dog.gender}</li>
//                   </ul>
//                   <p>{dog.story}</p>
//                 </details>
//               </div>
//             );
//           })}
//         </ul>
//       </div>
//     );
//   }
// }

// export default Pet;
