import React, { Component } from 'react'
import { withRouter } from 'react-router-dom' //need this for history.push
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Container, Dropdown, Menu, } from 'semantic-ui-react'

import { refreshUserState } from '../actions';

class TopNavBarLayout extends Component {

  componentDidMount() {
    // in case the page gets reloaded, need to load in user state from db again
    this.props.refreshUserState();
  }

  handleClickSignOut = e => {
    sessionStorage.clear();
    this.props.history.push('/');
  }

  render() {
    const black = { color: 'black' }

    return (
      <div>
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item header>
              <Link to='/'>PicMe</Link>
            </Menu.Item>

            <Dropdown item openOnFocus simple text='Pictures'>
              <Dropdown.Menu>
                <Dropdown.Item><Link style={black} to='/upload'>Upload</Link></Dropdown.Item>
                <Dropdown.Item><Link style={black} to='/browse'>Browse</Link></Dropdown.Item>
                <Dropdown.Item><Link style={black} to='/uploads'>My Uploads</Link></Dropdown.Item>
                <Dropdown.Item><Link style={black} to='/collection'>My Collection</Link></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item header>
              <Link to='/billing'>Billing</Link>
            </Menu.Item>
            <Menu.Item header>
              <Link to='/settings'>Settings</Link>
            </Menu.Item>
            <Menu.Item header onClick={this.handleClickSignOut}>
              Sign Out
            </Menu.Item>
            <Menu.Item position="right" header>
              Credits: {this.props.credits} 
            </Menu.Item>
            <Menu.Item position="right" header>
              Hi, {this.props.first_name + ' ' + this.props.last_name} 
            </Menu.Item>
          </Container>
        </Menu>

        <Container textAlign='left' style={{ marginTop: '7em' }}>
          {this.props.children}
        </Container>
      </div>
    );
  }
}

// export default withRouter(TopNavBarLayout);

const mapStateToProps = state => {
  return {
    first_name: state.first_name,
    last_name: state.last_name,
    email: state.email,
    nicknames: state.nickname,
    credits: state.credits
  }
}

export default connect(mapStateToProps, { refreshUserState })(withRouter(TopNavBarLayout));
