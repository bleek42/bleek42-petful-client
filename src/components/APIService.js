import config from './config';

const getNextPets = async () => {
  try {
    const res = await fetch(`${config.API_URL}/pets/next`);
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error({
      message:
        'something went wrong! please refresh or contact an administrator.',
    });
  }
};

const getAllPets = async () => {
  try {
    const res = await fetch(`${config.API_URL}/pets/all`);
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error({
      message:
        'something went wrong! please refresh or contact an administrator.',
    });
  }
};

const adoptPet = async (type) => {
  try {
    const req = {
      method: 'DELETE',
      body: JSON.stringify({ type }),
      headers: {
        'content-type': 'application/json',
      },
    };
    const res = await fetch(`${config.API_URL}/pets/select`, req);
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error({
      message:
        'something went wrong! please refresh or contact an administrator.',
    });
  }
};

// const adoptCat = async () => {
//   try {
//     const req = {
//       method: 'DELETE',
//       body: JSON.stringify('cat'),
//       headers: {
//         'content-type': 'application/json',
//       },
//     };
//     const res = await fetch(`${config.API_URL}/pets/cat`, req);
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     throw new Error({
//       message:
//         'something went wrong! please refresh or contact an administrator.',
//     });
//   }
// };

const getPeople = async () => {
  try {
    const res = await fetch(`${config.API_URL}/people`);
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error({
      message:
        'something went wrong! please refresh or contact an administrator.',
    });
  }
};

const addPerson = async (newPerson) => {
  try {
    const person = {
      name: newPerson,
    };
    const req = {
      method: 'POST',
      body: JSON.stringify(person),
      headers: {
        'content-type': 'application/json',
      },
    };
    const res = await fetch(`${config.API_URL}/people`, req);
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error({
      message:
        'something went wrong! please refresh or contact an administrator.',
    });
  }
};

export { getNextPets, adoptPet, getAllPets, getPeople, addPerson };
