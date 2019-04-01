import React, { Component, Fragment } from 'react';
import ResponsiveWrapper from './ResponsiveWrapper';
import Gauge from './Gauge';


class GaugeGraph extends Component {
  constructor(props){
    super(props);    
    const {parentWidth, parentHeight, data} = this.props;
    this.state = {
      data: data,
      width: Math.max(parentWidth, 500),
      height: 500
    };
  };  
  componentWillReceiveProps(nextProps){    
    const {parentWidth, parentHeight, data} = nextProps;
    this.setState({
      data: data,
      width: Math.max(parentWidth, 500),
      height: 500
    }); 
  }
  
  render() {
    return (
      <Fragment>
        <Gauge data={this.state.data} width={this.state.width} height={this.state.height} />
      </Fragment>
    );
  }
}

export default ResponsiveWrapper(GaugeGraph);
