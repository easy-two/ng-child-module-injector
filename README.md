# ng-custom-injector-modules

This is repo with examples how to create child module injectors in angular application.

## The real world problem

How to know which one of your views requested the data from server?

## Structure

Project contains 4 separated angular cli based applications with different level of code complexity and purposes.

- root
  - readme
  - examples
    - eager-modules-example - (shows the problem with root module injector)
    - simple-child-modules-injector-example - (shows the technique how to create child module injector on component level)
    - complex-child-modules-injector-example - (extends previous part with interceptors)
    - production-ready-example - (shows how to use it in production on module level)
