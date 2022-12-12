import HomePage from './lib/routes/HomePage.svelte'
import RandomPage from './lib/routes/RandomPage.svelte'
import ReleasePage from './lib/routes/ReleasePage.svelte'

const routes = [
  {
    name: `/`,
    component: HomePage
  },
  {
    name: `/release/:id`,
    component: ReleasePage
  },
  {
    name: `/random`,
    component: RandomPage
  }
]

export default routes
