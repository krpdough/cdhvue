import axios from 'axios'
import lunr from 'lunr'
import Vue from 'vue'
import Vuex from 'vuex'
import { XMLParser } from 'fast-xml-parser'
// import { search } from 'core-js/fn/symbol'

Vue.use(Vuex)

export default new Vuex.Store({
  state () {
    return {
      cards: ['hello'],
      searchIndex: null,
    }
  },
  mutations: {
    async fetchCards (state) {
      // Gather the XML from s3
      await axios.get('https://com.cdhrec.s3.amazonaws.com/CDH.Upload.latest.xml')
      .then((response) => {
        // With the XML, parse it into an array of objects
        // The options are needed to get specific parts of the xml
        const parser = new XMLParser({ignoreAttributes: false, attributeNamePrefix: 'a_'});
        const output = parser.parse(response.data)
        // We only really care about the cards, so save those for the next part
        const rawCards = output.cockatrice_carddatabase.cards.card;

        // For lunr, we want a flat list of cards. This is also how we will use them
        // throught the app
        const flattenedList = rawCards.filter((raw) => !raw.token)
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
              picurl: raw.set.picurl,
            }
            return flatCard;
          });

        state.searchIndex = lunr(() => {
          return lunr(function () {
            this.ref('muid')
            this.field('name')
            this.field('text')
            this.field('type')
            this.field('side')
            this.field('coloridentity')
          
            state.cards.forEach(function (doc) {
              this.add(doc)
            }, this)
          });
        });
        state.cards = flattenedList;
      })
      .catch(function (error) {
        console.log('error is', error);
      });
    }
  }
});

