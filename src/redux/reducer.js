const initialState = {
  news: [],
  newsLoadingStatus: "sam",
  filters: [],
  filterLoadingStatus: "sam",
  activeFilter: "all",
  filteredNews: [],
}

export default function reducer (state = initialState, action){
  switch (action.type) {
    case "NEWS_FETCHING":
      return {
        ...state,
        newsLoadingStatus: "loading",
      };

    case "NEWS_FETCHED":
      return {
        ...state,
        news: action.payload,
        filteredNews:
          state.activeFilter === "all"
            ? action.payload
            : action.payload.filter((s) => s.category === state.activeFilter),
        newsLoadingStatus: "sam",
      };

    case "NEWS_FETCHNING_ERROR":
      return {
        ...state,
        newsLoadingStatus: "error",
      };

    case "NEWS_CREATED":
      const newCreatedNewList = [...state.news, action.payload];
      return {
        ...state,
        news: newCreatedNewList,
        filteredNews:
          state.activeFilter === "all" ? newCreatedNewList : newCreatedNewList.filter(s => s.category === state.activeFilter)
      };

    case "FILTERS_FETCHING":
      return {
        ...state,
        filterLoadingStatus: "loading",
      };

    case "FILTERS_FETCHED":
      return {
        ...state,
        filters: action.payload,
        filterLoadingStatus: "sam",
      };

    case "FILTERS_FETCHING_ERROR":
      return {
        ...state,
        filterLoadingStatus: "error",
      };

    case "ACTIVE_FILTER_CHANGED":
      return{
        ...state,
        activeFilter: action.payload,
        filteredNews: action.payload === 'all' ? state.news : state.news.filter(s => s.category === action.payload)

      }

    case "NEWS_DELETED":
      const newNewsList = state.news.filter(s => s.id !== action.payload);
    return {
      ...state,
      news: newNewsList,
      filteredNews: state.activeFilter === "all" ? newNewsList : newNewsList.filter(s => s.category === state.activeFilter)
    };

    default:
      return state;
  }
}