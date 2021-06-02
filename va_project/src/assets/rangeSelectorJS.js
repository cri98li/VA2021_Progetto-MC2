const d3 = require('d3');


export default function RangeSelector() {
    const dispatch = d3.dispatch("interval");

    let paddingTop = 17;

    let rif;
    let boundaries = {};
    let x;


    function brushended(event) {
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
        rif = selection;
        let params = selection.datum();

        boundaries = selection.node().getBoundingClientRect()

        x = d3.scaleUtc()
            .domain([params.min, params.max])
            .range([0, boundaries.width])

        let height = (boundaries.height - paddingTop)/params.values.length;

        selection.selectAll('rect').remove()

        for(let i = 0; i < params.values.length; i++) {
            let array = []

            let c = 0;
            for (let i = params.min; i < params.max; i += params.step)
                array[c++] = 0;

            let max = 1;
            params.values[i].ts.forEach((d) => {
                let position = parseInt((d - params.min) / params.step);
                array[position]++;
                if (array[position] > max)
                    max = array[position]
            })

            const dim = boundaries.width / array.length;

            let myColor = d3.scaleLinear().domain([0, max])
                .range(["white", params.colors[params.values[i].id]])

            let g = selection
                .selectAll('rect'+params.values[i].id)
                .data(array)


            g.enter()
                .append('rect')
                .attr('class', 'rect'+params.values[i].id)
                .attr('x', (d, i) => i * dim)
                .attr('y', i * height + paddingTop)

                .attr('fill', "white")
                .transition()
                .duration(1000)
                .attr('fill', myColor)
                .attr('width', dim)
                .attr('height', "100%")
        }

        const brush = d3.brushX()
            .on('end', brushended);

        rif.call(brush);


        const x_axis = d3.axisBottom()
            .scale(x)
            .tickFormat(d3.utcFormat('%H:%M'));


        const axis = selection.selectAll("g.axis")
            .data([0])

        axis
            .append('g')
            .attr("class", "axis")
            .merge(selection)
            .call(x_axis);

        selection.select("g.axis").raise()
    }

    me.on = (eventType, handler) => {
        dispatch.on(eventType, handler);

        return me;
    };

    me.updateCircle = (timestamp) => {
        rif
            .selectAll("circle").remove()

        if(timestamp != null)
            rif.append('circle')
                .attr('cx', x(timestamp))
                .attr('cy', (boundaries.height+paddingTop)/2)
                .attr('r', 2)
                .attr('fill', 'red');

        return me;
    };


    return me;
}