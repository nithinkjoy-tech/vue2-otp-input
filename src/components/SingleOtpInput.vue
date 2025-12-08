<template>
  <div style="display: flex; align-items: center;">
    <input
      ref="input"
      :type="inputType"
      :inputmode="inputMode"
      min="0"
      max="9"
      maxlength="1"
      pattern="[0-9]"
      v-model="model"
      :class="inputClasses"
      :autocomplete="index === 0 ? 'one-time-code' : 'off'"
      @input="handleOnChange"
      @keydown="handleOnKeyDown"
      @paste="handleOnPaste"
      @focus="handleOnFocus"
      @blur="handleOnBlur"
    />
    <span v-if="!isLastChild && separator">
      <span v-html="separator"></span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'SingleOtpInput',
  props: {
    value: {
      type: String,
    },
    separator: {
      type: String,
    },
    index: {
      type: Number,
    },
    focus: {
      type: Boolean,
    },
    inputClasses: {
      type: String,
    },
    shouldAutoFocus: {
      type: Boolean,
    },
    inputType: {
      type: String,
      default() {
        return 'tel';
      },
    },
    inputMode: {
      type: String,
      default() {
        return 'text';
      },
    },
    isLastChild: {
      type: Boolean,
    },
  },
  data() {
    return {
      model: this.value || '',
    };
  },
  mounted() {
    if (this.$refs.input && this.focus && this.shouldAutoFocus) {
      this.$refs.input.focus();
    }
  },
  watch: {
    value(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.model = newValue;
      }
    },
    // whenever question changes, this function will run
    focus(newFocusValue, oldFocusValue) {
      // Check if focusedInput changed
      // Prevent calling function if input already in focus
      if (oldFocusValue !== newFocusValue && (this.$refs.input && this.focus)) {
        this.$refs.input.focus();
        this.$refs.input.select();
      }
    },
  },
  methods: {
    handleOnChange() {
      if (this.model.length > 1) {
        if (this.index === 0) {
          if (!this.detectBrowser().isSafari) {
            const fakeEvent = {
              clipboardData: {
                getData: () => this.model,
              },
              preventDefault: () => {},
            };
            this.handleOnPaste(fakeEvent);
          }
        } else {
          this.model = this.model.slice(0, 1);
        }
      } else {
        this.$emit(
          'on-change',
          this.model,
        );
      }
    },
    detectBrowser() {
      const userAgent = navigator.userAgent.toLowerCase();

      const isChrome = /chrome|chromium/.test(userAgent) && !/edg|opr|firefox/.test(userAgent);
      const isChromeIOS = /crios/.test(userAgent);
      const isSafari = /safari/.test(userAgent) && !/chrome|crios|chromium|edg|opr|firefox/.test(userAgent);

      return {
        isChrome: isChrome || isChromeIOS, // Treat iOS Chrome as Chrome
        isSafari,
      };
    },
    handleOnKeyDown(event) {
      // Only allow characters 0-9, DEL, Backspace, Enter, Right and Left Arrows, and Pasting
      const keyEvent = (event) || window.event;
      const charCode = (keyEvent.which) ? keyEvent.which : keyEvent.keyCode;
      if (this.isCodeNumeric(charCode) || [8, 9, 13, 37, 39, 46, 86].includes(charCode)) {
        this.$emit('on-keydown', event);
      } else {
        keyEvent.preventDefault();
      }
    },
    isCodeNumeric(charCode) {
      // numeric keys and numpad keys
      return (charCode >= 48 && charCode <= 57) || (charCode >= 96 && charCode <= 105);
    },
    handleOnPaste(event) {
      return this.$emit('on-paste', event);
    },
    handleOnFocus() {
      this.$refs.input.select();
      return this.$emit('on-focus');
    },
    handleOnBlur() {
      return this.$emit('on-blur');
    },
  },
};
</script>
