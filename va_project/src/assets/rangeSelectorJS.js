const d3 = require('d3');


export default function RangeSelector() {
    const dispatch = d3.dispatch("interval");

    let boundaries = {};
    let x;


    function brushended(event) {
        console.log("evento")

        if (!event.selection) {
            dispatch.call('interval', this, [x.invert(0).getTime(), x.invert(boundaries.width).getTime()]);
            return;
        }
        const extent =
            event.selection.map(c => x.invert(c).getTime())
        ;

        dispatch.call('interval', this, extent);
    }

    function me(selection) {
        let params = selection.datum();
        let array = [];

        boundaries = selection.node().getBoundingClientRect()

        x = d3.scaleUtc()
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

        let myColor = d3.scaleLinear().domain([0,max])
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


        let x_axis = d3.axisBottom()
            .scale(x)
            .tickFormat(d3.utcFormat('%H:%M'));

        selection.selectAll("g.axis")
            .data([0])
            .append('g')
            .attr("class", "axis")
            .merge(selection)
            .call(x_axis);
    }

    me.on = (eventType, handler) => {
        dispatch.on(eventType, handler);

        return me;
    };


    return me;
}