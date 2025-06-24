import SquibView from './squibview.esm.min.js';

var SquibViewVue = {
  name: 'SquibViewVue',
  props: {
    initialContent: {
      type: String,
      "default": ''
    },
    inputContentType: {
      type: String,
      "default": 'md'
    },
    showControls: {
      type: Boolean,
      "default": true
    },
    initialView: {
      type: String,
      "default": 'split'
    },
    titleShow: {
      type: Boolean,
      "default": false
    },
    titleContent: {
      type: String,
      "default": ''
    },
    className: {
      type: String,
      "default": ''
    }
  },
  data: function data() {
    return {
      editor: null
    };
  },
  mounted: function mounted() {
    this.initializeEditor();
  },
  methods: {
    initializeEditor: function initializeEditor() {
      var _this = this;
      this.editor = new SquibView(this.$refs.container, {
        initialContent: this.initialContent,
        inputContentType: this.inputContentType,
        showControls: this.showControls,
        initialView: this.initialView,
        titleShow: this.titleShow,
        titleContent: this.titleContent
      });

      // Override methods to emit events
      var originalSetContent = this.editor.setContent.bind(this.editor);
      this.editor.setContent = function (content, type, saveRevision) {
        originalSetContent(content, type, saveRevision);
        _this.$emit('content-change', content, type);
      };
      var originalSetView = this.editor.setView.bind(this.editor);
      this.editor.setView = function (view) {
        originalSetView(view);
        _this.$emit('view-change', view);
      };

      // Listen for editor events and re-emit them
      this.editor.events.on('content:rendered', function (contentType) {
        _this.$emit('content-rendered', contentType);
      });
      this.editor.events.on('revision:undo', function (content, contentType) {
        _this.$emit('revision-undo', content, contentType);
      });
      this.editor.events.on('revision:redo', function (content, contentType) {
        _this.$emit('revision-redo', content, contentType);
      });
    }
  },
  watch: {
    initialContent: function initialContent(newContent) {
      if (this.editor && newContent !== this.editor.getContent()) {
        this.editor.setContent(newContent, this.inputContentType || this.editor.inputContentType, false);
      }
    },
    inputContentType: function inputContentType(newType) {
      if (this.editor && newType !== this.editor.inputContentType) {
        this.editor.setContent(this.editor.getContent(), newType, false);
      }
    },
    showControls: function showControls(show) {
      if (this.editor) {
        this.editor.controlsShow(show);
      }
    },
    titleShow: function titleShow(show) {
      if (this.editor) {
        this.editor.titleShow(show);
      }
    },
    titleContent: function titleContent(content) {
      if (this.editor) {
        this.editor.titleSetContent(content);
      }
    },
    initialView: function initialView(view) {
      if (this.editor) {
        this.editor.setView(view);
      }
    }
  },
  beforeUnmount: function beforeUnmount() {
    // Cleanup if necessary
    if (this.editor && this.editor.events) {
      this.editor.events.off('*');
    }
  },
  template: "\n    <div ref=\"container\" :class=\"['squibview-vue-container', className]\"></div>\n  "
};

export { SquibViewVue as default };
//# sourceMappingURL=squibview-vue.js.map
