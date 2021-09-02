
import types from "./actionTypes";

export interface State {
  
}

const initialState: State = {

};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {  
    
    default:
      return state;
  }
};

export { initialState, reducer };
