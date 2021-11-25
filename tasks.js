/*----------------------------------------------------------------------------------------------------------------
 General Notes
 
 * For all exercises, please prefer readability/expressiveness over maximum algorithmic efficiency.
 
 * You may add any other code such as functions, data structures, etc. that you may want in order to better complete
 an exercise, beyond what is explicitly asked for. Feel free to reuse code for multiple exercises as well.
-----------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------
1) Create a function that takes an array of integers as its lone argument and returns an array containing
 the square of each value in the input.
 
 For example, an input of `[2, 4, 6, 8, 10]` should result in an output of `[4, 16, 36, 64, 100]`.

-----------------------------------------------------------------------------------------------------------------*/

const arr = [2, 4, 6, 8, 10];

const square = (arr) => {
  arr.forEach((element, index, array) => {
    array[index] = element * element;
  });
  return arr;
};

console.log(square(arr));

/*----------------------------------------------------------------------------------------------------------------
 2) Create a function that takes an array of counter objects (see example) as its lone argument and returns
 the sum of all of the counters' `count` properties.
 
 For example, an input of `[{count: 1}, {count: 2}, {count: 3}]` should result in an output of `6`.

-----------------------------------------------------------------------------------------------------------------*/
const counts = [{ count: 1 }, { count: 2 }, { count: 3 }];

const sumOfObjects = (arr) => {
  return arr.map((item) => item.count).reduce((prev, next) => prev + next);
};

console.log(sumOfObjects(counts));

/*----------------------------------------------------------------------------------------------------------------
 3) Create a function that takes an object in the general shape of `movies` (see below) as the first argument,
 and the name of an actor as the second argument. The function should return an object that is equivalent to
 the input, only with the given actor's name included in each movie's `actors` array. If the name is already
 present, it should not be added again. The function should not mutate the input object, or any of its sub-structures.
 
 Note: `movies` is just an example, the function should not assume that the movies in the object will be hard-coded.
 
-----------------------------------------------------------------------------------------------------------------*/
const movies = {
  theGoonies: {
    actors: ['Josh Brolin', 'Corey Feldman', 'Kerri Green'],
  },

  momento: {
    actors: ['Guy Pearce', 'Carrie-Anne Moss'],
  },
};

const isObjHasValue = (obj, value) => {
  const values = Object.values(obj);
  let hasValue = values.includes(value);
  values.forEach((valueEl) => {
    if (typeof valueEl === 'object') {
      hasValue = hasValue || isObjHasValue(valueEl, value);
    }
  });

  if (hasValue === true) {
    const actorObj = {};
    actorObj['actor'] = value;
    return actorObj;
  }
  return hasValue;
};

console.log(isObjHasValue(movies, 'Carrie-Anne Moss'));
console.log(isObjHasValue(movies, 'Ania'));
console.log(isObjHasValue(movies, 'Guy Pearce'));

/*----------------------------------------------------------------------------------------------------------------
    4) Create a procedure that takes an object in the general shape of `movies` as its lone argument and appends
    an unordered list of every actor's name to the DOM's `body` element.
    
    The names in the list should be unique (no actor's name should appear in the list more than once).
    If the list element already exists in the DOM, the procedure should replace the existing list with a new one.
    
    Bonus points if the names are alphabetically sorted :)
   -----------------------------------------------------------------------------------------------------------------*/

const duplicatedMoviesObj = {
  theGoonies: {
    actors: [
      'Josh Brolin',
      'Corey Feldman',
      'Corey Feldman',
      'Kerri Green',
      'Kerri Green',
    ],
  },

  momento: {
    actors: ['Guy Pearce', 'Guy Pearce', 'Carrie-Anne Moss'],
  },
};

const listContainer = document.createElement('ul');
document.querySelector('body').appendChild(listContainer);
const listElement = document.createElement('li');
listContainer.appendChild(listElement);

const convertObjects = (obj) => {
  const filteredData = [];
  for (actors in obj) {
    filteredData.push(obj[actors]);
  }
  return filteredData;
};

const createListInDom = (obj) => {
  const convertedObj = convertObjects(obj);

  const actorsArr = convertedObj.map((item) => {
    return item.actors;
  });

  const uniqueActorsArr = [
    ...new Set([...actorsArr[0], ...actorsArr[1]]),
  ].sort();

  listContainer.innerHTML = `
     ${uniqueActorsArr.map((el) => {
       return `
           <li>actors: ${el}</li>
         `;
     })}
 `;
};

createListInDom(duplicatedMoviesObj);

/*----------------------------------------------------------------------------------------------------------------
   5) Create a procedure that retrieves the data from the REST API endpoint hosted here: https://jsonplaceholder.typicode.com/posts.
   The procedure should then log the id of the first post with a userId of 7 and a title that begins with the letter "e"
   (or undefined if it does not exist). It should also log any potential retrieval errors using `console.error`.
   -----------------------------------------------------------------------------------------------------------------*/
const listUserCont = document.createElement('ul');
document.querySelector('body').appendChild(listUserCont);

const getUser = () => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((json) => {
      const users = json;
      const filteredUsersArray = users.filter((user) => user.userId === 7);
      filteredUsersArray.forEach((el) => {
        const titleFirstChar = el.title.substring(0, 1);
        if (!titleFirstChar.includes('e')) {
          return el;
        }
        listUserCont.innerHTML = ' <li>' + JSON.stringify(el) + '</li> ';
        console.log(el);
      });
    })
    .catch((error) => console.error(error));
};

getUser();
