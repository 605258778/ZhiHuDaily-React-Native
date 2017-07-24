'use strict';
//自定义的WebView，引用原生模块，用于显示文章详情
var React = require('react-native');
var {
  View,
  requireNativeComponent,
  PropTypes
} = React;

var ReactNativeViewAttributes = require('ReactNativeViewAttributes');

class ObservableWebView extends React.Component {
  constructor() {
    super();
    this._onChange = this._onChange.bind(this);
  }

  _onChange(event: Event) {
    if (!this.props.onScrollChange) {
      return;
    }
    this.props.onScrollChange(event.nativeEvent.ScrollY);
  }

  render() {
    return <RCTWebView {...this.props} onChange={this._onChange} />;
  }
}

ObservableWebView.propTypes = {
  ...View.propTypes,
  url: PropTypes.string,
  html: PropTypes.string,
  css: PropTypes.string,
  onScrollChange: PropTypes.func,
};
//
// ObservableWebView.viewConfig = {
//   uiViewClassName: 'RCTWebView',
//   validAttributes: ReactNativeViewAttributes.RKView
// };

var RCTWebView = requireNativeComponent('RCTWebView', ObservableWebView, {
  nativeOnly: {onChange: true}
});

module.exports = ObservableWebView;
