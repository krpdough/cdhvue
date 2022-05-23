import axios from 'axios'
import lunr from 'lunr'
import { XMLParser } from 'fast-xml-parser'

const initialState = () => ({
  cardList: [],
  searchIndex: null,
});

const getters = {
  GET_CARD_LIST: (thisState) => thisState.cardList,
  GET_SEARCH_INDEX: (thisState) => thisState.searchIndex,
};

const mutations = {
  SET_CARD_LIST: (thisState, cardList) => {
    thisState.cardList = cardList;
  },
  SET_SEARCH_INDEX: (thisState, searchIndex) => {
    thisState.cardList = searchIndex;
  },
};

const actions = {
  FETCH_CARDS: async ({ commit }) => {
    let flattenedList = [];
    // Gather the XML from s3
    await axios.get('https://s3.us-east-2.amazonaws.com/com.cdhrec/CDH.Upload.latest.xml')
    .then((response) => {
      // With the XML, parse it into an array of objects
      // The options are needed to get specific parts of the xml
      const parser = new XMLParser({ignoreAttributes: false, attributeNamePrefix: 'a_'});
      const output = parser.parse(response.data)
      // We only really care about the cards, so save those for the next part
      const rawCards = output.cockatrice_carddatabase.cards.card;

      // For lunr, we want a flat list of cards. This is also how we will use them
      // throught the app
      flattenedList = rawCards.filter((raw) => !raw.token)
        .map((raw)=>{
          const flatCard = {
            name: raw.name,
            muid: raw.set.a_muid,
            status: raw.status ? raw.status : 'Playtesting',
            side: raw.prop.side,
            coloridentity: raw.prop.coloridentity,
            type: raw.prop.type,
            text: raw.text,
            pt: raw.pt,
            picurl: raw.set.a_picurl,
          }
          return flatCard;
        });
      flattenedList.sort((a, b) => {
        return Number(b.muid) - Number(a.muid);
      });
    })
    .catch(function (error) {
      console.log('error is', error);
    });
    commit('SET_CARD_LIST', flattenedList);
  },

  BUILD_INDEX: ({ commit, state }) => {
    commit('SET_SEARCH_INDEX', lunr(() => {
      return lunr(function () {
        this.ref('muid')
        this.field('name')
        this.field('text')
        this.field('type')
        this.field('side')
        this.field('coloridentity')
      
        state.cardList.forEach(function (doc) {
          this.add(doc)
        }, this)
      });
    }));
  },
};

export default {
  namespaced: 'cards',
  state: initialState,
  getters,
  mutations,
  actions,
}