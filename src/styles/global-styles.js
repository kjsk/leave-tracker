import { createGlobalStyle } from "styled-components"
// Abstracts
import * as palette from "./variables"

export const GlobalStyle = createGlobalStyle`
  @-ms-viewport {
  width: device-width;
  }
  html {
  box-sizing: border-box;
  font-size: 13pt;
  -webkit-tap-highlight-color: transparent;
  -webkit-font-smoothing: antialiased;
  overflow-y: auto;
  scroll-behavior: smooth;
  }

  body {
  -ms-overflow-style: scrollbar;
  line-height: 1;
  -webkit-text-size-adjust: none;
  -webkit-font-smoothing: antialiased;
  background-color: ${palette.APP_BACKGROUND_COLOR} !important;
  }

  html, body, #root {
  width: 100%;
  height: 100%;
  }

  *, *:before, *:after {
  box-sizing: inherit;
  }

  html, body, div, span, applet, object,
  iframe, h1, h2, h3, h4, h5, h6, p, blockquote,
  pre, a, abbr, acronym, address, big, cite,
  code, del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var, b,
  u, i, center, dl, dt, dd, ol, ul, li, fieldset,
  form, label, legend, table, caption, tbody,
  tfoot, thead, tr, th, td, article, aside,
  canvas, details, embed, figure, figcaption,
  footer, header, hgroup, menu, nav, output, ruby,
  section, summary, time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  }

  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
  display: block;
  }

  ol, ul {
  list-style: none;
  }

  blockquote, q {
  quotes: none;
  }
  blockquote:before, blockquote:after, q:before, q:after {
  content: none;
  }
  input::-moz-focus-inner {
  border: 0;
  padding: 0;
  }
  input, select, textarea {
  -moz-appearance: none;
  -webkit-appearance: none;
  -ms-appearance: none;
  appearance: none;
  }
  body, input, select, textarea, button {
  font-family: ${palette.FONT_FAMILY} !important;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.65;
  }
  section {
  position: relative;
  }
  a {
  -moz-transition: color 0.2s ease-in-out;
  -webkit-transition: color 0.2s ease-in-out;
  -ms-transition: color 0.2s ease-in-out;
  transition: color 0.2s ease-in-out;
  text-decoration: none;
  }
  strong {
  font-weight: 600;
  }

  h1,h2,h3,h4,h5,h6 {
  line-height: 1.25;
  }

  h1 {
  font-size: 36px;
  }

  h2 {
    font-weight: 600;
    font-size: 26px;
    line-height: 39px;
    color: ${palette.PRIMARY_TXT_COLOR};
  }

  h3 {
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    color: ${palette.PRIMARY_TXT_COLOR};
  }

  h4 {
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
  }

  h5 {
    font-weight: 600;
    font-size: 16px;
    line-height: 32px;
  }

  img {
    width: 100%;
  }

  p {
    font-family: ${palette.CONTENT_FONT_FAMILY};
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    color: ${palette.PRIMARY_TXT_COLOR};
  }
  
  .ant-message-notice {
    text-align: right;
  }

  .ant-modal-mask {
    background-color: #0000002e !important;
  }
  .ant-modal-mask, .ant-modal-wrap {
    left: 65px !important;
  }
  .ant-modal {
    width: initial !important;
    max-width: 500px;
    top: 90px !important;
    margin: 0 !important;
  }
  .ant-modal-content {
    width: 550px;
    margin: auto;
    padding: 40px;
    top: 15% !important;
    border-radius: 12px !important;
  }
  .ant-modal-body {
    padding: 0px !important;
  }

  .ant-select {
    font-weight: normal;
    font-size: 16px;
    line-height: 24px !important;
    color: ${palette.CHARCOAL};
    .ant-select-arrow {
      right: 20px;
    }
  }
  .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
    background-color: ${palette.PRIMARY_SECTION_BACKGROUND};
  }
  .ant-select-selector {
    height: 48px !important;
    min-height: 38px !important;
    display: flex !important;
    align-items: center !important;
    box-shadow: 0px 0px 5px rgba(25, 39, 67, 0.1) !important;
    border-radius: 8px !important;
    padding: 11px 24px !important;
    border: 1px solid ${palette.BORDER_COLOR} !important;
    &:hover {
      border-color: ${palette.BORDER_COLOR} !important;
    }
    .ant-select-selection-search-input {
      height: 48px !important;
      text-overflow: ellipsis;
    }
    .ant-select-selection-placeholder {
      color: ${palette.DARK_GREY};
    }
  }
  .ant-select-dropdown-menu-item {
    padding: 7px 14px !important;
  }
  .tags-selection {
    max-width: 100% !important;
  }
  .ant-tooltip {
    line-height: 1 !important;
  }
  .ant-tooltip-inner {
    min-height: 20px !important;
    font-size: 12px;
    font-weight: 600;
  }
  .ant-dropdown-menu-item {
    &:hover {
      background-color: #3b4ada14 !important;
    }
  }
  .ant-modal-header {
    background: initial !important;
    border-bottom: initial !important;
    .modal-title {
      font-size: 24px;
      color: #5860AF;;
      position: relative;
      padding-bottom: 12px;
      text-transform: capitalize;
      &::after {
        content: '';
        position: absolute;
        width: 100%;
        max-width: 75px;
        height: 4px;
        border-radius: 2px;
        background-color: #CAC8F6;
        bottom: 0px;
        left: 5px;
      }
    }
  }
  .ant-modal-footer {
    display: flex;
    justify-content: space-between;
    padding: 0 !important;
    border: initial !important;
  }
  .ant-btn {
    border: 1px solid #9FA2B4;
border-radius: 6px;
width: 223px;
height: 48px;
  }
  .ant-btn-primary {
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    background-color: ${palette.BUTTON_PRIMARY} !important;
    border-color: ${palette.BUTTON_PRIMARY} !important;
    color: ${palette.WHITE_COLOR} !important;
    &.active, &:hover, &:focus {
      color: ${palette.WHITE_COLOR} !important;
      border-color: ${palette.BUTTON_PRIMARY} !important;
    }
  }
  .ant-input {
    text-overflow: ellipsis;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px !important;
    color: ${palette.CHARCOAL};
    padding: 11px 24px;
    box-shadow: 0px 0px 5px rgba(25, 39, 67, 0.1) !important;
    border-radius: 8px;
    &:focus, &:hover {
      border: 1px solid ${palette.BORDER_COLOR} !important;
    }
    &:placeholder-shown {
      color: ${palette.DARK_GREY};
    }
  }

  .ant-modal-confirm-body-wrapper {
    padding: 25px;
  }
  .ant-modal-mask, .ant-modal-wrap {
    left: 0 !important;
  }
  .ant-modal {
    width: 100% !important;
    max-width: 100% !important;
    top: 0 !important;
    bottom: 0 !important;
    height: 100% !important;
    padding: 0 !important;
  }
  .ant-modal-title {
    display: flex;
    font-weight: 700;
    font-size: 32px;
    line-height: 42px;
    justify-content: space-between;
    color: ${palette.PRIMARY_TXT_COLOR};
  }
  .ant-modal-content {
    background: #FFFFFF;
  }
  .ant-modal-close {
    top: 10px;
    right: 20px;
  }
  .ant-modal-close-x {
    font-size: 20px;
  }
  .ant-modal-header {
    text-align: center;
    padding: 0;
  }

  .ant-checkbox-wrapper:hover .ant-checkbox-inner, .ant-checkbox:hover .ant-checkbox-inner, .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: ${palette.BUTTON_PRIMARY};
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${palette.BUTTON_PRIMARY};
    border-color: ${palette.BUTTON_PRIMARY};
  }
`
