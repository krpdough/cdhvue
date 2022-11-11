import ViewCard from './components/ViewCard/ViewCard.vue';
import CommmanderList from './components/CommanderList/CommanderList.vue';
import EditCardList from './components/EditCards/EditCardList.vue';
import EditCard from './components/EditCards/EditCard.vue';
import DeckRec from './components/DeckRec.vue';
import Faq from './components/Faq.vue';

export const routes=[
  {path: '/', component: CommmanderList},
  {path: '/card/:id', component: ViewCard},
  {path: '/reccomend/', component: DeckRec},
  {path: '/faq/', component: Faq},
  {path: '/edit/', component: EditCardList},
  {path: '/edit/:id', component: EditCard},
];