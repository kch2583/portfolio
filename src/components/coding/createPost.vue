<template>
  <v-container>
    <v-row>
      <v-col cols="12">글쓰기</v-col>
      <v-col cols="12">
        <v-select
          :items="codingList"
          item-text="name"
          placeholder="목록을 선택해 주세요"
          rounded
          outlined
          hide-details
          multiple
          chips
          single-line
          v-model="selectedItem"
          :menu-props="{
            rounded: 'xl',
            offsetY: true,
            bottom: true,
          }"
        ></v-select>
      </v-col>

      <v-col cols="12">
        <v-text-field
          hide-details
          flat
          rounded
          outlined
          placeholder="제목"
          v-model="title"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" style="color: gray">
        <!-- 볼드체  Bold -->
        <v-btn
          min-width="0"
          class="px-2"
          text
          @click="editor.chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
        >
          <v-icon :color="editor.isActive('bold') ? 'blue' : 'black'"
            >mdi-format-bold</v-icon
          >
        </v-btn>

        <!-- 이탈릭체 italic -->
        <v-btn
          min-width="0"
          class="px-2"
          text
          @click="editor.chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
          ><v-icon :color="editor.isActive('italic') ? 'blue' : 'black'"
            >mdi-format-italic</v-icon
          ></v-btn
        >

        <!-- 밑줄 underline -->
        <v-btn
          min-width="0"
          class="px-2"
          text
          @click="editor.chain().focus().toggleUnderline().run()"
          :class="{ 'is-active': editor.isActive('underline') }"
          ><v-icon>mdi-format-underline</v-icon></v-btn
        >
        <!-- 가운데줄 strike -->
        <v-btn
          min-width="0"
          class="px-2"
          text
          @click="editor.chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
          ><v-icon>mdi-format-strikethrough</v-icon></v-btn
        >
        <!-- 형광펜 highlight -->
        <!-- <v-btn
          min-width="0"
          class="px-2"
          text
          @click="editor.chain().focus().toggleHighlight().run()"
          :class="{ 'is-active': editor.isActive('highlight') }"
          ><v-icon :color="editor.isActive('highlight') ? '#FFFA78' : 'black'"
            >mdi-marker</v-icon
          >
        </v-btn> -->
        <v-menu offset-y bottom rounded="xl" :close-on-content-click="false">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" min-width="0" class="px-2" text
              ><v-icon :color="highlightColor">mdi-marker</v-icon>
            </v-btn>
          </template>
          <v-color-picker
            class="ma-2"
            width="250"
            @input="
              editor
                .chain()
                .focus()
                .toggleHighlight({ color: highlightColor })
                .run()
            "
            v-model="highlightColor"
          >
          </v-color-picker>
        </v-menu>

        <!-- 글자 색상 변경 text color -->
        <v-menu offset-y bottom rounded="xl" :close-on-content-click="false">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" min-width="0" class="px-2" text
              ><v-icon :color="textColor">mdi-palette</v-icon>
            </v-btn>
          </template>
          <v-color-picker
            class="ma-2"
            width="250"
            @input="
              editor.chain().focus().setColor(textColor).run(), setTextColor()
            "
            v-model="textColor"
            :class="{
              'is-active': editor.isActive('textStyle', { color: textColor }),
            }"
          >
          </v-color-picker>
        </v-menu>

        <!-- 인용구 blockquote -->
        <v-btn
          min-width="0"
          class="px-2"
          text
          @click="editor.chain().focus().toggleBlockquote().run()"
          :class="{ 'is-active': editor.isActive('blockquote') }"
          ><v-icon>mdi-format-quote-close</v-icon></v-btn
        >

        <!-- 구분선 divider, horizontal rule -->
        <v-btn
          min-width="0"
          class="px-2"
          text
          @click="editor.chain().focus().setHorizontalRule().run()"
          ><v-icon>mdi-minus</v-icon></v-btn
        >

        <!-- 위첨자 superscript -->
        <v-btn
          min-width="0"
          class="px-2"
          text
          @click="editor.chain().focus().toggleSuperscript().run()"
          :class="{ 'is-active': editor.isActive('superscript') }"
          ><v-icon>mdi-format-superscript</v-icon></v-btn
        >

        <!-- 아래첨자 subscript -->
        <v-btn
          min-width="0"
          class="px-2"
          text
          @click="editor.chain().focus().toggleSubscript().run()"
          :class="{ 'is-active': editor.isActive('subscript') }"
          ><v-icon>mdi-format-subscript</v-icon></v-btn
        >
        |
        <!-- 순서없는 리스트 bulleted list -->
        <v-btn
          min-width="0"
          class="px-2"
          text
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }"
          ><v-icon>mdi-format-list-bulleted</v-icon></v-btn
        >

        <!-- 순서있는 리스트 numbered list -->
        <v-btn
          min-width="0"
          class="px-2"
          text
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor.isActive('orderedList') }"
          ><v-icon>mdi-format-list-numbered</v-icon></v-btn
        >

        <!--  sink list item -->
        <v-btn
          min-width="0"
          class="px-2"
          text
          @click="editor.chain().focus().sinkListItem('listItem').run()"
          :disabled="!editor.can().sinkListItem('listItem')"
          ><v-icon>mdi-format-horizontal-align-right</v-icon></v-btn
        >
        <!-- lift list item -->
        <v-btn
          min-width="0"
          class="px-2"
          text
          @click="editor.chain().focus().liftListItem('listItem').run()"
          :disabled="!editor.can().liftListItem('listItem')"
          ><v-icon>mdi-format-horizontal-align-left</v-icon></v-btn
        >
        |

        <!-- 체크리스트 check task list -->
        <v-btn
          min-width="0"
          class="px-2"
          text
          @click="editor.chain().focus().toggleTaskList().run()"
          :class="{ 'is-active': editor.isActive('taskList') }"
          ><v-icon>mdi-format-list-checks</v-icon></v-btn
        >
        <!-- check list sink listitem -->
        <v-btn
          min-width="0"
          class="px-2"
          text
          @click="editor.chain().focus().sinkListItem('taskItem').run()"
          :disabled="!editor.can().sinkListItem('taskItem')"
          ><v-icon>mdi-format-indent-increase</v-icon></v-btn
        >
        <!-- check list lift listitem -->
        <v-btn
          min-width="0"
          class="px-2"
          text
          @click="editor.chain().focus().liftListItem('taskItem').run()"
          :disabled="!editor.can().liftListItem('taskItem')"
          ><v-icon>mdi-format-indent-decrease</v-icon></v-btn
        >
        |

        <!-- undo -->
        <v-btn
          min-width="0"
          class="px-2"
          text
          @click="editor.chain().focus().undo().run()"
          :disabled="!editor.can().undo()"
          ><v-icon>mdi-arrow-u-left-top</v-icon></v-btn
        >

        <!-- redo -->
        <v-btn
          min-width="0"
          class="px-2"
          text
          @click="editor.chain().focus().redo().run()"
          :disabled="!editor.can().redo()"
          ><v-icon>mdi-arrow-u-right-top</v-icon></v-btn
        >

        <!-- 코드 code -->
        <v-btn
          min-width="0"
          class="px-2"
          text
          @click="editor.chain().focus().toggleCodeBlock().run()"
          :class="{ 'is-active': editor.isActive('codeBlock') }"
          ><v-icon>mdi-xml</v-icon></v-btn
        >

        <!-- 텍스트 정렬 text align -->
        <v-btn
          min-width="0"
          class="px-2"
          text
          @click="editor.chain().focus().setTextAlign('left').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
          ><v-icon>mdi-format-align-left</v-icon></v-btn
        >

        <v-btn
          min-width="0"
          class="px-2"
          text
          @click="editor.chain().focus().setTextAlign('center').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
        >
          <v-icon>mdi-format-align-center</v-icon>
        </v-btn>

        <v-btn
          min-width="0"
          class="px-2"
          text
          @click="editor.chain().focus().setTextAlign('right').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
        >
          <v-icon>mdi-format-align-right</v-icon>
        </v-btn>

        <v-btn
          min-width="0"
          class="px-2"
          text
          @click="editor.chain().focus().setTextAlign('justify').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }"
        >
          <v-icon>mdi-format-align-justify</v-icon>
        </v-btn>

        <!-- 사진 업로드 image upload -->
        <v-btn min-width="0" class="pl-2 pr-0" text>
          <v-file-input
            v-model="selectedImages"
            min-width="0"
            hide-spin-buttons
            :hide-details="true"
            hide-input
            multiple
            single-line
            name="images"
            accept="image/*"
            prepend-icon="mdi-image-plus"
            color="blue"
            class="pa-0 ma-0"
            @change="getImagesURL"
          ></v-file-input>
        </v-btn>
        |
        <!-- 테이블 table -->
        <!-- 테이블 생성 create table -->
        <v-btn
          min-width="0"
          class="px-2"
          text
          @click="
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          "
        >
          <v-icon>mdi-table-plus</v-icon>
        </v-btn>

        <!-- 테이블 삭제 delete table -->
        <v-btn
          min-width="0"
          class="px-2"
          text
          @click="editor.chain().focus().deleteTable().run()"
        >
          <v-icon>mdi-table-remove</v-icon>
        </v-btn>

        <!-- 왼쪽 열 추가 add column before -->
        <v-btn
          min-width="0"
          class="px-2"
          text
          @click="editor.chain().focus().addColumnBefore().run()"
        >
          <v-icon>mdi-table-column-plus-before</v-icon>
        </v-btn>

        <!-- 오른쪽 열 추가 add column after -->
        <v-btn
          min-width="0"
          class="px-2"
          text
          @click="editor.chain().focus().addColumnAfter().run()"
        >
          <v-icon>mdi-table-column-plus-after</v-icon>
        </v-btn>
        <!-- 열 삭제  delete column -->
        <v-btn
          min-width="0"
          class="px-2"
          text
          @click="editor.chain().focus().deleteColumn().run()"
        >
          <v-icon>mdi-table-column-remove</v-icon>
        </v-btn>

        <!-- 위쪽 행 추가 add row before -->
        <v-btn
          min-width="0"
          class="px-2"
          text
          @click="editor.chain().focus().addRowBefore().run()"
        >
          <v-icon>mdi-table-row-plus-before</v-icon>
        </v-btn>

        <!-- 아래쪽 행 추가 add row after  -->
        <v-btn
          min-width="0"
          class="px-2"
          text
          @click="editor.chain().focus().addRowAfter().run()"
        >
          <v-icon>mdi-table-row-plus-after</v-icon>
        </v-btn>

        <!-- 행 삭제 delete row -->
        <v-btn
          min-width="0"
          class="px-2"
          text
          @click="editor.chain().focus().deleteRow().run()"
        >
          <v-icon>mdi-table-row-remove</v-icon>
        </v-btn>

        <!-- 셀 병합/셀 분할 토글  merge cell/split cell toggle -->
        <v-btn
          min-width="0"
          class="px-2"
          text
          @click="editor.chain().focus().mergeOrSplit().run()"
        >
          <v-icon>mdi-table-merge-cells</v-icon>
        </v-btn>

        <!-- 헤더 토글 header toggle  -->
        <v-btn
          min-width="0"
          class="px-2"
          text
          @click="editor.chain().focus().toggleHeaderCell().run()"
        >
          <v-icon>mdi-table-headers-eye</v-icon>
        </v-btn>

        |
      </v-col>

      <!-- 에디터 editor -->
      <v-col cols="12">
        <v-card flat outlined rounded="xl" min-height="300">
          <v-card-text style="line-height: 1rem">
            <editor-content
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              :editor="editor"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-btn block outlined rounded color="success" @click="savePost()"
          >저장하기</v-btn
        ></v-col
      >
      {{ result }}
    </v-row>
  </v-container>
</template>

<script>
const codingListJson = require("../../assets/json/codingList.json");

import { Editor, EditorContent, VueNodeViewRenderer } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import Italic from "@tiptap/extension-italic";
import CodeBlock from "@tiptap/extension-code-block";
import Highlight from "@tiptap/extension-highlight";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import History from "@tiptap/extension-history";
import Link from "@tiptap/extension-link";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Image from "@tiptap/extension-image";
import Strike from "@tiptap/extension-strike";
import Blockquote from "@tiptap/extension-blockquote";
import Dropcursor from "@tiptap/extension-dropcursor";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";

import lowlight from "lowlight";
import languageListVue from "./languageList.vue";

// export const convertURLtoFile = async (url) => {
//   const response = await fetch(url);
//   const data = await response.blob();
//   const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
//   const filename = url.split("/").pop(); // url 구조에 맞게 수정할 것
//   const metadata = { type: `image/${ext}` };
//   return new File([data], filename, metadata);
// };

export default {
  components: {
    EditorContent,
  },

  data() {
    return {
      title: "",
      editor: null,
      selectedItem: null,
      selectedImages: [],
      imageURL: [],
      codingList: codingListJson,
      dialog: false,
      menu: false,
      textColor: "#000000",
      highlightColor: "#000000",
      postingImages: [],
      result: null,
    };
  },

  methods: {
    savePost() {
      const html = this.editor.getHTML();
      // const json = this.editor.getJSON();

      var formData = new FormData();
      formData.append("list", this.selectedItem);
      formData.append("title", this.title);
      formData.append("content", html);
      formData.append("date", new Date().toISOString().slice(0, 10));

      for (let index = 0; index < this.postingImages.length; index++) {
        formData.append("images", this.postingImages[index]);
      }

      this.$http
        .post("/api/coding/savePost", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.result = response.data;
          console.log("저장성공");
        });
    },
    getImagesURL() {
      // if (!this.selectedImages) {
      //   this.loading = !this.loading;
      //   return (this.previewImage = undefined);
      // }
      // this.postingImages = [];
      // this.selectedImages.forEach((value, index, arr) => {
      //   this.imageURL = URL.createObjectURL(value);
      //   this.postingImages.push(value);
      //   return this.editor
      //     .chain()
      //     .focus()
      //     .setImage({ src: this.imageURL, title: value.name })
      //     .run();
      // });
      var formData = new FormData();

      for (let index = 0; index < this.selectedImages.length; index++) {
        formData.append("images", this.selectedImages[index]);
      }

      this.$http
        .post("/api/coding/uploadTempImages", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.result = response.data;
          console.log(response.data);
          response.data.forEach((element) => {
            return this.editor.chain().focus().setImage({ src: element }).run();
          });
        });

      // this.loading = !this.loading;
    },
  },
  mounted() {
    this.editor = new Editor({
      content: ``,
      extensions: [
        Document,
        Paragraph,
        Text,
        Heading,
        Bold,
        Underline,
        Italic,
        // CodeBlock,
        CodeBlockLowlight.extend({
          addNodeView() {
            return VueNodeViewRenderer(languageListVue);
          },
        }).configure({
          defaultLanguage: "javascript",
          languageClassPrefix: "language-",
          lowlight,
        }),
        Superscript,
        Subscript,
        TextStyle.configure({
          HTMLAttributes: {
            class: "my-custom-class",
          },
        }),
        Color,
        History,
        Image.configure({
          inline: true,
          HTMLAttributes: {
            class: "rounded-xl",
          },
        }),
        Highlight.configure({
          multicolor: true,
          // HTMLAttributes: { class: this.textColor },
        }),
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        Strike,
        Blockquote,
        Dropcursor,
        HorizontalRule,
        BulletList,
        OrderedList,
        ListItem,
        TaskList,
        TaskItem.configure({
          nested: true,
        }),
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableHeader,
        TableCell,
      ],
    });
  },

  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>
<style lang="scss">
* :focus {
  outline: none;
}

.v-file-input .v-icon {
  color: black;
}

ul[data-type="taskList"] {
  list-style: none;
  padding: 0;

  p {
    margin: 0;
  }

  li {
    display: flex;

    > label {
      flex: 0 0 auto;
      margin-right: 0.5rem;
      user-select: none;
    }

    > div {
      flex: 1 1 auto;
    }
  }
}

mark {
  color: inherit;
  background-color: #fffa78;
  padding: 0.125em 0;
  border-radius: 0.25em;
  box-decoration-break: clone !important;
}
img {
  position: center center;
  max-width: 100%;
  height: auto;
}
canvas {
  border-radius: 1rem;
}
/* Basic editor styles */
.ProseMirror {
  color: #0d0d0d;
  min-height: 300px;

  > * + * {
    margin-top: 0.75em;
  }
  input {
    border-radius: 1rem;
    background-color: #70cff8;
  }

  p {
    margin: 5px;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 3px solid rgba(#0d0d0d, 0.1);
  }
  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: "BMJUA", monospace;
    padding: 0.75rem 1rem;
    border-radius: 1rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }

    .hljs-comment,
    .hljs-quote {
      color: #616161;
    }

    .hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-name,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class {
      color: #f98181;
    }

    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: #fbbc88;
    }

    .hljs-string,
    .hljs-symbol,
    .hljs-bullet {
      color: #b9f18d;
    }

    .hljs-title,
    .hljs-section {
      color: #faf594;
    }

    .hljs-keyword,
    .hljs-selector-tag {
      color: #70cff8;
    }

    .hljs-emphasis {
      font-style: italic;
    }

    .hljs-strong {
      font-weight: 700;
    }
  }
  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;

    td,
    th {
      min-width: 1em;
      border: 2px solid #ced4da;
      padding: 3px 5px;
      vertical-align: top;
      box-sizing: border-box;
      position: relative;

      > * {
        margin-bottom: 0;
      }
    }

    th {
      font-weight: bold;
      text-align: left;
      background-color: #f1f3f5;
    }

    .selectedCell:after {
      z-index: 2;
      position: absolute;
      content: "";
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(200, 200, 255, 0.4);
      pointer-events: none;
    }

    .column-resize-handle {
      position: absolute;
      right: -2px;
      top: 0;
      bottom: -2px;
      width: 4px;
      background-color: #adf;
      pointer-events: none;
    }

    p {
      margin: 0;
    }
  }
}

.tableWrapper {
  padding: 1rem 0;
  overflow-x: auto;
}

.resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}
</style>
