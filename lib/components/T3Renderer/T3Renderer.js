// Component to render content elements loop
export default {
  name: 'T3Renderer',
  functional: true,
  props: {
    /**
     * Array of content elements - colPos[x] from contentData
     */
    content: {
      type: Array,
      default: () => []
    },
    /**
     * Control frame component displaying
     */
    frame: {
      type: Boolean,
      default: true
    }
  },
  render (createElement, ctx) {
    // render standalone component
    function renderComponent (element, index) {
      return createElement('t3-dynamic', {
        props: {
          data: element,
          type: element.type,
          index
        }
      })
    }

    // render component with frame wrapper
    function renderFrame (element, index) {
      return createElement(
        't3-frame',
        {
          props: element.appearance
        },
        [renderComponent(element, index)]
      )
    }

    // render loop of content elements
    return ctx.props.content.map((element, index) =>
      ctx.props.frame && element.appearance.frameClass !== 'none'
        ? renderFrame(element, index)
        : renderComponent(element, index)
    )
  }
}
