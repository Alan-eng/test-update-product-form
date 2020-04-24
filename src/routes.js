import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Main from './components/Main/Main'
import ProductsContainer from './components/Products/ProductsContainer'
import ProductFormContainer from './components/Forms/ProductFormContainer'
import NotFound from './components/NotFound/NotFound'

export function getRoutes() {
  return (
    <HashRouter>
      <Main>
        <Switch>
          {/* <Route
            exact
            path="/update"
            render={(props) => <ProductFormContainer {...props} isAuthed={true} />}
          /> */}
          <Route exact path="/update" component={ProductFormContainer} />,
          <Route exact path="/create" component={ProductFormContainer} />,
          <Route exact path="/" component={ProductsContainer} />,
          <Route path="*" component={NotFound}/>,
        </Switch>
      </Main>
    </HashRouter >
  )
}

export default getRoutes
