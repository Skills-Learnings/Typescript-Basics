
# Basic Types

## Topics covered in this section of course
1. Assigning Types And Type Inference
2. Array Type
3. Any Type
4. Object Basics
5. Types vs Interfaces
## Learnings
### Assigning Types And Type Inference

#### Assigning Types in TypeScript
In TypeScript, we can explicitly assign types to variables to ensure that they hold values of specific types. This helps catch errors early during development.

1. **Number**
To declare a variable with a type of `number`, you can use the following syntax:
	```ts
	let age: number;
	age = 25; // Correct
	age = "25"; // Error: Type 'string' is not assignable to type 'number'` 
	```

2. **Boolean**
	For `boolean` types:
	```ts
	let isStudent: boolean;
	isStudent = true; // Correct
	isStudent = "yes"; // Error: Type 'string' is not assignable to type 'boolean'
	``` 

3. **String**
	For `string` types:
	```ts
	let firstName: string;
	firstName = "John"; // Correct
	firstName = 123; // Error: Type 'number' is not assignable to type 'string'
	``` 

4. **Null**
	For `null` types:
	```ts
	let data: null;
	data = null; // Correct
	data = "null"; // Error: Type 'string' is not assignable to type 'null'
	```

5. **Undefined**
For `undefined` types:
	```ts
	let notAssigned: undefined;
	notAssigned = undefined; // Correct
	notAssigned = 10; // Error: Type 'number' is not assignable to type 'undefined'
	``` 

#### Type Inference
TypeScript has a powerful type inference system. When you initialize a variable, TypeScript automatically infers the type based on the value you assign to it.

**Examples of Type Inference:**

```ts
let count = 10; // TypeScript infers the type as number
// count = "ten"; // Error: Type 'string' is not assignable to type 'number'

let isAvailable = true; // TypeScript infers the type as boolean
// isAvailable = 1; // Error: Type 'number' is not assignable to type 'boolean'

let greeting = "Hello, world!"; // TypeScript infers the type as string
// greeting = 123; // Error: Type 'number' is not assignable to type 'string'

let empty = null; // TypeScript infers the type as null
// empty = "something"; // Error: Type 'string' is not assignable to type 'null'

let unassigned; // TypeScript infers the type as any
unassigned = 5; // Correct
unassigned = "now a string"; // Correct
``` 

#### Summary
-   **Assigning Types**: We explicitly define the type of a variable using `: type`.
-   **Type Inference**: TypeScript automatically infers the type based on the initial value assigned to the variable.
-   **Primitive Types**: `number`, `boolean`, `string`, `null`, and `undefined`.
-   **Union Types**: Combine multiple types using the `|` operator.

By understanding these concepts, you can write safer and more predictable TypeScript code.

### Array Type:
In TypeScript, arrays can be typed to hold specific types of elements, providing more robust type checking and reducing runtime errors. Let's explore how to define and use arrays with various types in TypeScript.
1. **Defining Array Types in TypeScript**
	In TypeScript, we can define arrays in two main ways:
	- **Using Type Annotations:** We can specify the type of elements the array will hold using square brackets `[]`.
		```ts
		let numbers: number[] = [1, 2, 3, 4, 5];
		let strings: string[] = ["apple", "banana", "cherry"];
		let booleans: boolean[] = [true, false, true];
		``` 
    
	- **Using the Array Generic Type:** We can use the `Array` type with a type parameter.    
		```ts
		let numbers: Array<number> = [1, 2, 3, 4, 5];
		let strings: Array<string> = ["apple", "banana", "cherry"];
		let booleans: Array<boolean> = [true, false, true];
		``` 
   
2. **Array Methods and Type Inference**
	- TypeScript infers the types for array elements when values are defined at the time declration. This helps prevent type errors.
		```ts
		let numbers = [1, 2, 3];
		numbers.push(4); // Correct
		// numbers.push("5"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'
		``` 

3. **Constant Arrays and Mutation**
	- When we declare an array with `const`, it means we cannot reassign the array to a new array. However, you can still change the contents of the array because `const` applies to the reference, not the contents.
	- **Example**:
		```ts
		const fruits: string[] = ["apple", "banana"];
		fruits[0] = "cherry"; // Correct
		fruits.push("date"); // Correct
		// fruits = ["elderberry"]; // Error: Cannot assign to 'fruits' because it is a constant
		``` 

	- In this example, `fruits` is a constant reference to an array. While we cannot reassign `fruits` to a new array, we can modify the elements within the array. This is because `const` prevents reassignment of the variable itself, but it does not make the array immutable.

4. **Summary**

	-   **Defining Arrays**: We can use type annotations (`type[]`) or the `Array<type>` generic.
	-   **Type Inference**: TypeScript infers types for array values and methods.
	-   **Const Arrays**: You can modify the elements of a `const` array, but you cannot reassign the array itself.

By understanding how arrays work in TypeScript and the nuances of `const`, we can effectively manage collections of data in our applications.

### Any Type:
The `any` type in TypeScript is a type that can hold any value. It effectively disables type checking for that variable, making it behave like a variable in plain JavaScript.

1. **Declaring `any` Type**
	```ts
	let value: any;
	value = 5;          // No error
	value = "hello";    // No error
	value = true;       // No error
	``` 

2. **Why Avoid Using `any`**
	Using `any` defeats the purpose of TypeScript, which is to provide type safety and catch errors at compile time. Here are some reasons to avoid using `any`:
	- **Loss of Type Safety**: TypeScript's type system helps prevent many common programming errors by enforcing type checks. Using `any` bypasses these checks.
	- **Harder to Maintain**: Code using `any` can become harder to understand and maintain because it is not clear what types of values a variable is supposed to hold.
	- **Reduced IDE Support**: Many IDE features, such as autocompletion and refactoring tools, rely on type information to function effectively. Using `any` reduces the usefulness of these features.

3. **Example of Problems with `any`**
	- Let's look at an example to illustrate the potential problems when using `any`.

		```ts		
		function processValue(value: any) {
		    console.log(value.toUpperCase());
		}

		processValue("hello"); // Works fine, logs "HELLO"
		processValue(123);     // Runtime error: value.toUpperCase is not a function
		``` 

	- In this example, the `processValue` function is expected to receive a string and convert it to uppercase. However, because the `value` parameter is typed as `any`, it can accept any type, including numbers. This leads to a runtime error when a number is passed, as numbers do not have a `toUpperCase` method.


4. **Summary**
	-   **The `any` Type**: Can hold any value and disables type checking.
	-   **Why Avoid `any`**:
	    -   Loss of type safety
	    -   Harder to maintain code
	    -   Reduced IDE support
	-   **Example Problems**:
	    -   Using `any` can lead to runtime errors that would have been caught at compile time with specific types.
By avoiding `any` and using specific types wherever possible, you can leverage TypeScript's full potential to create safer, more maintainable code.
### Object Basics:
1. **Defining Objects in TypeScript**
	- TypeScript can automatically infer the types of properties in an object when the object is initialized.
		```ts
		const person = { name: "Sahil", age: 24 }; // TypeScript infers the type as { name: string; age: number }
		``` 

	- In the above example, TypeScript infers that `person` has properties `name` of type `string` and `age` of type `number`.

2.  Adding Properties to an Object
	- If we try to add a property to an object that TypeScript has already inferred types for, it will throw an error.
		```ts
		person.isProgrammer = true; 
		// Error: Property 'isProgrammer' does not exist on type '{ name: string; age: number; }'
		``` 

	- This error occurs because `isProgrammer` was not defined as part of the `person` object initially, and TypeScript enforces the inferred type.

3. **Defining Object Types Explicitly**
	- We can explicitly define the type of an object to include all expected properties. This helps in making sure the object conforms to the specified structure.
		```
		const programmer: { name: string; age: number; isProgrammer?: boolean } = {
		  name: "Sahil",
		  age: 24,
		};
		``` 

	- In this example, we explicitly define the type of the `programmer` object. The `isProgrammer` property is marked with a `?`, indicating that it is optional.

4. **Optional Properties**
	- An optional property in TypeScript is a property that may or may not be present in the object. This is indicated by placing a `?` after the property name.
	- **Syntax for Optional Properties**
		```ts
		const programmer: { name: string; age: number; isProgrammer?: boolean } = {
		  name: "Sahil",
		  age: 24,
		};
		``` 
	- **Working with Optional Properties**: When a property is optional, TypeScript does not enforce its presence. This allows us to add it later without causing errors.
		```ts
		programmer.isProgrammer = true; // No error, because `isProgrammer` is defined as optional
		``` 

	- This approach helps avoid errors when dealing with objects that might not have all properties defined initially.

5. **Summary**
	-   **Type Inference**: TypeScript can infer the types of object properties.
	-   **Explicit Types**: Define object types explicitly to include all expected properties.
	-   **Optional Properties**: Use `?` to make properties optional, avoiding errors when adding properties later.

By understanding and using these concepts, you can effectively manage objects in TypeScript, ensuring type safety and flexibility in your code.
### Types vs Interfaces:
In TypeScript, both `types` and `interfaces` are used to define the shape of objects and describe complex types. While they have many similarities, there are some differences in their use and capabilities.
1. **Types**
	-  **Definition**: Used to define custom types, including objects, unions, and intersections.
	-  **Syntax**:
	    ```ts
	    type Person = {
	      name: string;
	      age: number;
	    };
	    ```    

2. **Interfaces**
	-   **Definition**: Used specifically to define the shape of objects.    
	-   **Syntax**:
	    ```ts
	    interface Person {
	      name: string;
	      age: number;
	    }
	    ``` 
3.  **Key Syntax Differences**
	- **Types**:
        ```ts
        type MyType = {
          property: string;
        };
      ``` 
	- **Interfaces**:
		```ts	
		interface MyInterface {
		  property: string;
		}
		``` 
        
4.  **Usage Differences**:
    -   **Types**: Can define more than just object shapes, such as unions and intersections.
    -   **Interfaces**: Specifically used for defining object structures.

5. **Summary**:
	-   **Types** and **Interfaces** can both define object shapes, but `type` is more versatile and can handle more complex type constructs.
	-   **Interfaces** are focused on defining the shape of objects and cannot be used for non-object types.
