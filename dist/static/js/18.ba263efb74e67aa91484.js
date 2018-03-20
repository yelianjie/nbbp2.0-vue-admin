webpackJsonp([18,80],{"/6xR":function(o,t,n){(o.exports=n("BkJT")(!1)).push([o.i,"\n@charset \"UTF-8\";\n.todoapp {\n  font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;\n  line-height: 1.4em;\n  color: #4d4d4d;\n  min-width: 230px;\n  max-width: 550px;\n  margin: 0 auto;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-weight: 300;\n  background: #fff;\n  z-index: 1;\n  position: relative;\n  /*\r\n\tHack to remove background from Mobile Safari.\r\n\tCan't use it globally since it destroys checkboxes in Firefox\r\n*/\n}\n.todoapp button {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    background: none;\n    font-size: 100%;\n    vertical-align: baseline;\n    font-family: inherit;\n    font-weight: inherit;\n    color: inherit;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n         appearance: none;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}\n.todoapp :focus {\n    outline: 0;\n}\n.todoapp .hidden {\n    display: none;\n}\n.todoapp .todoapp {\n    background: #fff;\n    margin: 130px 0 40px 0;\n    position: relative;\n    -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);\n            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);\n}\n.todoapp .todoapp input::-webkit-input-placeholder {\n    font-style: italic;\n    font-weight: 300;\n    color: #e6e6e6;\n}\n.todoapp .todoapp input::-moz-placeholder {\n    font-style: italic;\n    font-weight: 300;\n    color: #e6e6e6;\n}\n.todoapp .todoapp input::input-placeholder {\n    font-style: italic;\n    font-weight: 300;\n    color: #e6e6e6;\n}\n.todoapp .todoapp h1 {\n    position: absolute;\n    top: -155px;\n    width: 100%;\n    font-size: 100px;\n    font-weight: 100;\n    text-align: center;\n    color: rgba(175, 47, 47, 0.15);\n    -webkit-text-rendering: optimizeLegibility;\n    -moz-text-rendering: optimizeLegibility;\n    text-rendering: optimizeLegibility;\n}\n.todoapp .new-todo,\n  .todoapp .edit {\n    position: relative;\n    margin: 0;\n    width: 100%;\n    font-size: 18px;\n    font-family: inherit;\n    font-weight: inherit;\n    line-height: 1.4em;\n    border: 0;\n    color: inherit;\n    padding: 6px;\n    border: 1px solid #999;\n    -webkit-box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);\n            box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}\n.todoapp .new-todo {\n    padding: 10px 16px 16px 60px;\n    border: none;\n    background: rgba(0, 0, 0, 0.003);\n    -webkit-box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);\n            box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);\n}\n.todoapp .main {\n    position: relative;\n    z-index: 2;\n    border-top: 1px solid #e6e6e6;\n}\n.todoapp .toggle-all {\n    text-align: center;\n    border: none;\n    /* Mobile Safari */\n    opacity: 0;\n    position: absolute;\n}\n.todoapp .toggle-all + label {\n    width: 60px;\n    height: 34px;\n    font-size: 0;\n    position: absolute;\n    top: -52px;\n    left: -13px;\n    -webkit-transform: rotate(90deg);\n    transform: rotate(90deg);\n}\n.todoapp .toggle-all + label:before {\n    content: '\\276F';\n    font-size: 22px;\n    color: #e6e6e6;\n    padding: 10px 27px 10px 27px;\n}\n.todoapp .toggle-all:checked + label:before {\n    color: #737373;\n}\n.todoapp .todo-list {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n}\n.todoapp .todo-list li {\n    position: relative;\n    font-size: 24px;\n    border-bottom: 1px solid #ededed;\n}\n.todoapp .todo-list li:last-child {\n    border-bottom: none;\n}\n.todoapp .todo-list li.editing {\n    border-bottom: none;\n    padding: 0;\n}\n.todoapp .todo-list li.editing .edit {\n    display: block;\n    width: 506px;\n    padding: 12px 16px;\n    margin: 0 0 0 43px;\n}\n.todoapp .todo-list li.editing .view {\n    display: none;\n}\n.todoapp .todo-list li .toggle {\n    text-align: center;\n    width: 40px;\n    /* auto, since non-WebKit browsers doesn't support input styling */\n    height: auto;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    margin: auto 0;\n    border: none;\n    /* Mobile Safari */\n    -webkit-appearance: none;\n    -moz-appearance: none;\n         appearance: none;\n}\n.todoapp .todo-list li .toggle {\n    opacity: 0;\n}\n.todoapp .todo-list li .toggle + label {\n    /*\r\n\t\tFirefox requires `#` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433\r\n\t\tIE and Edge requires *everything* to be escaped to render, so we do that instead of just the `#` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/\r\n\t*/\n    background-image: url(\"data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E\");\n    background-repeat: no-repeat;\n    background-position: center left;\n    background-size: 36px;\n}\n.todoapp .todo-list li .toggle:checked + label {\n    background-size: 36px;\n    background-image: url(\"data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E\");\n}\n.todoapp .todo-list li label {\n    word-break: break-all;\n    padding: 15px 15px 15px 50px;\n    display: block;\n    line-height: 1.0;\n    font-size: 14px;\n    -webkit-transition: color 0.4s;\n    transition: color 0.4s;\n}\n.todoapp .todo-list li.completed label {\n    color: #d9d9d9;\n    text-decoration: line-through;\n}\n.todoapp .todo-list li .destroy {\n    display: none;\n    position: absolute;\n    top: 0;\n    right: 10px;\n    bottom: 0;\n    width: 40px;\n    height: 40px;\n    margin: auto 0;\n    font-size: 30px;\n    color: #cc9a9a;\n    -webkit-transition: color 0.2s ease-out;\n    transition: color 0.2s ease-out;\n}\n.todoapp .todo-list li .destroy:hover {\n    color: #af5b5e;\n}\n.todoapp .todo-list li .destroy:after {\n    content: '\\D7';\n}\n.todoapp .todo-list li:hover .destroy {\n    display: block;\n}\n.todoapp .todo-list li .edit {\n    display: none;\n}\n.todoapp .todo-list li.editing:last-child {\n    margin-bottom: -1px;\n}\n.todoapp .footer {\n    color: #777;\n    position: relative;\n    padding: 10px 15px;\n    height: 40px;\n    text-align: center;\n    border-top: 1px solid #e6e6e6;\n}\n.todoapp .footer:before {\n    content: '';\n    position: absolute;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    height: 50px;\n    overflow: hidden;\n    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);\n            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);\n}\n.todoapp .todo-count {\n    float: left;\n    text-align: left;\n}\n.todoapp .todo-count strong {\n    font-weight: 300;\n}\n.todoapp .filters {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n}\n.todoapp .filters li {\n    display: inline;\n}\n.todoapp .filters li a {\n    color: inherit;\n    font-size: 12px;\n    padding: 3px 7px;\n    text-decoration: none;\n    border: 1px solid transparent;\n    border-radius: 3px;\n}\n.todoapp .filters li a:hover {\n    border-color: rgba(175, 47, 47, 0.1);\n}\n.todoapp .filters li a.selected {\n    border-color: rgba(175, 47, 47, 0.2);\n}\n.todoapp .clear-completed,\n  .todoapp html .clear-completed:active {\n    float: right;\n    position: relative;\n    line-height: 20px;\n    text-decoration: none;\n    cursor: pointer;\n}\n.todoapp .clear-completed:hover {\n    text-decoration: underline;\n}\n.todoapp .info {\n    margin: 65px auto 0;\n    color: #bfbfbf;\n    font-size: 10px;\n    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);\n    text-align: center;\n}\n.todoapp .info p {\n    line-height: 1;\n}\n.todoapp .info a {\n    color: inherit;\n    text-decoration: none;\n    font-weight: 400;\n}\n.todoapp .info a:hover {\n    text-decoration: underline;\n}\n@media screen and (-webkit-min-device-pixel-ratio: 0) {\n.todoapp .toggle-all,\n    .todoapp .todo-list li .toggle {\n      background: none;\n}\n.todoapp .todo-list li .toggle {\n      height: 40px;\n}\n}\n@media (max-width: 430px) {\n.todoapp .footer {\n      height: 50px;\n}\n.todoapp .filters {\n      bottom: 10px;\n}\n}\n",""])},"3cXf":function(o,t,n){o.exports={default:n("4rP4"),__esModule:!0}},"4rP4":function(o,t,n){var e=n("UusJ"),i=e.JSON||(e.JSON={stringify:JSON.stringify});o.exports=function(o){return i.stringify.apply(i,arguments)}},jfHn:function(o,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=n("3cXf"),i=n.n(e),a={all:function(o){return o},active:function(o){return o.filter(function(o){return!o.done})},completed:function(o){return o.filter(function(o){return o.done})}},d=[{text:"star this repository",done:!1},{text:"fork this repository",done:!1},{text:"follow author",done:!1},{text:"vue-element-admin",done:!0},{text:"vue",done:!0},{text:"element-ui",done:!0},{text:"axios",done:!0},{text:"webpack",done:!0}],l={components:{Todo:n("xjg9").default},data:function(){return{visibility:"all",filters:a,todos:d}},computed:{allChecked:function(){return this.todos.every(function(o){return o.done})},filteredTodos:function(){return a[this.visibility](this.todos)},remaining:function(){return this.todos.filter(function(o){return!o.done}).length}},methods:{setLocalStorgae:function(){window.localStorage.setItem("todos",i()(this.todos))},addTodo:function(o){var t=o.target.value;t.trim()&&(this.todos.push({text:t,done:!1}),this.setLocalStorgae()),o.target.value=""},toggleTodo:function(o){o.done=!o.done,this.setLocalStorgae()},deleteTodo:function(o){this.todos.splice(this.todos.indexOf(o),1),this.setLocalStorgae()},editTodo:function(o){var t=o.todo,n=o.value;t.text=n,this.setLocalStorgae()},clearCompleted:function(){this.todos=this.todos.filter(function(o){return!o.done}),this.setLocalStorgae()},toggleAll:function(o){var t=this,n=o.done;this.todos.forEach(function(o){o.done=n,t.setLocalStorgae()})}},filters:{pluralize:function(o,t){return 1===o?t:t+"s"},capitalize:function(o){return o.charAt(0).toUpperCase()+o.slice(1)}}},r={render:function(){var o=this,t=o.$createElement,n=o._self._c||t;return n("section",{staticClass:"todoapp"},[n("header",{staticClass:"header"},[n("input",{staticClass:"new-todo",attrs:{autocomplete:"off",placeholder:"Todo List"},on:{keyup:function(t){if(!("button"in t)&&o._k(t.keyCode,"enter",13,t.key))return null;o.addTodo(t)}}})]),o._v(" "),n("section",{directives:[{name:"show",rawName:"v-show",value:o.todos.length,expression:"todos.length"}],staticClass:"main"},[n("input",{staticClass:"toggle-all",attrs:{id:"toggle-all",type:"checkbox"},domProps:{checked:o.allChecked},on:{change:function(t){o.toggleAll({done:!o.allChecked})}}}),o._v(" "),n("label",{attrs:{for:"toggle-all"}}),o._v(" "),n("ul",{staticClass:"todo-list"},o._l(o.filteredTodos,function(t,e){return n("todo",{key:e,attrs:{todo:t},on:{toggleTodo:o.toggleTodo,editTodo:o.editTodo,deleteTodo:o.deleteTodo}})}))]),o._v(" "),n("footer",{directives:[{name:"show",rawName:"v-show",value:o.todos.length,expression:"todos.length"}],staticClass:"footer"},[n("span",{staticClass:"todo-count"},[n("strong",[o._v(o._s(o.remaining))]),o._v("\n      "+o._s(o._f("pluralize")(o.remaining,"item"))+" left\n    ")]),o._v(" "),n("ul",{staticClass:"filters"},o._l(o.filters,function(t,e){return n("li",{key:e},[n("a",{class:{selected:o.visibility===e},on:{click:function(t){t.preventDefault(),o.visibility=e}}},[o._v(o._s(o._f("capitalize")(e)))])])}))])])},staticRenderFns:[]};var s=n("/Xao")(l,r,!1,function(o){n("yTYw")},null,null);t.default=s.exports},xjg9:function(o,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e={render:function(){var o=this,t=o.$createElement,n=o._self._c||t;return n("li",{staticClass:"todo",class:{completed:o.todo.done,editing:o.editing}},[n("div",{staticClass:"view"},[n("input",{staticClass:"toggle",attrs:{type:"checkbox"},domProps:{checked:o.todo.done},on:{change:function(t){o.toggleTodo(o.todo)}}}),o._v(" "),n("label",{domProps:{textContent:o._s(o.todo.text)},on:{dblclick:function(t){o.editing=!0}}}),o._v(" "),n("button",{staticClass:"destroy",on:{click:function(t){o.deleteTodo(o.todo)}}})]),o._v(" "),n("input",{directives:[{name:"show",rawName:"v-show",value:o.editing,expression:"editing"},{name:"focus",rawName:"v-focus",value:o.editing,expression:"editing"}],staticClass:"edit",domProps:{value:o.todo.text},on:{keyup:[function(t){if(!("button"in t)&&o._k(t.keyCode,"enter",13,t.key))return null;o.doneEdit(t)},function(t){if(!("button"in t)&&o._k(t.keyCode,"esc",27,t.key))return null;o.cancelEdit(t)}],blur:o.doneEdit}})])},staticRenderFns:[]},i=n("/Xao")({name:"Todo",props:["todo"],data:function(){return{editing:!1}},directives:{focus:function(o,t,n){var e=t.value,i=n.context;e&&i.$nextTick(function(){o.focus()})}},methods:{deleteTodo:function(o){this.$emit("deleteTodo",o)},editTodo:function(o){var t=o.todo,n=o.value;this.$emit("editTodo",{todo:t,value:n})},toggleTodo:function(o){this.$emit("toggleTodo",o)},doneEdit:function(o){var t=o.target.value.trim(),n=this.todo;t?this.editing&&(this.editTodo({todo:n,value:t}),this.editing=!1):this.deleteTodo({todo:n})},cancelEdit:function(o){o.target.value=this.todo.text,this.editing=!1}}},e,!1,null,null,null);t.default=i.exports},yTYw:function(o,t,n){var e=n("/6xR");"string"==typeof e&&(e=[[o.i,e,""]]),e.locals&&(o.exports=e.locals);n("8bSs")("48518477",e,!0)}});