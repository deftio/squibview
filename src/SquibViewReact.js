import React from 'react';
import SquibView from './squibview.js';

/**
 * React component wrapper for SquibView
 */
class SquibViewReact extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.state = {
      editor: null,
      content: props.initialContent || ''
    };
  }
  
  componentDidMount() {
    if (this.containerRef.current) {
      // Initialize SquibView
      const instance = new SquibView(this.containerRef.current, {
        initialContent: this.props.initialContent,
        inputContentType: this.props.inputContentType,
        showControls: this.props.showControls,
        initialView: this.props.initialView,
        titleShow: this.props.titleShow,
        titleContent: this.props.titleContent
      });
      
      // Override methods to communicate with React
      const originalSetContent = instance.setContent.bind(instance);
      instance.setContent = (newContent, type, saveRevision) => {
        originalSetContent(newContent, type, saveRevision);
        this.setState({ content: newContent });
        if (this.props.onChange) {
          this.props.onChange(newContent, type);
        }
      };
      
      const originalSetView = instance.setView.bind(instance);
      instance.setView = (view) => {
        originalSetView(view);
        if (this.props.onViewChange) {
          this.props.onViewChange(view);
        }
      };
      
      // Listen for editor events and re-emit them as props callbacks
      instance.events.on('content:rendered', (contentType) => {
        if (this.props.onContentRendered) {
          this.props.onContentRendered(contentType);
        }
      });
      
      instance.events.on('revision:undo', (content, contentType) => {
        if (this.props.onUndoRedo) {
          this.props.onUndoRedo('undo', content, contentType);
        }
      });
      
      instance.events.on('revision:redo', (content, contentType) => {
        if (this.props.onUndoRedo) {
          this.props.onUndoRedo('redo', content, contentType);
        }
      });
      
      this.setState({ editor: instance });
    }
  }
  
  componentDidUpdate(prevProps) {
    // Handle content updates from parent
    if (this.state.editor && this.props.initialContent !== prevProps.initialContent) {
      this.state.editor.setContent(
        this.props.initialContent, 
        this.props.inputContentType || this.state.editor.inputContentType, 
        false
      );
      this.setState({ content: this.props.initialContent });
    }
    
    // Handle content type changes
    if (this.state.editor && this.props.inputContentType !== prevProps.inputContentType) {
      this.state.editor.setContent(
        this.state.editor.getContent(), 
        this.props.inputContentType,
        false
      );
    }
    
    // Handle view changes
    if (this.state.editor && this.props.initialView !== prevProps.initialView) {
      this.state.editor.setView(this.props.initialView);
    }
    
    // Handle controls visibility
    if (this.state.editor && this.props.showControls !== prevProps.showControls) {
      this.state.editor.controlsShow(this.props.showControls);
    }
    
    // Handle title visibility
    if (this.state.editor && this.props.titleShow !== prevProps.titleShow) {
      this.state.editor.titleShow(this.props.titleShow);
    }
    
    // Handle title content
    if (this.state.editor && this.props.titleContent !== prevProps.titleContent) {
      this.state.editor.titleSetContent(this.props.titleContent);
    }
  }
  
  componentWillUnmount() {
    // Clean up event listeners
    if (this.state.editor && this.state.editor.events) {
      this.state.editor.events.off('*');
    }
  }
  
  render() {
    const { className, ...otherProps } = this.props;
    return React.createElement('div', { 
      ref: this.containerRef,
      className: `squibview-react-container ${className || ''}`,
      ...otherProps
    });
  }
}

// Add prop types documentation for IDE support
SquibViewReact.propTypes = {
  // React's PropTypes are not included directly to avoid dependencies
  // This is just for documentation purposes
  /*
  initialContent: PropTypes.string,
  inputContentType: PropTypes.string,
  showControls: PropTypes.bool,
  initialView: PropTypes.string,
  titleShow: PropTypes.bool,
  titleContent: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onViewChange: PropTypes.func,
  onContentRendered: PropTypes.func,
  onUndoRedo: PropTypes.func
  */
};

// Default props
SquibViewReact.defaultProps = {
  initialContent: '',
  inputContentType: 'md',
  showControls: true,
  initialView: 'split',
  titleShow: false,
  titleContent: '',
  className: ''
};

export default SquibViewReact;