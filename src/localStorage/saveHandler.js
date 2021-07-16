const saveHandler = (name) => {
  localStorage.setItem('name', JSON.stringify(name));
  return true;
};

export default saveHandler;