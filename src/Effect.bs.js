'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Caml_option = require("bs-platform/lib/js/caml_option.js");

function useReducer(initialState, reducer, interpreter) {
  var match = React.useState((function () {
          return initialState;
        }));
  var setState = match[1];
  var state = match[0];
  var dispatch = function (action) {
    var match = Curry._2(reducer, state, action);
    var nextEffect = match[1];
    var nextState = match[0];
    Curry._1(setState, (function (param) {
            return nextState;
          }));
    if (nextEffect !== undefined) {
      return Curry._2(interpreter, Caml_option.valFromOption(nextEffect), dispatch);
    } else {
      return /* () */0;
    }
  };
  return /* tuple */[
          state,
          dispatch
        ];
}

var Reffect = {
  useReducer: useReducer
};

function incrementComplete(param_0) {
  return /* IncrementComplete */[param_0];
}

function reducer(state, action) {
  if (typeof action === "number") {
    if (action !== 0) {
      return /* tuple */[
              {
                count: state.count + 1 | 0
              },
              undefined
            ];
    } else {
      return /* tuple */[
              state,
              /* Increment */[incrementComplete]
            ];
    }
  } else {
    return /* tuple */[
            {
              count: action[0]
            },
            undefined
          ];
  }
}

function interpreter(effect, dispatch) {
  var incrementComplete = effect[0];
  setTimeout((function (param) {
          return Curry._1(dispatch, Curry._1(incrementComplete, 5));
        }), 1000);
  return /* () */0;
}

function testReducer(param) {
  var match = reducer({
        count: 1
      }, /* IncrementComplete */[2]);
  var match$1 = match[0].count;
  var message = match$1 !== 2 ? "Failed" : "Passed";
  console.log(message);
  return /* () */0;
}

function Effect(Props) {
  var match = useReducer({
        count: 0
      }, reducer, interpreter);
  var dispatch = match[1];
  return React.createElement("div", undefined, React.createElement("button", {
                  onClick: (function (param) {
                      return Curry._1(dispatch, /* SyncIncrement */1);
                    })
                }, "Sync increment"), React.createElement("button", {
                  onClick: (function (param) {
                      return Curry._1(dispatch, /* RequestIncrement */0);
                    })
                }, "Async increment"), String(match[0].count));
}

var requestIncrement = /* RequestIncrement */0;

var syncIncrement = /* SyncIncrement */1;

var make = Effect;

exports.Reffect = Reffect;
exports.requestIncrement = requestIncrement;
exports.syncIncrement = syncIncrement;
exports.incrementComplete = incrementComplete;
exports.reducer = reducer;
exports.interpreter = interpreter;
exports.testReducer = testReducer;
exports.make = make;
/* react Not a pure module */
