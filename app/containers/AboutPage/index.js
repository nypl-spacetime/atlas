import React from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import Table from 'components/Table'
import Page from 'components/Page'
import Footer from 'components/Footer'

import knightFoundation from 'images/knight-foundation.png'

export class AboutPage extends React.Component {
  render () {
    return (
      <div>
        <Page>
          <Helmet title='About' />
          <h2>About Atlas</h2>

          <h2>Concepts</h2>
          <p>
            spacetime-graph, objects, concepts
          </p>

          <h2>Data</h2>
          <p>
            point to data, not city directories
          </p>

          <h2>Acknowledgements</h2>
          <p>
            Atlas is part of the <a href='http://spacetime.nypl.org/'>NYC Space/Time
            Directory</a>. The goal of this project is to&mdash;through a
            variety of resources&mdash;unlock the potential of historical maps and provide
            opportunities to explore urban history across space and time.
          </p>
          <p>
            Major support for the NYC Space/Time Directory is provided by
            the <a href='http://www.knightfoundation.org/grants/6715'>Knight News Challenge</a>,
            an initiative of the <a href='http://www.knightfoundation.org/'>John S. and James
            L. Knight Foundation</a>.
          </p>
          <p>
            <img src={knightFoundation} alt='Knight Foundation Logo' style={{width: '50%', opacity: 0.88}} />
          </p>
          <h2>Accessibility</h2>
          <p>
            If you encounter any accessibility shortfalls when using Atlas, or would like to provide other
            feedback, please email <a href='mailto:spacetime@nypl.org'>spacetime@nypl.org</a> or
            call <a href='tel:9172756975'>917-275-6975</a> (TTY <a href='tel:2129300020'>212-930-0020</a>).
          </p>
          <p>
            To learn more about the accessibility of NYPL websites and mobile applications, see
            our <a href='https://www.nypl.org/policies/web-mobile-accessibility'>Web & Mobile Accessibility Policy</a>.
          </p>
        </Page>
        <Footer />
      </div>
    )
  }
}

export default AboutPage
