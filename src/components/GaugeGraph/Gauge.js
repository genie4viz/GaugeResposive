import React, {
    Component
} from 'react';
import * as d3 from "d3";


class Gauge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: this.props.width,
            height: this.props.height,
            data: this.props.data
        }
    }
    componentWillReceiveProps(nextProps) {        
        this.setState({
            width: nextProps.width,
            height: nextProps.height,
            data: nextProps.data
        });
    }
    componentDidMount() {
        this.drawChart();
    }
    componentDidUpdate() {
        this.drawChart();
    }
    drawChart() {
        const { width, height, data} = this.state;
        let svgDimen = {width: width * 0.8, height: height * 0.8},
            rateSize = Math.min(svgDimen.width, svgDimen.height),
            n = 100,
            base_radius = rateSize * 0.5,
            pi = Math.PI,            
            base_endAngle =  pi * 2 / 3,
            base_startAngle = -base_endAngle,
            base_field = d3.range(base_startAngle, base_endAngle, (pi * 4 / 3) / n),
            base_scale = d3.scaleLinear().domain([0, n]).range([base_startAngle, base_endAngle]),
            linearColor = d3.scaleLinear().range(["red", "yellow", "green"]).domain([0, n/2, n]),
            //inner guage
            endAngle = base_endAngle,
            startAngle = base_startAngle,
            radius = base_radius * 13 / 15,
            field = d3.range(base_startAngle, base_endAngle, (pi * 4 / 3) / n),
            scale = d3.scaleLinear().domain([0, n]).range([startAngle, endAngle]);
        
        d3.select(this.el).selectAll("*").remove();

        //outer arc
        let base_arc = d3.arc()
            .innerRadius(base_radius - 2)
            .outerRadius(base_radius)
            .cornerRadius(1)
            .startAngle((d, i) => base_scale(i))
            .endAngle((d, i) => base_scale(i + 1));

        d3.select(this.el).append('g')
            .selectAll('path')
            .data(base_field)
            .enter()
            .append('path')
            .attr('stroke', (d, i) => linearColor(i))
            .attr('stroke-width', 17)
            .attr('fill', (d, i) => linearColor(i))
            .attr('d', base_arc);
        
        //inner arc        
        let arc = d3.arc()
            .innerRadius(radius - 2)
            .outerRadius(radius)
            .cornerRadius(1)
            .startAngle((d, i) => scale(i))
            .endAngle((d, i) => scale(i + 1));

        d3.select(this.el).append('g')
            .selectAll('path')
            .data(field)
            .enter()
            .append('path')
            .attr('stroke', (d, i) => "#041e44")
            .attr('stroke-width', 10)
            .attr('fill', (d, i) => "#041e44")
            .attr('d', arc);

        //draw hexagon
        d3.select(this.el)
            .append('path')
            .attr("fill", "#ddd")
            .attr("stroke", "#aaa")
            .attr("stroke-width", 10)
            .attr("stroke-linejoin", "round")
            .attr("d", (d) => {
                let hr = radius * 0.4;                
                let str_path = 'M0,' + (-hr * Math.cos(0)) 
                + 'L' + hr * Math.cos(pi/6) + ',' + (-hr * Math.sin(pi/6)) 
                + 'L' + hr * Math.cos(pi/6) + ',' + (hr * Math.sin(pi/6)) 
                + 'L0,' + hr * Math.cos(0) 
                + 'L' + (-hr * Math.cos(pi/6)) + ',' + (hr * Math.sin(pi/6))
                + 'L' + (-hr * Math.cos(pi/6)) + ',' + (-hr * Math.sin(pi/6))
                + 'L0,' + (-hr * Math.cos(0)) + 'Z';                
                return str_path;
            });
            
        d3.select(this.el)
            .append('text')            
            .style("text-anchor", "middle")
            .style("alignment-baseline", "central")
            .attr("font-weight", 600)
            .style("font-size", rateSize * 0.15 )            
            .attr('fill', '#041e44')
            .text("B");
    }
    render() {
        const {width, height} = this.state;
        
        return  <svg width={width} height={height}>
                    <g width={width} className="gaugeChart" transform={`translate(${width / 2}, ${height / 2})`} ref={el => this.el = el}></g>            
                </svg>
    }
}


export default Gauge;