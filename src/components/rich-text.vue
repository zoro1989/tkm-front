<template>
  <div class="rich-text">
    <quill-editor :content="content" @change="onEditorChange($event)" :options="editorOption" ref="myTextEditor"></quill-editor>
  </div>
</template>
<script>
  import hljs from 'highlight.js'
  import 'highlight.js/styles/monokai-sublime.css'
  export default {
    props: {
      content: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video']
            ],
            syntax: {
              highlight: text => hljs.highlightAuto(text).value
            }
          }
        }
      }
    },
    methods: {
      onEditorChange ({ editor, html, text }) {
        // console.log('editor change!', editor, html, text)
        this.$emit('update:content', html)
//        this.$emit('update:content', this.$refs.myTextEditor.$el.innerHTML)
      },
      getContentHTML () {
        return document.querySelector('.ql-editor').innerHTML
      }
    },
    created () {
    }
//    props: {
//      content: {
//        type: String,
//        default: '<h1>hello</h1>'
//      }
//    },
  }
</script>
<style scoped>
  .rich-text .quill-code {
    border: none;
    height: auto;
  }
  .rich-text .quill-code > code {
    width: 100%;
    margin: 0;
    padding: 1rem;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0;
    height: 10rem;
    overflow-y: auto;
    resize: vertical;
    font-size: 0px;
  }
  .rich-text code, kbd, pre, samp {
    font-family: Menlo,Monaco,Consolas,Courier New,monospace,monospace!important;
  }
</style>
