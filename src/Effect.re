[@bs.val] external setTimeout: (unit => unit, int) => float = "setTimeout";

module Reffect {
  let useReducer = (initialState, reducer, interpreter) => {
    let (state, setState) = React.useState(() => initialState);

    (state, setState)
    // let dispatch = (action) => {
    //   let (nextState, nextEffect) = reducer(state, action)
    //   setState(nextState);
    //   interpreter(nextEffect, dispatch);
    // };

    // (state, dispatch)
  };
};

type state = { count: int };

[@bs.deriving accessors]
type action =
  | RequestIncrement
  | IncrementComplete(int);

type effect =
  | Increment((int) => action);

let reducer = (state: state, action: action): (state, option(effect)) => {
  switch(action) {
  | RequestIncrement => (state, Some(Increment(incrementComplete)))
  | IncrementComplete(count) => ({ count: count }, None);
  };
};

let interpreter = (state, effect) => {
  switch(effect) {
  | Increment(incrementComplete) => 
    setTimeout(() => ignore(reducer(state, incrementComplete(5))), 2_000)
  };
};

let testReducer = () => {

};

[@react.component]
let make = () => {
  let (state, dispatch) = Reffect.useReducer({ count: 0 }, reducer, interpreter);

  <div>
    <button onClick={_ => dispatch(RequestIncrement)} />
    {React.string(string_of_int(state.count))}
  </div>
};