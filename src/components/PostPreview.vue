<template>
  <div class="preview post p-3 shadow">
    <span class="bg-danger text-light border shadow text-center bold p-auto close-preview position-absolute rounded-circle" @click="$emit('closePrview')" role="button">X</span>
    <div v-html="previewContent"></div>
  </div>
</template>

<script>
import marked from 'marked';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';

export default {
  props:['content'],
  mounted(){
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block);
    });
  },
  computed:{
    previewContent(){
      return DOMPurify.sanitize(marked(this.content));
    }

  }
}
</script>

<style>
.preview{
  height: 80vh;
  width: 90%;
  padding: 5px 15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999999999999;
  background: #e8e8e8;
}
.preview.rtl{
  direction: rtl !important;
  text-align: right !important;
}
.preview div{
  height: 100%;
  overflow: auto;
}
.close-preview {
  left: 50%;
  top: -15px;
  transform: translate(-50%, 0);
  width: 30px;
  height: 30px;
  font-size: 19px;
  cursor: pointer
}
.hljs{display:block;overflow-x:auto;padding:.5em;color:#abb2bf;background:#282c34}.hljs-comment,.hljs-quote{color:#5c6370;font-style:italic}.hljs-doctag,.hljs-formula,.hljs-keyword{color:#c678dd}.hljs-deletion,.hljs-name,.hljs-section,.hljs-selector-tag,.hljs-subst{color:#e06c75}.hljs-literal{color:#56b6c2}.hljs-addition,.hljs-attribute,.hljs-meta-string,.hljs-regexp,.hljs-string{color:#98c379}.hljs-built_in,.hljs-class .hljs-title{color:#e6c07b}.hljs-attr,.hljs-number,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-pseudo,.hljs-template-variable,.hljs-type,.hljs-variable{color:#d19a66}.hljs-bullet,.hljs-link,.hljs-meta,.hljs-selector-id,.hljs-symbol,.hljs-title{color:#61aeee}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}.hljs-link{text-decoration:underline}
</style>
