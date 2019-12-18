import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import TableData from '../components/table';
import SelectMetric from '../components/metrics';
import HeatMap from '../components/heatmap';
import { 
  requestEvents, 
  requestEventsDaily, 
  requestEventsHourly, 
  requestStats, 
  requestStatsDaily, 
  requestStatsHourly,
  requestPoi, 
  setSearchField,
  setStartTime,
  setEndTime
} from '../actions';
import { Grid, Menu, Segment, Container, Input, Dimmer, Loader } from 'semantic-ui-react'

const mapStateToProps = state => {
  return {
    searchField: state.searchData.searchField,

    startTime : state.requestTime.startTime,
    endTime : state.requestTime.endTime,

    events: state.requestData.events,
    eventsHourly: state.requestData.events_hourly,
    eventsDaily: state.requestData.events_daily,

    stats: state.requestData.stats,
    statsHourly: state.requestData.stats_hourly,
    statsDaily: state.requestData.stats_daily,

    poi: state.requestData.poi,

    isPending: state.requestData.isPending
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSearch: (e) => dispatch(setSearchField(e.target.value)),
    onStartTime: (e) => dispatch(setStartTime(e.target.value)),
    onEndTime: (e) => dispatch(setEndTime(e.target.value)),
  
    onStatsRequest: () => dispatch(requestStats()),
    onStatsHourlyRequest: () => dispatch(requestStatsHourly()),
    onStatsDailyRequest: () => dispatch(requestStatsDaily()),

    onEventsRequest: () => dispatch(requestEvents()),
    onEventsHourlyRequest: () => dispatch(requestEventsHourly()),
    onEventsDailyRequest: () => dispatch(requestEventsDaily()),

    onPoiRequest: () => dispatch(requestPoi())
  }
}


class App extends React.Component {

  constructor(){
    super()
    this.state = { 
      activeItem: 'Stats',
      geoDisplay: 0,
      searchBy: '',
    }
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name, searchBy: '' })
  }

  handleMetricClick = (e, {value}) => {
    if(this.state.activeItem !== 'Geo Visualization'){
      this.setState({ searchBy: value });
    }else{
      this.setState({ geoDisplay: value === '' ? 0 : value })
    }
  }


  componentDidMount(){
    this.props.onStatsRequest();
    this.props.onStatsDailyRequest();
    this.props.onStatsHourlyRequest();
    this.props.onEventsRequest();
    this.props.onEventsDailyRequest();
    this.props.onEventsHourlyRequest();
    this.props.onPoiRequest();
  }
  
  render() {
    const {
      stats,
      statsDaily,
      statsHourly, 
      events, 
      eventsDaily,
      eventsHourly,
      isPending,
      onSearch,
      // onStartTime,
      // onEndTime,
      poi, 
      searchField,
      // startTime,
      // endTime
      
    } = this.props

    const { activeItem, searchBy, geoDisplay } = this.state

    // console.log(Date.parse('2'))

    let tableInfo = stats;
    switch (activeItem){

      case 'Stats':
        tableInfo = stats; 
        break;
      case 'Daily Stats':
          tableInfo = statsDaily;
          break;
      case 'Hourly Stats':
        tableInfo = statsHourly;
        break;
      case 'Events':
        tableInfo = events; 
        break;
      case 'Daily Events':
        tableInfo = eventsDaily;
        break;
      case 'Hourly Events':
        tableInfo = eventsHourly;
        break;

      default:
        tableInfo = [];
        break;

    }

    const removeKey = ['date', 'hour']
    if(!isPending){

      /*
        1. Get metrics to toggle in dropdown menu.
        2. Filter data based on selected metrics and searched item.
        3. Calculate intensity for geo visualization data.
        4. Filter geo visualization data based on date range.
      */

      //['key', 'key' ....]
      let toggle = (tableInfo.length > 0 & activeItem !== 'Geo Visualization') ? Object.keys(tableInfo[0]).filter(val => !removeKey.includes(val)) : [];
      if(activeItem === 'Geo Visualization') toggle = ['revenue', 'clicks', 'impressions', 'events'];

      const filteredTableData = tableInfo.filter(obj => {
        // searchBy is an index received from the dropdown metrics menu
        if(searchBy !== ''){
          return obj[toggle[searchBy]].toString().includes(searchField)
        }
        return Object.values(obj).some((val, i) => val.toString().includes(searchField))
      } );

      
      let geoData;
      const show = toggle[geoDisplay];
      if(show !== 'events'){
        geoData = [0,0,0,0];
  // eslint-disable-next-line
        stats.map( obj => {
          geoData[obj.poi_id-1] += parseInt(1)
        });
        
      }else{
        geoData = [0,0,0,0];
  // eslint-disable-next-line
        events.map( obj => {
          geoData[obj.poi_id-1] += obj.events
        });
      }

      
      return(
        <div className="App">
          <h1>EQ Works Sample Problem</h1>
          <Container>
            <Grid>

              <Grid.Column width={4}>
                <Menu fluid vertical tabular>

                  <Menu.Item name='Stats' active={activeItem === 'Stats'} onClick={this.handleItemClick} />
                  <Menu.Item name='Daily Stats' active={activeItem === 'Daily Stats'} onClick={this.handleItemClick} />
                  <Menu.Item name='Hourly Stats' active={activeItem === 'Hourly Stats'} onClick={this.handleItemClick} />
                  <Menu.Item name='Events' active={activeItem === 'Events'} onClick={this.handleItemClick} />
                  <Menu.Item name='Daily Events' active={activeItem === 'Daily Events'} onClick={this.handleItemClick} />
                  <Menu.Item name='Hourly Events' active={activeItem === 'Hourly Events'} onClick={this.handleItemClick} />
                  <Menu.Item name='Geo Visualization' active={activeItem === 'Geo Visualization'} onClick={this.handleItemClick} />

                  <Menu.Item>
                    <Input icon='search' placeholder='Search...' onChange={onSearch} />
                  </Menu.Item>
                  <Menu.Item>
                    <SelectMetric toggle={toggle} onSelect={this.handleMetricClick}/> {/* Display metrics based on selected data */}
                  </Menu.Item>
                </Menu>
              </Grid.Column>

              <Grid.Column stretched width={12}>
                { activeItem !=='Geo Visualization' ? 
                  <Segment style={{overflow: 'auto', maxHeight: 700, }}>
                    <TableData data={filteredTableData} mark={searchField}/> {/* Display data with tableData component */}
                  </Segment> 
                : <Segment style={{ maxHeight: 700 }}>
                    <HeatMap data={geoData} poi={poi} show={toggle[geoDisplay]}/> { /* Display HeatMap */}
                  </Segment>
                }
              </Grid.Column>

            </Grid>
          </Container>
        </div>
      );

    }

    return(
      <div>
        <Segment style = {{ height: 700}}>
          <Dimmer active inverted>
            <Loader inverted content='Fetching Data' />
          </Dimmer>
        </Segment>
      </div>
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
