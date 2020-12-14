<template>
  <div>
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
      </div>
    </editor-menu-bar>

    <button class="input input-btn" @click="getContent()">Save</button>
    <button class="input input-btn firewatch" @click="cancel()">Cancel</button>
  </div>
</template>

<script>
// Import the editor
import { Editor, EditorContent, EditorMenuBar, Extension } from "tiptap";
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
          new (class extends Extension {
            keys() {
              return {
                Enter(state, dispatch, view) {
                  const { schema, tr } = view.state;

                  const hard_break = schema.nodes.hard_break;
                  const transaction = tr
                    .replaceSelectionWith(hard_break.create())
                    .scrollIntoView();
                  view.dispatch(transaction);
                  return true;
                },
              };
            }
          })(),
        ],
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
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  created(){
    this.editor.setContent(this.body);
  }
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
</style>