import * as actionsTypes from "../actions/actions";
const initialState = {
  addInfo: {
    version: 0.1,
    description: "add new spanish and polish word and learn",
  },
  addNewWordCardToggle: false,
  showStatsToggle: false,
  showFilterToggle: false,
  showUserToggle: false,
  //   backDropToggle: false,
  items: [
    {
      spanishWord: "una cerveza",
      spanishWordDescription: "yo quiero una cerveza",
      polishhWord: "piwo",
      polishhWordDescription: "poprosze piwo",
      learnedStatus: 0,
      date: {
        save: "2021-04-24",
        learned: "25.04.2021",
      },
    },
    {
      spanishWord: "el coche",
      spanishWordDescription: "yo no necesito un coche",
      polishhWord: "samochód",
      polishhWordDescription: "nie potrzebuje samochodu",
      learnedStatus: 0,
      date: {
        save: "2021-04-23",
        learned: "24.04.2021",
      },
    },
    {
      spanishWord: "una mesa",
      spanishWordDescription: "el lápiz esta en la mesa",
      polishhWord: "stół",
      polishhWordDescription: "ołówek jest na stole",
      learnedStatus: 0,
      date: {
        save: "2021-04-21",
        learned: "22.04.2021",
      },
    },
    {
      spanishWord: "una mesa2",
      spanishWordDescription: "el lápiz esta en la mesa",
      polishhWord: "stół",
      polishhWordDescription: "ołówek jest na stole",
      learnedStatus: 0,
      date: {
        save: "2021-04-21",
        learned: "22.04.2021",
      },
    },
    {
      spanishWord: "una mesa3",
      spanishWordDescription: "el lápiz esta en la mesa",
      polishhWord: "stół",
      polishhWordDescription: "ołówek jest na stole",
      learnedStatus: 0,
      date: {
        save: "2021-04-21",
        learned: "22.04.2021",
      },
    },
  ],
  currentItemIndex: 0,
  stats: [
    "zapisanych słów : ",
    "zapisanych słów dzisiaj : ",
    "zapisanych słów z ostatnich 5 dni : ",
    "nauczonych słów : ",
    "nauczonych słów dzisiaj : ",
    "nauczonych słów z ostatnich 5 dni : ",
  ],
  selectedStats: 0,
  filter: [
    "wszystkie słowa",
    "słowa do nauczenia",
    "nauczone słowa",
    "dzisiejsze słowa",
    "słowa z ostatnich 5 dni",
  ],
  selectedFilter: 0,
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
        showFilterToggle: false,
        addNewWordCardToggle: false,
        showUserToggle: false,
      };
    case actionsTypes.SHOW_FILTER_TOGGLE:
      return {
        ...state,
        showFilterToggle: !state.showFilterToggle,
        showStatsToggle: false,
        addNewWordCardToggle: false,
        showUserToggle: false,
      };
    case actionsTypes.SHOW_USER_TOGGLE:
      return {
        ...state,
        showUserToggle: !state.showUserToggle,
        showStatsToggle: false,
        addNewWordCardToggle: false,
        showFilterToggle: false,
      };
    case actionsTypes.SELECT_STATS:
      return {
        ...state,
        selectedStats: action.selected,
      };
    case actionsTypes.SELECT_FILTER:
      return {
        ...state,
        selectedFilter: action.selected,
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
      let isLearned = "";
      if (action.status) {
        isLearned = new Date().toISOString().slice(0, 10);
      }

      return {
        ...state,
        items: state.items.map((item, index) =>
          index === action.index
            ? {
                ...item,
                learnedStatus: action.status,
                date: {
                  ...item.date,
                  learned: isLearned,
                },
              }
            : item
        ),
      };
    case actionsTypes.REMOVE_CARD:
      state.items.splice(action.index, 1);
      let newIndex = action.index - 1;
      if (action.index === 0) {
        newIndex = 0;
      }
      return {
        ...state,
        items: [...state.items],
        currentItemIndex: newIndex,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
