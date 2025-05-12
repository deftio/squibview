import React from 'https://esm.sh/react@18.2.0';
import SquibView from '../dist/squibview.esm.js';

/**
 * React component wrapper for SquibView
 */
class SquibViewReact extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.state = {
      editor: null
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

      // Listen for content changes from the editor
      instance.events.on('content:changed', (newContent, type) => {
        if (this.props.onChange) {
          this.props.onChange(newContent, type);
        }
      });
      
      this.setState({ editor: instance });
    }
  }
  
  componentDidUpdate(prevProps) {
    const { editor } = this.state;
    if (!editor) return;

    // Handle content updates from parent only if they're different from current editor content
    if (this.props.initialContent !== prevProps.initialContent) {
      const currentContent = editor.getContent();
      if (currentContent !== this.props.initialContent) {
        editor.setContent(
          this.props.initialContent, 
          this.props.inputContentType || editor.inputContentType, 
          false
        );
      }
    }
    
    // Handle content type changes
    if (this.props.inputContentType !== prevProps.inputContentType) {
      editor.setContent(
        editor.getContent(), 
        this.props.inputContentType,
        false
      );
    }
    
    // Handle view changes
    if (this.props.initialView !== prevProps.initialView) {
      editor.setView(this.props.initialView);
    }
    
    // Handle controls visibility
    if (this.props.showControls !== prevProps.showControls) {
      editor.controlsShow(this.props.showControls);
    }
    
    // Handle title visibility
    if (this.props.titleShow !== prevProps.titleShow) {
      editor.titleShow(this.props.titleShow);
    }
    
    // Handle title content
    if (this.props.titleContent !== prevProps.titleContent) {
      editor.titleSetContent(this.props.titleContent);
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