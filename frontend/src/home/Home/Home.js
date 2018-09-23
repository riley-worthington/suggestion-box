import React, {Component} from 'react';
import TopNav from '../TopNav/TopNav';
import SideBar from '../SideBar/SideBar';
import Post from '../Post/Post';
import './Home.css';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user
    }
  }

  handleAddGroup() {
    console.log('Adding group')
  }

  render() {
    const { user, onRouteChange, isSignedIn } = this.props
    console.log(this.state.user);

    return (
      <div className='home-container'>
        <TopNav onRouteChange={onRouteChange} user={user}/>
        <main>
          <SideBar groups={this.state.user.groups}/>
          <div>
            <Post id={2}/>
          </div>
        </main>
      </div>
    );
  }
}

export default Home;
