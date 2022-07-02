import axios from 'axios'
import lunr from 'lunr'

const initialState = () => ({
  cardDict: [],
  filteredList: [],
  filters: {
    inclusive: true,
  },
  order: 'asc',
  searchIndex: null,
});

const getters = {
  GET_CARD_DICT: (thisState) => thisState.cardDict,
  GET_FILTERED_LIST: (thisState) => thisState.filteredList,
  GET_FILTERS: (thisState) => thisState.filters,
  GET_SEARCH_INDEX: (thisState) => thisState.searchIndex,
};

const mutations = {
  SET_CARD_DICT: (thisState, cardDict) => {
    thisState.cardDict = cardDict;
  },
  SET_SEARCH_INDEX: (thisState, searchIndex) => {
    thisState.searchIndex = searchIndex;
  },
  SET_FILTERS: (thisState, newFilters) => {
    thisState.filters = newFilters;
  },
  SET_FILTERED_LIST: (thisState, filteredList) => {
    if (thisState.order === 'desc') {
      filteredList.sort((a, b) => Number(a.muid) - Number(b.muid))

    } else if (thisState.order === 'r') {
      for (let i = filteredList.length - 1; i > 0; i--) {
        // Math.random() - 0.5 will be positive or negative randomly!
        filteredList.sort(() => Math.random() - 0.5);
      }
    } else {
      filteredList.sort((a, b) => Number(b.muid) - Number(a.muid))
    }
    thisState.filteredList = filteredList;
  },
  SET_ORDER: (thisState, order) => {
    thisState.order = order;
  }
};

const actions = {
  FETCH_CARDS: async ({ commit, dispatch }) => {
    let cardDict = {};
    // Gather the JSON from s3
    await axios.get('https://s3.us-east-2.amazonaws.com/com.cdhrec/data.json')
    .then((response) => {
      cardDict = response.data;
    })
    .catch(function (error) {
      console.log('error is', error);
    });
    // remove tokens
    for (let key in cardDict) {
      if (cardDict[key].type.toLowerCase().includes('token')) {
        delete cardDict[key];
      }
    }
    commit('SET_CARD_DICT', cardDict);
    // We will also set the filter to be EVERYTHING as there can be no input yet
    commit('SET_FILTERED_LIST', Object.keys(cardDict).map((c) => cardDict[c]).sort((a, b) => Number(b.muid) - Number(a.muid)));
    // Finally, we build the lunr index for searching
    dispatch('BUILD_INDEX');
  },

  BUILD_INDEX: ({ commit, state }) => {
    commit('SET_SEARCH_INDEX', lunr(function() {
        this.ref('muid')
        this.field('name')
        this.field('text')
        this.field('type')
        this.field('side')
        this.field('status')
        this.field('coloridentity')
      
        state.filteredList.forEach(function (doc) {
          this.add(doc)
        }, this)
      }));
  },

  SET_FILTERS: ({commit, state}, item) => {
    const newFilter = state.filters;
    newFilter[item.key] = item.value;
    console.log('in set ', newFilter, item);
    commit('SET_FILTERS', newFilter);
    // Now use the lunr_index to filter the list
    let query = ''
    for(let [key, value] of Object.entries(newFilter)) {
      // No need to add things that have no value
      if (value && key != 'inclusive') {
        // Color Identity is split out for inclusive and exclusive
        if (key == 'coloridentity') {
          for(let [color, v] of Object.entries(value)) {
            let operator = v ? '+' : '-';
            // For inclusive searches, include only the + colors
            if (newFilter['inclusive'] && v) {
              query = `${operator}${key}:*${color}* ${query}`;
            } else {
              query = `${operator}${key}:*${color}* ${query}`;
            }
          }
        } else {
          query = `+${key}:${value} ${query}`;
        }
      }
    } 

    console.log('The query is ', query);
    const results = state.searchIndex.search(query)
    const newList = results.map((c) => state.cardDict[c.ref])
    console.log('Post filtering, we have', newList);
    commit('SET_FILTERED_LIST', newList);
  },

  SET_ORDER: ({commit, state}, order) => {
    commit('SET_ORDER', order);
    commit('SET_FILTERED_LIST', state.filteredList);
  },
};

export default {
  namespaced: 'cards',
  state: initialState,
  getters,
  mutations,
  actions,
}