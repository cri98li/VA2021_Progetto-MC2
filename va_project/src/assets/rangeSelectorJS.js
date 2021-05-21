/**
 *
 *  This module will display a map with a symbol encoding for a set of geographical elements
 */

const d3 = require('d3');



export default function RangeSelector() {
    const dispatch = d3.dispatch("interval");

    let x;


    function brushended(event) {
        if (!event.selection) {
            return;
        }
        const extent =
            event.selection.map(c => parseInt(x.invert(c)))
        ;

        dispatch.call('interval', this, extent);
    }

    function me(selection) {
        console.log("ridisegno")

        let params = selection.datum();
        let array = [];

        const boundaries = selection.node().getBoundingClientRect();

        x = d3.scaleLinear()
            .domain([params.min, params.max])
            .range([0, boundaries.width])

        let c = 0;
        for(let i = params.min; i < params.max; i += params.step)
            array[c++] = 0;

        let max = 1;
        params.values.forEach((d) => {
            let position = parseInt((d-params.min)/params.step);
            array[position]++;
            if(array[position] > max)
                max = array[position]
        })

        const dim = boundaries.width/array.length;

        var myColor = d3.scaleLinear().domain([0,max])
            .range(["white", "blue"])

        let g = selection.selectAll('rect')
            .data(array)

        g.enter()
            .append('rect')
            .merge(g)
            .attr('x', (d, i)=> i*dim)
            .attr('width', dim)
            .attr('height', boundaries.height)
            .attr('fill', myColor)

        const brush = d3.brushX()
            .on('end', brushended);

        selection.call(brush);

    }

    me.on = (eventType, handler) => {
        dispatch.on(eventType, handler);

        return me;
    };


    return me;
}