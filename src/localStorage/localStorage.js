export const saveHandler = (name) => {
  localStorage.setItem('name', JSON.stringify(name));
  return true;
};

export default saveHandler;

export const getNameHandler = () => {
  const name = localStorage.getItem('name');
  return JSON.parse(name);
};
