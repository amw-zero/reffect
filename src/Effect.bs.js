'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var CamlinternalOO = require("bs-platform/lib/js/camlinternalOO.js");

function useReducer(initialState, reducer, interpreter) {
  var match = React.useState((function () {
          return initialState;
        }));
  return /* tuple */[
          match[0],
          match[1]
        ];
}

var Reffect = {
  useReducer: useReducer
};

function incrementComplete(param_0) {
  return /* IncrementComplete */[param_0];
}

function reducer(state, action) {
  if (action) {
    return /* tuple */[
            {
              count: action[0]
            },
            undefined
          ];
  } else {
    return /* tuple */[
            state,
            /* Increment */[incrementComplete]
          ];
  }
}

function interpreter(state, effect) {
  var incrementComplete = effect[0];
  return setTimeout((function (param) {
                reducer(state, Curry._1(incrementComplete, 5));
                return /* () */0;
              }), 2000);
}

var class_tables = /* Cons */[
  0,
  0,
  0
];

function testReducer(param) {
  if (!class_tables[0]) {
    var $$class = CamlinternalOO.create_table(0);
    var env = CamlinternalOO.new_variable($$class, "");
    var env_init = function (env$1) {
      var self = CamlinternalOO.create_object_opt(0, $$class);
      self[env] = env$1;
      return self;
    };
    CamlinternalOO.init_class($$class);
    class_tables[0] = env_init;
  }
  return Curry._1(class_tables[0], 0);
}

function Effect(Props) {
  var match = useReducer({
        count: 0
      }, reducer, interpreter);
  return React.createElement("div", undefined, String(match[0].count));
}

var requestIncrement = /* RequestIncrement */0;

var make = Effect;

exports.Reffect = Reffect;
exports.requestIncrement = requestIncrement;
exports.incrementComplete = incrementComplete;
exports.reducer = reducer;
exports.interpreter = interpreter;
exports.testReducer = testReducer;
exports.make = make;
/* react Not a pure module */
