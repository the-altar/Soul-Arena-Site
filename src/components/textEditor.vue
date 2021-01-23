<template>
  <div>
    <div class="quotes">
      <div
        @click="scrollToPost(quote.quoteId)"
        class="quotes-item"
        v-for="quote of quotes"
        :key="quote.quoteId"
        v-html="quote.body.content"
      ></div>
    </div>

    <div class="editor">
      <editor-content
        :editor="editor"
        class="editor-content"
        :content="body"
        :autoFocus="false"
      />
    </div>

    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="editor-menu">
        <button
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          B
        </button>
        <button
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          I
        </button>
        <button
          type="button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          Strike
        </button>
        <button
          type="button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          U
        </button>
        <button
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          H1
        </button>
        <button
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </button>
        <button
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          H3
        </button>
        <button
          type="button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          Quote
        </button>
        <button
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          List
        </button>
        <button
          class="menubar__button"
          @click="showImagePrompt(commands.image)"
        >
          Img
        </button>

        <button
          class="menubar__button"
          @click="showLinkPrompt(commands.link)"
        >
          link
        </button>
      </div>
    </editor-menu-bar>

    <button class="input input-btn" @click="getContent()">Save</button>
    <button class="input input-btn firewatch" @click="cancel()" id="me">
      Cancel
    </button>
  </div>
</template>

<script>
// Import the editor
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Image,
  Placeholder,
} from "tiptap-extensions";

export default {
  props: ["content", "editMode"],
  components: {
    EditorContent,
    EditorMenuBar,
  },
  data() {
    return {
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new BulletList(),
          new OrderedList(),
          new ListItem(),
          new TodoItem(),
          new TodoList(),
          new Bold(),
          new Code(),
          new Italic(),
          new Link(),
          new Strike(),
          new Underline(),
          new History(),
          new Image(),
          new Placeholder({
            emptyEditorClass: "is-editor-empty",
            emptyNodeClass: "is-empty",
            emptyNodeText: "Write something…",
            showOnlyWhenEditable: true,
            showOnlyCurrent: true,
          }),
        ],
        linkUrl: null,
        linkMenuIsActive: false,
      }),
    };
  },
  computed: {
    body() {
      return this.content;
    },
    isEdit() {
      return this.editMode;
    },
    quotes() {
      return this.$store.getters["GET_QUOTES"];
    },
  },
  methods: {
    showImagePrompt(command) {
      const src = prompt("Enter the url of your image here");
      if (src !== null) {
        command({ src });
      }
    },
    getContent() {
      this.$emit("content-captured", this.editor.getHTML());
    },
    cancel() {
      this.$emit("close-editor");
    },
    scrollToPost(id) {
      this.$scrollTo(`#comment-${id}`, 0, {
        offset: -60,
        force: true,
        cancelable: true,
      });
    },
    showLinkPrompt(command) {
      const linkUrl = prompt("Enter the URL of your link");
      if (linkUrl) {
        command({ href: linkUrl });
      }
    },
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  created() {
    this.editor.setContent(this.body);
  },
};
</script>

<style lang="scss">
.editor {
  &-content {
    font-size: 12px;
    width: 95%;
    margin-bottom: 2px;
    height: 200px;
    background-color: white;
    border: 1px solid rgb(231, 231, 231);
    overflow: auto;
    border-radius: 10px;
    padding-left: 10px;
  }

  &-menu {
    display: flex;
    justify-content: flex-start;
    button {
      border: none;
      background-color: inherit;
      font-size: 12px;
      font-weight: bolder;
      margin: 5px;
    }
  }

  p.is-editor-empty:first-child::before {
    content: attr(data-empty-text);
    float: left;
    color: #aaa;
    pointer-events: none;
    height: 0;
    font-style: italic;
  }

  blockquote {
    background-color: cornsilk;
    margin: 0;
  }
}

.quotes {
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  &-item {
    width: 130px;
    height: 20px;
    line-height: 20px;
    cursor: pointer;
    font-size: 12px;
    background-color: rgb(230, 230, 230);
    border: 1px solid rgb(196, 196, 196);
    overflow: hidden;
    padding: 4px 4px 4px 10px;
    border-radius: 25px;
    margin: 0 2px 5px 0;
    position: relative;

    &::after {
      content: "";
      width: 45px;
      height: 100%;
      display: inline-block;
      background: linear-gradient(
        to left,
        rgba(230, 230, 230, 1),
        rgba(0, 0, 0, 0)
      );
      position: absolute;
      z-index: 1;
      top: 0;
      right: 0;
    }

    &-label {
      color: gray;
      font-weight: bolder;
    }
    p {
      margin: 0;
      width: max-content;
      color: gray;
    }
  }
}

.is-active {
  background-color: rgb(194, 194, 194) !important;
}
</style>