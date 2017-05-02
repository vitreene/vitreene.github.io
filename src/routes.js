import React from "react"
import { Route } from "react-router"
import { PageContainer as PhenomicPageContainer } from "phenomic"

import AppContainer from "./AppContainer"
import Page from "./layouts/Page"
import PageError from "./layouts/PageError"
import Homepage from "./layouts/Homepage"
import Post from "./layouts/Post"
import PortfolioPage from "./layouts/PortfolioPage"
import Portfolios from "./layouts/Portfolios"
import ContactPage from "./layouts/ContactPage"
import Articles from "./layouts/Articles"

const PageContainer = (props) => (
  <PhenomicPageContainer
      { ...props }
      layouts={{
          Page,
          PageError,
          Homepage,
          Post,
          PortfolioPage,
          ContactPage,
          Articles,
          Portfolios,
      }}
  />
)

export default (
  <Route component={ AppContainer }>
      <Route path="*" component={ PageContainer } />
  </Route>
)
