
# Real World Typescript

## Topics covered in this section of course
1. Debugging
2. Importing Types
3. Declaration Files

## Learnings
###  Debugging
Debugging TypeScript code involves a mix of tools and techniques to identify and resolve issues efficiently. Below are some common ways to debug TypeScript code:
1. **Reading TypeScript Errors**    
    -   **Focus on the Bottom**: When dealing with complex TypeScript errors, remember that the most relevant information is often at the bottom of the error stack. Start there to quickly identify the issue.
2. **Using "Go to Definition" or "Peek Definition"**    
    -   **Code Navigation**: In VS Code and similar editors, you can use features like "Go to Definition" or "Peek Definition" to quickly navigate through your codebase. This is especially useful when debugging or understanding how different parts of your code are connected.
3. **Code Editor or IDE Extensions for TypeScript**    
    -  If you are using advanced code editors or IDEs like VS Code or PHP storm, check for the extensions available  and use them for showing the typescript errors formatted for better readability
4. **Using TypeScript Directives**    
    -   **@ts-ignore**: Use this directive to ignore specific TypeScript errors on a line of code. This should be used sparingly, as it can mask legitimate issues.
    -   **@ts-expect-error**: This directive is more intentional than `@ts-ignore`. It tells TypeScript that an error is expected on the next line. If there’s no error, TypeScript will generate a new error, ensuring you’re not suppressing issues unintentionally.
5. **Conclusion**
By combining TypeScript's static analysis, powerful editor features, source maps, and other debugging tools, you can efficiently debug and write reliable TypeScript code. Always aim to catch as many issues as possible at compile time to minimize runtime errors.

### Importing Types
TypeScript allows you to organize your code into modules, making it easier to manage and reuse code across different parts of your application. This is done through importing and exporting types (and other entities) between files.
1. **Exporting Types**
	- To use a type from one file in another, you first need to export it. You can export types in two main ways:
	    ```ts
	    // person.ts
	    export type Person = {
	      name: string
	      age: number
	    }	    
	    export type Todo = {
	      title: string
	      completed: boolean
	    }
	    ``` 
2.  **Importing Types**
	- Once you’ve exported a type from a file, you can import it into another file using the `import` statement.
	   ```ts
	   // main.ts
	   import { Person, Todo } from './person'
	   
	   const user: Person = {
	     name: "Sahil",
	     age: 24
	   }
	   ```        
3. **Why Use Importing and Exporting Types?**
	-   **Code Reusability**: By exporting and importing types, you can reuse types across different parts of your application without duplication.
	-   **Organization**: It helps keep your codebase organized by separating different concerns into their own modules/files.
	-   **Type Safety**: Ensures consistent usage of types across different parts of your application, reducing bugs and improving maintainability.
4. **Summary**
	-   **Named Exports/Imports**: Allow exporting and importing multiple types from/to a file.
	-   **Default Exports/Imports**: Useful for when you want to export/import a single, primary type or entity from a file.
	-   **Organization and Reusability**: Exporting and importing types help maintain a clean, organized codebase and facilitate type reuse across different files.
### Declaration Files
**Declaration files** (`.d.ts`) are used in TypeScript to provide type information about JavaScript code or libraries without needing the actual implementation. These files declare types, interfaces, and other type-related constructs so TypeScript can check the code for type safety.
#### **Scenarios for Using Declaration Files**
1.  **Adding Type Definitions for External Libraries:**    
    -   If you are using a JavaScript library (like `lodash`) that doesn’t come with its own TypeScript type definitions, you can create a `.d.ts` file to add type definitions for it.    
	    ```ts
	    // lodash.d.ts
	    declare module "lodash" {
	      function times(num: number): number[]
	    }
	    ```     
    -   This tells TypeScript that the `times` function exists in the `lodash` module and returns an array of numbers when passed a number.
2.  **Extending or Overriding Global Declarations:**    
    -   Sometimes, you might want to add new properties or methods to existing global objects, like `console`, or declare new global variables. You can do this by extending the global scope in a `.d.ts` file.  
	    ```ts
	    // globals.d.ts
	    declare global {
	      interface Console {
	        superLog: () => void
	      }
	      declare var test: number
	    }
	    
	    export {}
	    ```     
    -   In the above example:
        -   The `Console` interface is extended to include a new method `superLog`.
        -   A new global variable `test` of type `number` is declared.
#### **Using the Declaration File in Code**
```ts
// main.ts
import { times } from "lodash"

times(4)

console.superLog()  // This would work because of the global declaration extension
test // This global variable is now available

// Warning: Avoid extending or overriding core JavaScript functions or objects like `console` unless absolutely necessary. This can lead to unpredictable behavior and conflicts with other code. The `superLog` example is just for illustration.
``` 

#### **Overriding Global Declarations**
-   **Why Do This?**    
    -   Sometimes you need to add custom functionality to existing global objects or declare new global variables that are not part of TypeScript's default type definitions.
    -   This is often done in libraries or frameworks where extending existing objects is common.
-   **How to Do It?**    
    -   Use `declare global` in a `.d.ts` file to add or override global declarations.
    -   Ensure that this is done carefully to avoid conflicts with existing properties or methods in the global scope.
#### Summary
-   **Declaration Files (`.d.ts`)**: Provide type information about JavaScript code without the actual implementation, useful for external libraries or adding custom type definitions.
-   **Extending Global Declarations**: Allows adding new properties or methods to existing global objects or declaring new global variables.
-   **Caution**: Avoid extending core JavaScript objects unless absolutely necessary to prevent conflicts and unexpected behavior.
