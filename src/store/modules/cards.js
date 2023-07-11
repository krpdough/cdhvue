import axios from 'axios'
import lunr from 'lunr'

const initialState = () => ({
  cardDict: [],
  filteredList: [],
  filters: {},
  order: 'asc',
  searchIndex: null,
});

const getters = {
  GET_CARD: (thisState, uuid) => thisState.cardDict[uuid],
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
      filteredList.sort((a, b) => Number(a.num) - Number(b.num))

    } else if (thisState.order === 'r') {
      for (let i = filteredList.length - 1; i > 0; i--) {
        // Math.random() - 0.5 will be positive or negative randomly!
        filteredList.sort(() => Math.random() - 0.5);
      }
    } else if (thisState.order === 'decks') {
      filteredList.sort((a, b) => Number(b.deckCount) - Number(a.deckCount))
    } else {
      filteredList.sort((a, b) => Number(b.num) - Number(a.num))
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

    // Grab the decks
    let deckDict = {}
    await axios.get('https://s3.us-east-2.amazonaws.com/com.cdhrec/decks.json')
    .then((response) => {
      deckDict = response.data;
    })
    .catch(function (error) {
      console.log('error is', error);
    });
    
    // Edit the whole data
    const cardDictArray = Object.keys(cardDict);
    for (let key in cardDict) {
      // Hide Tokens
      if (cardDict[key].type.toLowerCase().includes('token')) {
        cardDict[key].hidden = true;
      }
      // Hide CardBacks
      if (cardDict[key].side === 'back') {
        cardDict[key].hidden = true;
      } else if (cardDict[key].reverseRelated) {
        let relatedUuid = cardDictArray.find( uuid => cardDict[uuid].name === cardDict[key].reverseRelated[0]);
        if (relatedUuid) {
          cardDict[key].relatedUuid = relatedUuid;
          cardDict[key].relatedPicUrl = cardDict[relatedUuid].picurl;
        }
        // Currently, this can be overwritten by the partner pairing below. This is intended for now
      }
      if (cardDict[key].related) {
        // Get link partners and hide the secondary
        // First one we find is the main one. Find the other's uuid
        let relatedUuid = cardDictArray.find( uuid => cardDict[uuid].name === cardDict[key].related[0]);
        // May be null due to error or generic tokens that aren't in the XML
        if (relatedUuid) {
          cardDict[relatedUuid].hidden = true;
          cardDict[key].relatedUuid = relatedUuid;
          cardDict[key].relatedPicUrl = cardDict[relatedUuid].picurl;
        } else {
          console.log('Warning - related card not found: ', cardDict[key].name, cardDict[key].related)
        }
      }

      // Add the deck count
      if(deckDict[key]) {
        cardDict[key].deckCount = deckDict[key];
      } else {
        cardDict[key].deckCount = 0;
      }
    }
    commit('SET_CARD_DICT', cardDict);
    // We will also set the filter to be EVERYTHING as there can be no input yet
    commit('SET_FILTERED_LIST', Object.keys(cardDict).map((c) => cardDict[c]).sort((a, b) => Number(b.num) - Number(a.num)));
    // Finally, we build the lunr index for searching
    dispatch('BUILD_INDEX');
  },

  FETCH_SINGLE: async ({ commit }, cardId) => {
    let cardDict = {}
    await axios.get(`https://s3.us-east-2.amazonaws.com/com.cdhrec/cards/${cardId}.json`)
    .then((response) => {
      cardDict = {
        [cardId]: response.data,
      };
    })
    .catch(function (error) {
      console.log('error is', error);
    });
    commit('SET_CARD_DICT', cardDict);
  },

  GENERATE_XML: async () => {
    await axios.post(`https://fu6z6zzz2aoz4c33n2b2i5o5vy0dwqjn.lambda-url.us-east-1.on.aws/`, {}, {
      headers: {
        'content-type': 'text/json',
      }
    })
    .then(() => {
      window.alert("XML Generation Complete")
    })
    .catch(function (error) {
      console.log('error is', error);
    });
  },

  BUILD_INDEX: ({ commit, state }) => {
    commit('SET_SEARCH_INDEX', lunr(function() {
        this.ref('uuid')
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
    commit('SET_FILTERS', newFilter);
    // Now use the lunr_index to filter the list
    let query = ''
    for(let [key, value] of Object.entries(newFilter)) {
      // No need to add things that have no value
      if (value) {
        // Color Identity is split out for inclusive and exclusive
        if (key === 'coloridentity') {
          for(let [color, v] of Object.entries(value)) {
            let operator = v ? '+' : '-';
            query = `${operator}${key}:*${color}* ${query}`;
          }
        } else if (key === 'name') {
          // Give leeway to names
          query = `+${key}:*${value.replaceAll(',', '')}* ${query}`;
        } else {
          let splitValue = value.split(' ');
          splitValue.forEach(term => {
            // query = `+${key}:${term.replace(/[s]$/, '')} ${query}`;
            query = `+${key}:${term.replaceAll(',', '')} ${query}`;
          })
        }
      }
    } 
    const results = state.searchIndex.search(query)
    const newList = results.map((c) => state.cardDict[c.ref])
    commit('SET_FILTERED_LIST', newList);
  },

  SET_ORDER: ({commit, state}, order) => {
    commit('SET_ORDER', order);
    commit('SET_FILTERED_LIST', state.filteredList);
  },

  SEND_UPDATE: async ({commit, state}, card) => {
    await axios.post(`https://ghxbxu4kyne7g5bvx2m6drc2ri0uqyom.lambda-url.us-east-1.on.aws/`, card, {
      headers: {
        'content-type': 'text/json',
      }
    })
    .then((response) => {
      const newDict = state.cardDict
      if (card.method === 'delete') {
        delete newDict[card.card.uuid];
      } else {
        newDict[card.card.uuid] = card.card;
      }
      commit('SET_CARD_DICT', newDict);
      commit('SET_FILTERED_LIST', Object.keys(newDict).map((c) => newDict[c]).sort((a, b) => Number(b.num) - Number(a.num)));
    })
    .catch(function (error) {
      console.log('error is', error);
    });
    
  },
};

export default {
  namespaced: 'cards',
  state: initialState,
  getters,
  mutations,
  actions,
}