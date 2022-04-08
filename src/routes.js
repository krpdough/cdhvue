import ViewCard from './components/ViewCard/ViewCard.vue';
import CommmanderList from './components/CommanderList/CommanderList.vue';
import DeckRec from './components/DeckRec.vue';
import Faq from './components/Faq.vue';

export const routes=[
  {path: '/card/:id', component: ViewCard},
  {path: '/reccomend/', component: DeckRec},
  {path: '/faq/', component: Faq},
  {path: '/', component: CommmanderList},
];