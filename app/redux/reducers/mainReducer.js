
const initialState = {
 
};

export default function MainReducer(state = initialState, action) {
  // console.log('branding reducer action is---',action);
  const { type, payload } = action;
  switch (type) {
    

    default:
      return {
        ...state,
      };
  }
}
