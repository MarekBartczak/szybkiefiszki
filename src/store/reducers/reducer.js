import * as actionsTypes from "../actions/actions";
const initialState = {
  addInfo: {
    version: 0.1,
    description: "add new spanish and polish word and learn",
  },
  addNewWordCardToggle: false,
  showStatsToggle: false,
  //   backDropToggle: false,
  items: [
    {
      spanishWord: "una cerveza",
      spanishWordDescription: "yo quiero una cerveza",
      polishhWord: "piwo",
      polishhWordDescription: "poprosze piwo",
      learnedStatus: 0,
    },
    {
      spanishWord: "el coche",
      spanishWordDescription: "yo no necesito un coche",
      polishhWord: "samochód",
      polishhWordDescription: "nie potrzebuje samochodu",
      learnedStatus: 0,
    },
    {
      spanishWord: "una mesa",
      spanishWordDescription: "el lápiz esta en la mesa",
      polishhWord: "stół",
      polishhWordDescription: "ołówek jest na stole",
      learnedStatus: 0,
    },
  ],
  currentItemIndex: 0,
  stats: [
    "zapisanych słów : ",
    "zapisanych słów dzisiaj : ",
    "zapisanych słów [ostatnie 5 dni] : ",
    "nauczonych słów : ",
    "nauczonych słów dzisiaj : ",
    "nauczonych słów [ostatnie 5 dni] : ",
  ],
  selectedStats: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.SHOW_ALL:
      return {
        ...state,
      };
    case actionsTypes.ADD_NEW_WORD_CARD_TOGGLE:
      return {
        ...state,
        addNewWordCardToggle: !state.addNewWordCardToggle,
      };
    case actionsTypes.SHOW_STATS_TOGGLE:
      return {
        ...state,
        showStatsToggle: !state.showStatsToggle,
      };
    case actionsTypes.SELECT_STATS:
      return {
        ...state,
        selectedStats: action.selected,
      };

    case actionsTypes.SAVE_WORD:
      return {
        ...state,
        items: [...state.items, action.word],
      };
    case actionsTypes.CHANGE_CARD:
      return {
        ...state,
        currentItemIndex: action.index,
      };
    case actionsTypes.SWITCH_LEARN_STATUS:
      return {
        ...state,
        items: state.items.map((item, index) =>
          index === action.index
            ? {
                ...item,
                learnedStatus: action.status,
              }
            : item
        ),
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
