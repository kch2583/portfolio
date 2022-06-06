<template>
  <node-view-wrapper class="code-block">
    <v-select
      :items="languages"
      contenteditable="false"
      v-model="selectedLanguage"
      rounded
      hide-details
      dense
      background-color="white"
      :menu-props="{
        rounded: 'xl',
        offsetY: true,
        bottom: true,
      }"
    >
      <!-- <option :value="null">auto</option>
      <option disabled>—</option>
      <option
        v-for="(language, index) in languages"
        :value="language"
        :key="index"
      >
        {{ language }}
      </option> -->
    </v-select>
    <pre><node-view-content as="code" /></pre>
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, NodeViewContent, nodeViewProps } from "@tiptap/vue-2";

export default {
  components: {
    NodeViewWrapper,
    NodeViewContent,
  },

  props: nodeViewProps,

  data() {
    return {
      languages: this.extension.options.lowlight.listLanguages(),
    };
  },

  computed: {
    selectedLanguage: {
      get() {
        return this.node.attrs.language;
      },
      set(language) {
        this.updateAttributes({ language });
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.code-block {
  position: relative;

  .v-select {
    width: 27%;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
}
</style>
