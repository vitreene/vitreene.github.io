import React , { PropTypes } from "react"
import Page from "../Page"
import PortfolioSujets from '../../components/PortfolioSujets'
import TransitionPage from "../../components/TransitionPage"

const PortfolioPage = (props) => {

    return (
        <TransitionPage transition="fade">
            <Page { ...props }>
                <PortfolioSujets  { ...props } key={props.head.title} />
            </Page>
        </TransitionPage>
) ;}


PortfolioPage.propTypes = {
  head: PropTypes.object,
  };

export default PortfolioPage
