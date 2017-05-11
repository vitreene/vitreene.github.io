import React , { PropTypes } from "react"
import Page from "../Page"
import PortfolioSujets from '../../components/PortfolioSujets'
import TransitionPage from "../../components/TransitionPage"

const PortfolioPage = (props) => {
    return (
        <TransitionPage transition="fade" myKey="portfolio">
            <Page { ...props } key={props.head.title}>
                <PortfolioSujets  { ...props }  />
            </Page>
        </TransitionPage>
    );
}

PortfolioPage.propTypes = {
  head: PropTypes.object,
};

export default PortfolioPage