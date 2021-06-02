const d3 = require('d3');

export default function MapJS() {
    let projection = d3.geoEquirectangular();
    let scale = 480000;
    let center = [24.8673, 36.070512];
    let featureClass = "id";
    let colorClass = "color";

    function me(selection) {
        const boundaries = selection.node().parentNode.getBoundingClientRect()

        projection = d3.geoEquirectangular()
            .scale(scale)
            .center(center)
            .translate([boundaries.width / 2, boundaries.height / 2]);

        let path = d3.geoPath().projection(projection);

        const paths = selection.selectAll('path')
            .data(selection.datum().features);

        paths.exit().remove();

        paths.enter()
            .append('path');

        selection.selectAll('path')
            .attr('class', (d) => {
                if (d.properties[featureClass])
                    return "_"+d.properties[featureClass]
                return 'none';
            })
            .attr('stroke', (d) => {
                if (d.properties[colorClass])
                    return d.properties[colorClass]
                return 'none';
            })
            .attr('d', path);
    }

    me.projection = function (_) {
        if (!arguments.length) return projection;
        projection = _;

        return me;
    };

    me.scale = function (_) {
        if (!arguments.length) return scale;
        scale = _;
        projection.scale(scale);

        return me;
    };

    me.center = function (_) {
        if (!arguments.length) return center;
        center = _;
        projection.center(center);

        return me;
    };


    me.featureClass = function (_) {
        if (!arguments.length) return featureClass;
        featureClass = _;

        return me;
    };


    return me;
}