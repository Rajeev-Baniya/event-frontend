import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  place: undefined,
  date: undefined,
  people: undefined,
  price: undefined,
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      //   console.log(action.payload);
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);
  return (
    <SearchContext.Provider
      value={{
        place: state.place,
        date: state.date,
        people: state.people,
        price: state.price,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
