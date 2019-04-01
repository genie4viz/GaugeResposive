import React, {
    Component
} from 'react';
import * as d3 from "d3";


class Gauge extends Component {
    constructor(props) {
        super(props);
        const {width, height, data} = this.props;

        let margin = { top: 20, right: 20, bottom: 20, left: 20 },
            svgDimen = { width: width - margin.left - margin.right, height: height - margin.top - margin.bottom };

        this.state = {
            svgDimen: svgDimen,
            data: data
        };
    }
    componentWillReceiveProps(nextProps) {
        const { width, height, data} = nextProps;
        let margin = { top: 20, right: 20, bottom: 20, left: 20 },
            svgDimen = { width: width - margin.left - margin.right, height: height - margin.top - margin.bottom };

        this.setState({
            svgDimen: svgDimen,
            data: data
        });
    }
    componentDidMount() {
        this.drawChart();
    }
    componentDidUpdate() {
        this.drawChart();
    }
    drawChart() {
        const { svgDimen, data} = this.state;
        let n = 100,
            padding = {left: 10, right: 10, top: 10, bottom: 10},
            base_radius = Math.min((svgDimen.width * 0.8 - padding.left - padding.right) / 2, (svgDimen.height * 0.8 - padding.top - padding.bottom) / 2),
            pi = Math.PI,            
            base_endAngle =  pi / 2 + pi / 6,
            base_startAngle = -base_endAngle,
            base_field = d3.range(base_startAngle, base_endAngle, (pi + pi / 3) / n),
            base_scale = d3.scaleLinear().domain([0, n]).range([base_startAngle, base_endAngle]),
            linearColor = d3.scaleLinear().range(["red", "yellow", "green"]).domain([0, n/2, n]),
            //inner guage
            endAngle = base_endAngle,
            startAngle = base_startAngle,
            radius = base_radius * 13 / 15,
            field = d3.range(base_startAngle, base_endAngle, (pi + pi / 3) / n),
            scale = d3.scaleLinear().domain([0, n]).range([startAngle, endAngle]);
        
        d3.select(this.el).selectAll("*").remove();

        //outer arc
        let base_arc = d3.arc()
            .innerRadius(base_radius - 3)
            .outerRadius(base_radius)
            .cornerRadius(5)
            .startAngle((d, i) => base_scale(i))
            .endAngle((d, i) => base_scale(i + 1));

        d3.select(this.el).append('g')
            .selectAll('path')
            .data(base_field)
            .enter()
            .append('path')
            .attr('stroke', (d, i) => linearColor(i))
            .attr('stroke-width', 15)
            .attr('fill', (d, i) => linearColor(i))
            .attr('d', base_arc);
        
        //inner arc        
        let arc = d3.arc()
            .innerRadius(radius - 2)
            .outerRadius(radius)
            .cornerRadius(5)
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
            .attr("stroke", "grey")
            .attr("stroke-width", 15)
            .attr("d", (d) => {
                let hr = radius * 0.5;                
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
            .attr("dy", padding.top)
            .style("text-anchor", "middle")
            .style("alignment-baseline", "middle")
            .style("font-size", 80)
            .attr('fill', '#041e44')
            .text("B");
    }
    render() {
        const {svgDimen} = this.state;
        
        return  <svg width={svgDimen.width} height={svgDimen.height}>
                    <g width={svgDimen.width} className="gaugeChart" transform={`translate(${svgDimen.width / 2}, ${svgDimen.height / 2})`} ref={el => this.el = el}></g>            
                </svg>
    }
}


export default Gauge;