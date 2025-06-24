import SquibView from './squibview.esm.min.js';

export default {
  name: 'SquibViewVue',
  props: {
    initialContent: {
      type: String,
      default: ''
    },
    inputContentType: {
      type: String,
      default: 'md'
    },
    showControls: {
      type: Boolean,
      default: true
    },
    initialView: {
      type: String,
      default: 'split'
    },
    titleShow: {
      type: Boolean,
      default: false
    },
    titleContent: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editor: null
    };
  },
  mounted() {
    this.initializeEditor();
  },
  methods: {
    initializeEditor() {
      this.editor = new SquibView(this.$refs.container, {
        initialContent: this.initialContent,
        inputContentType: this.inputContentType,
        showControls: this.showControls,
        initialView: this.initialView,
        titleShow: this.titleShow,
        titleContent: this.titleContent
      });
      
      // Override methods to emit events
      const originalSetContent = this.editor.setContent.bind(this.editor);
      this.editor.setContent = (content, type, saveRevision) => {
        originalSetContent(content, type, saveRevision);
        this.$emit('content-change', content, type);
      };
      
      const originalSetView = this.editor.setView.bind(this.editor);
      this.editor.setView = (view) => {
        originalSetView(view);
        this.$emit('view-change', view);
      };
      
      // Listen for editor events and re-emit them
      this.editor.events.on('content:rendered', (contentType) => {
        this.$emit('content-rendered', contentType);
      });
      
      this.editor.events.on('revision:undo', (content, contentType) => {
        this.$emit('revision-undo', content, contentType);
      });
      
      this.editor.events.on('revision:redo', (content, contentType) => {
        this.$emit('revision-redo', content, contentType);
      });
    }
  },
  watch: {
    initialContent(newContent) {
      if (this.editor && newContent !== this.editor.getContent()) {
        this.editor.setContent(newContent, this.inputContentType || this.editor.inputContentType, false);
      }
    },
    inputContentType(newType) {
      if (this.editor && newType !== this.editor.inputContentType) {
        this.editor.setContent(this.editor.getContent(), newType, false);
      }
    },
    showControls(show) {
      if (this.editor) {
        this.editor.controlsShow(show);
      }
    },
    titleShow(show) {
      if (this.editor) {
        this.editor.titleShow(show);
      }
    },
    titleContent(content) {
      if (this.editor) {
        this.editor.titleSetContent(content);
      }
    },
    initialView(view) {
      if (this.editor) {
        this.editor.setView(view);
      }
    }
  },
  beforeUnmount() {
    // Cleanup if necessary
    if (this.editor && this.editor.events) {
      this.editor.events.off('*');
    }
  },
  template: `
    <div ref="container" :class="['squibview-vue-container', className]"></div>
  `
};