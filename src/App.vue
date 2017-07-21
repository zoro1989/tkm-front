<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="less">
  @import "../node_modules/muse-ui/less/vars.less";
  @import "../node_modules/muse-ui/less/theme-vars.less";  // 默认组件变量

  // 修改组件变量
  @avatarBackgroundColor: lighten(@alternateTextColor, 26%);
  @datePickerHeaderColor: fade(@fullWhite, 12%);
  @timePickerHeaderColor: fade(@fullWhite, 12%);
  @timePickerClockCircleColor: fade(@fullWhite, 12%);
  @avatarBackgroundColor: lighten(@alternateTextColor, 26%);
  @chipColor: lighten(@alternateTextColor, 12%);
  @floatButtonDisabledColor: lighten(@alternateTextColor, 12%);

  @tableRowHoverBackgroundColor: fade(@textColor, 10%);
  @tableRowSelectedBackgroundColor: fade(@textColor, 5%);

  @import "../node_modules/muse-ui/less/theme.less"; // 主题相关的样式
  @fontFamily: Roboto, Lato, sans-serif;  // 字体

  // 主色和强调色
  @primaryColor: @orange500;           // 主色
  @darkerPrimaryColor: @orange700;  // 更深的主色
  @lighterPrimaryColor: @grey400;      // 浅一点的主色
  @accentColor: @pinkA200;             // 强调色
  @darkerAccentColor: @grey100;        // 更深的强调色
  @lighterAccentColor: @grey500;       // 浅一点的强调色

  // 文本颜色
  @textColor: @darkBlack;
  @secondaryTextColor: fade(@fullBlack, 54%);
  @alternateTextColor: @white;
  @borderColor: fade(@fullBlack, 12%);
  @disabledColor: fade(@fullBlack, 38%);

  // background
  @backgroundColor: @white;           // 背景色
  @statusBarBackgroundColor: @grey300; // web项目没有状态栏，所以也没有使用
  @appbarBackgroundColor: @grey100; // 并未在appbar组件中应用
  @dialogBackgroundColor: @white; // dialogs、 cards、 paper 组件背景

  // icon color
  @activeIconColor: fade(@fullBlack, 54%);
  @inActiveIconColor: fade(@fullBlack, 38%);

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
