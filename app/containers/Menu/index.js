import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import Dropdown from 'containers/Dropdown'

import { Container, Hamburger, Nav, StyledButton, StyledLink, StyledA, DropDownItem } from './styles'

import iconSinglePane from 'images/icon-single-pane.svg'
import iconTwoPanes from 'images/icon-split-panes.svg'
import iconHamburger from 'images/icon-hamburger.svg'

export class Menu extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      showDropdown: false
    }
  }

  render () {
    const aboutSelected = this.props.path === 'about'
    const mapSelected = !aboutSelected

    const hideFirst = 3
    let menuItems = [
      <StyledLink to={this.props.homepageLink}>Map</StyledLink>,
      <StyledLink to='/about'>About</StyledLink>,
      ...menuItems
    ]

    return (
      <Container>
        <Hamburger className='toggle-dropdown' onClick={this.toggleDropdown.bind(this)}>
          <img aria-label='Menu' src={iconHamburger} alt='Menu' />
        </Hamburger>
        <Dropdown show={this.state.showDropdown} onHide={this.hideDropdown.bind(this)}>
          {menuItems.map((item, index) => (
            <DropDownItem key={index} className={index < hideFirst ? 'show-on-mobile' : undefined}>
              {item}
            </DropDownItem>
          ))}
        </Dropdown>
        <Nav>
          <StyledButton selected={mapSelected && this.props.paneMode === 'split'} title='Split panes'
            onClick={this.props.splitPaneClick}><img alt='Switch to split pane mode' src={iconTwoPanes} /></StyledButton>
          <StyledButton selected={mapSelected && this.props.paneMode === 'single'} title='Single pane'
            onClick={this.props.singlePaneClick}><img alt='Switch to single pane mode' src={iconSinglePane} /></StyledButton>
          <StyledLink selected={mapSelected} to='/'>Map</StyledLink>
          <StyledLink selected={aboutSelected} to='/about'>About</StyledLink>
        </Nav>
      </Container>
    )
  }

  hideDropdown () {
    this.setState({
      showDropdown: false
    })
  }

  toggleDropdown (event) {
    this.setState({
      showDropdown: !this.state.showDropdown
    })
  }
}

export default Menu
