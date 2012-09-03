ToDo-App
========

A Sample Application created to learn BackboneJs.

Architecture
------------
  1.	Todo: Holds data for each todo. Extends ‘Backbone.Model’. No default value specified for the title of a todo as a todo can only be created in the application by entering a title and then pressing Enter key. So if a todo was created by any other means, it should throw error. A todo can be marked as ‘done’ or as ‘important’. Todo can also be deleted.
  2.	TodoList: Collection of Todo objects. Extends ‘Backbone.Collection’
  3.	TodoView: view ‘class’ for a ToDo. Extends ‘Backbone.View’. Renders the todo using Underscore’s template engine. Also handles the buttons for marking as done or as important and also deleting of the todo.
  4.	AppView: view ‘class’ for the application. Extends ‘Backbone.View’. Handles the functionality of the input box.

In the application, more important todos are shown at the top, followed by other undone todos and finally, the done ones. For this, 3 different UL tags are present in the page. When a todo is to be added, it is added to one of these ULs based on its state.

Pending Tasks
-------------

  1. Add local storage
  2. Keyboard navigation
  3. Test cases using Jasmine framework.