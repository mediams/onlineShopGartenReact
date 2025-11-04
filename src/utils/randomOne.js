const getRandomIndex = (arr) => {
    return Math.floor(Math.random() * arr.length);
  };
  
  const getRandomOne = (arr, numElements = 1) => {
    if (arr.length < numElements) {
      return arr; 
    }
  
    const result = [];
    while (result.length < numElements) {
      const randomIndex = getRandomIndex(arr);
      const randomElement = arr[randomIndex];
  
     
      if (!result.includes(randomElement)) {
        result.push(randomElement);
      }
    }
  
    return result;
  };
  export default getRandomOne;