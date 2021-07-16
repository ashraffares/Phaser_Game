const getNameHandler = () => {
  const name = localStorage.getItem('name');
  return JSON.parse(name);
};

export default getNameHandler;