"use strict";

Backbone.sync = function (method, model, options) {
    options.success(model);
};

var App,
    Todo = Backbone.Model.extend({
        defaults: {
            done: false,
            important: false
        },
        toggleDone: function () {
            var done = !this.get('done');
            this.save({done: done});
        },
        toggleImportance: function () {
            var important = !this.get('important');
            this.save({important: important});
        },
        clear: function () {
            this.destroy();
        }
    }),
    
    TodoList = Backbone.Collection.extend({
        model: Todo
    }),
    list = new TodoList({}),
    
    TodoView = Backbone.View.extend({
        tagName: "li",
        template: _.template($('#template').html()),
        events: {
            "click .deleteBtn": "deleteItem",
            "click .doneBtn": "toggleDone",
            "click .priorityBtn": "toggleImportance"
        },
        initialize: function () {
            this.model.bind('destroy', this.remove, this);
            this.model.bind('change', this.render, this);
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        toggleDone: function () {
            this.model.toggleDone();
        },
        deleteItem: function () {
            this.model.clear();
        },
        toggleImportance: function () {
            this.model.toggleImportance();
        }
    }),

    AppView = Backbone.View.extend({
        el: $('body'),
        events: {
            "keypress #input": "enterPressed"
        },
        initialize: function () {
            this.input = this.$('#input');
            this.importantList = this.$('#important');
            this.normalList = this.$('#normal');
            this.doneList = this.$('#done');

            list.bind('add', this.add, this);
            list.bind('change', this.change, this);
            
            list.fetch();
        },
        add: function (todo) {
            var view = new TodoView({model: todo});
            todo.el = view.render().el;

            this.change(todo);
        },
        change: function (todo) {
            if (todo.get('done')) {
                this.doneList.append(todo.el);
            }
            else if (todo.get('important')) {
                this.importantList.append(todo.el);
            }
            else {
                this.normalList.append(todo.el);
            }
        },
        enterPressed: function (e) {
            var text = this.input.val();
            if (e.keyCode === 13 && $.trim(text).length) {
                list.create({title: text});
                this.input.val('');
            }
        }
    });
    
App = new AppView();