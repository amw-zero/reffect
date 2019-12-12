[@bs.val] external setTimeout: (unit => unit, int) => float = "setTimeout";

module Reffect {
  let useReducer = (initialState: 's, reducer: ('s, 'a) => ('s, option('e)), interpreter: ('e, ('a) => unit) => unit): ('s, ('a) => unit) => {
    let (state, setState) = React.useState(() => initialState);

    let rec dispatch = (action: 'a): unit => {
      let (nextState, nextEffect) = reducer(state, action)
      setState(_ => nextState);
      switch(nextEffect) {
        | Some(effect) => interpreter(effect, dispatch);
        | None => ()
      };
    };

    (state, dispatch)
  };
};

type state = { count: int };

[@bs.deriving accessors]
type action =
  | RequestIncrement
  | SyncIncrement
  | IncrementComplete(int);

type effect =
  | Increment((int) => action);  

let reducer = (state: state, action: action): (state, option(effect)) => {
  switch(action) {
  | RequestIncrement => (state, Some(Increment(incrementComplete)))
  | SyncIncrement => ({ count: state.count + 1}, None)
  | IncrementComplete(count) =>
    ({ count: count }, None);
  };
};

let interpreter = (effect, dispatch: ('a) => unit): unit => {
  switch(effect) {
  | Increment(incrementComplete) =>
    let _ = setTimeout(() => 
      incrementComplete(5)->dispatch,
      1_000
    );
  };
};

let testReducer = () => {
  let state = { count: 1 };
  let (nextState, _) = reducer(state, IncrementComplete(2));

  let message = 
    switch(nextState.count) {
    | 2 => "Passed"
    | _ => "Failed"
    };

  Js.log(message);
};

[@react.component]
let make = () => {
  let (state, dispatch) = Reffect.useReducer({ count: 0 }, reducer, interpreter);

  <div>
    <button onClick={_ => dispatch(SyncIncrement)}>{React.string("Sync increment")}</button>  
    <button onClick={_ => dispatch(RequestIncrement)}>{React.string("Async increment")}</button>
    {React.string(string_of_int(state.count))}
  </div>
};