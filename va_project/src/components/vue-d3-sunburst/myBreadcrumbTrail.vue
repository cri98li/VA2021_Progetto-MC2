<template>
  <breadcrumb
    :style="{ order: order }"
    v-bind="{
      colorGetter,
      endText,
      from: fromItem,
      itemHeight,
      itemWidth,
      items,
      spacing,
      tailWidth,
      width
    }"
  />
</template>
<script>
import breadcrumb from "./myBreadcrumb";

/**
 * Breadcrumb trail component displaying path between root node and current node.
 * Can be used as a "legend" slot of sunburst component.
 */
export default {
  name: "myBreadcrumbTrail",
  components: {
    breadcrumb
  },
  props: {
    /**
     *  Root node
     */
    root: {
      required: false,
      type: Object
    },
    /**
     *  Current node
     */
    current: {
      required: false,
      type: Object
    },
    /**
     *  Reference node, parents nodes of the from node will have an opacity below 1
     */
    from: {
      required: false,
      type: Object
    },
    /**
     *  ColorGetter exposed by sunburst
     */
    colorGetter: {
      required: true,
      type: Function
    },
    /**
     *  Sunburst width
     */
    width: {
      required: false,
      type: Number
    },
    /**
     *  Css Order. If 1 the slot is displayed below the sunburst, if 0 the slot is displayed on top the sunburst
     */
    order: {
      required: false,
      type: Number,
      default: 1
    },
    /**
     *  Bread crumb item width
     */
    itemWidth: {
      required: false,
      type: Number,
      default: 80
    },
    /**
     * Bread crumb item height
     */
    itemHeight: {
      required: false,
      type: Number,
      default: 30
    },
    /**
     * Spacing between breadcrumb items
     */
    spacing: {
      required: false,
      type: Number,
      default: 3
    },
    /**
     * With of tailing element
     */
    tailWidth: {
      required: false,
      type: Number,
      default: 10
    }
  },
  computed: {
    items() {
      const { current } = this;
      return !current
        ? []
        : current
            .ancestors()
            .reverse()
            .map(d => ({
              id: d.data.name + d.depth,
              data: d.data,
              name: d.data.name
            }));
    },
    fromItem() {
      const { from } = this;
      if (!from) {
        return null;
      }
      return this.items.find(it => it.data === from.data);
    },
    endText() {
      const { current } = this;
      if (!current) {
        return "";
      }
      let additionalInfo = "";

      if(!current.data.loyalty_card && current.data.credit_card)
        additionalInfo = "Nessuna C. Fedeltà";

      return current.value.toFixed(2)+"$ "+additionalInfo;
    }
  }
};
</script>
