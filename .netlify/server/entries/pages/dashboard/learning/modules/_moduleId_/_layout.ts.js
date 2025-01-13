const load = ({ params }) => {
  console.log("LAYOUT LOAD - Module ID:", params.moduleId);
  return {
    moduleId: params.moduleId
  };
};
export {
  load
};
