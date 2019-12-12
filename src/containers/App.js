import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import TableData from '../components/table';
import {requestEvents, requestStats} from '../actions';
import { Grid, Menu, Segment, Container, Input } from 'semantic-ui-react'

const mapStateToProps = state => {
  return {
    events: state.events,
    stats: state.stats
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onStatsRequest: () => dispatch(requestStats()),
    onEventsRequest: () => dispatch(requestEvents())
  }
}

class App extends React.Component {

  constructor(){
    super()
    this.state = { activeItem: 'Stats' }
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  componentDidMount(){
    this.props.onStatsRequest();
    this.props.onEventsRequest();
  }
  

  render() {
    const { activeItem } = this.state

    let tableInfo = this.props.stats;
    switch (activeItem){

      case 'Stats':
        tableInfo = this.props.stats; 
        break;
      case 'Events':
        tableInfo = this.props.events; 
        break;
      default:
        break;

    }

    if(this.props.stats.length & this.props.events.length){

      return(
        <div className="App">
          <h1>EQ Works Sample Problem</h1>
          <Container>
            <Grid>

              <Grid.Column width={4}>
                <Menu fluid vertical tabular>
                  <Menu.Item name='Stats' active={activeItem === 'Stats'} onClick={this.handleItemClick} />
                  <Menu.Item name='Events' active={activeItem === 'Events'} onClick={this.handleItemClick} />
                  <Menu.Item>
                    <Input icon='search' placeholder='Search...' />
                  </Menu.Item>
                </Menu>
              </Grid.Column>

              <Grid.Column stretched width={12}>
                <Segment style={{overflow: 'auto', maxHeight: 700, }}>
                  <TableData data={tableInfo}/>
                </Segment>
              </Grid.Column>

            </Grid>
          </Container>
        </div>
      );

    }

    return(
      <div>
        <h1>...Loading</h1>
      </div>
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
