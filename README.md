
# Function Types

## Topics covered in this section of course
1. Defining Functions
2. Void Type
3. Optional Parameters
4. Destructured And Rest Parameters
5. Typing Variables (Function paramters) as Functions
## Learnings
### Defining Functions
In TypeScript, we can define functions with explicit types for parameters and return values.
1. **Basic Function Definition**
	```ts
	function greet(name: string): string {
	  return `Hello, ${name}!`;
	}
	``` 

	-   **`name: string`**: Type of the `name` parameter is `string`.
	-   **`: string`**: Type of the return value is `string`.
2. **Assigning Type to Function Parameters**
	- We can specify the types of function parameters to ensure they receive the correct type of arguments.
		```ts
		function add(a: number, b: number): number {
		  return a + b;
		}
		``` 

	-   **`a: number` and `b: number`**: Both parameters are of type `number`.

3. **Assigning Type to Return Value**
	- You can explicitly specify the return type of a function, but TypeScript's type inference often handles this automatically.
		```ts
		function multiply(a: number, b: number): number {
		  return a * b;
		}
		``` 

4. **Type Inference vs. Explicit Return Type**
	-   **Type Inference**: TypeScript infers the return type based on the function’s return value. It is often preferred as it reduces redundancy.
		```ts
		function divide(a: number, b: number) {
		  return a / b; // TypeScript infers the return type as `number`
		}
		``` 
    
	-   **Explicit Return Type**: We can specify the return type explicitly, but it’s generally not necessary if TypeScript can infer it correctly.    
	    ```ts
	    function subtract(a: number, b: number): number {
	      return a - b;
	    }
	    ``` 
    
	- **Why Avoid Explicit Return Type**: Relying on type inference makes the code cleaner and reduces redundancy.
5. **Passing Objects to Functions**
	- When passing objects to functions, ensure the object’s shape matches the expected parameter type. However, TypeScript allows passing objects with additional properties that are not declared in the function's parameter type without raising an error.
	- **Example**
		```ts
		interface Person {
		  name: string;
		  age: number;
		}

		function printPerson(person: Person) {
		  console.log(`${person.name} is ${person.age} years old.`);
		}

		const individual = { name: "Alice", age: 30, extraProp: true };

		// This will not cause an error because TypeScript allows extra properties not defined in the `Person` type
		printPerson(individual);
		``` 

	- **Why Extra Properties Are Allowed**: TypeScript uses a concept called "duck typing" or "structural typing." This means that TypeScript cares about the shape of the object rather than its exact type. As long as the object has the required properties (`name` and `age` in this case), it can be passed to the function, even if it has additional properties.
6. **Summary**:
	-   **Function Parameters**: Assign types to function parameters to ensure they receive the correct type.
	-   **Return Types**: Type inference is preferred over explicit return types to keep code clean.
	-   **Object Parameters**: Ensure objects match the expected shape; passing extra properties will cause errors.
	- **Extra Properties**: Objects with additional properties beyond those specified in the function’s parameter type are allowed due to TypeScript’s structural typing.

This overview covers the basics of function definitions and type handling in TypeScript.

### Void Type
In TypeScript, the `void` return type is used to indicate that a function does not return a value. This is a way to explicitly declare that the function's purpose is to perform some action rather than to compute and return a value.
1. **Using `void` Return Type**
	- **Basic Example**: When we define a function with a `void` return type, TypeScript enforces that the function does not return a value.

		```ts
		function logMessage(message: string): void {
		  console.log(message);
		  // No return statement or return undefined
		}
		``` 

	- **In this example:**
		-   **`logMessage`**: The function takes a `string` parameter and returns `void`.
		-   **`void`**: Indicates that the function does not return any value.

2. **Implicit Return Type**
	- If a function does not return anything, TypeScript infers the return type as `void`. We can also explicitly specify `void` for clarity.
		```ts
		function printName(name: string) {
		  console.log(name);
		  // TypeScript infers the return type as `void`
		}

		function printNameExplicit(name: string): void {
		  console.log(name);
		  // Explicitly specifying `void`
		}
		```

	- In both cases, the return type is `void` because no value is returned.

3. **Why Use `void`**
	- **Clarity**: Explicitly declaring `void` makes it clear that the function is intended to perform an action and not to return a value.
	-  **Type Safety**: Helps ensure that the function is used correctly, by not allowing any return values to be assigned or used where a value is expected.
4. **Difference Between `void` and `undefined` Return Type**
	-   **`void`**:
	    -   Indicates that the function is not expected to return any value.
	    -   Functions with a `void` return type should not have a return value, though returning `undefined` is allowed.
	-   **`undefined`**:    
	    -   Explicitly signifies that the function returns `undefined`.
	    -   Functions explicitly declared to return `undefined` can still return other values or `undefined`.

	- **Examples**
		1. **Function Without Return Statement**:
		    ```ts
		    function greet(name: string): void {
		      console.log(`Hello, ${name}`);
		      // No return statement
		    }
		    ```	 
    
		2. **Function Returning `undefined`**:
		    ```ts
		    function logData(data: string): void {
		      console.log(data);
		      return undefined; // Explicitly returning undefined, still `void`
		    }
		    ``` 
    
		3.  **Function Explicitly Returning `undefined`**:
		    ```ts
		    function returnUndefined(): undefined {
		      return undefined; // Explicitly returning `undefined`
		    }
		    ```
5.  **Summary**
	- **`void` Return Type**: Indicates that a function does not return a value and is used for functions intended to perform actions.
	-   **`undefined` Return Type**: Explicitly indicates that a function returns `undefined`. Functions with this return type can also return `undefined` explicitly.

Using the `void` return type helps make your code more expressive and ensures that functions intended for side effects (like logging or modifying data) are used correctly.

### Optional Parameters
In TypeScript, optional function parameters allows to specify parameters that are not required when calling a function. This can be useful when you want to provide default values or allow functions to be called with different numbers of arguments.

1. **Syntax for Optional Parameters**
	- Optional parameters are specified by adding a `?` after the parameter name in the function definition.

	- **Basic Example**

		```ts
		function greet(name: string, greeting?: string): void {
		  if (greeting) {
		    console.log(`${greeting}, ${name}!`);
		  } else {
		    console.log(`Hello, ${name}!`);
		  }
		}
		``` 
	- In this example:
		-   **`name: string`**: Required parameter.
		-   **`greeting?: string`**: Optional parameter. The `?` indicates that `greeting` is not required.

2. **Calling Functions with Optional Parameters**
	- We can call the function with or without the optional parameter:
		```ts
		greet("Alice"); // Output: Hello, Alice!
		greet("Bob", "Hi"); // Output: Hi, Bob!` 
		```
	-   When the optional parameter is not provided, its value is `undefined` inside the function.
	-   We can handle this inside the function with conditional logic or default values.

5. **Summary**
	-   **Optional Parameters**: Use the `?` symbol to indicate that a parameter is optional.
  
Optional parameters provide flexibility in function calls and help manage cases where not all arguments are always needed.

### Destructured And Rest Parameters
Destructuring in TypeScript allows to extract values from arrays or properties from objects into distinct variables. This can also be applied directly within function parameters.

1. **Destructuring Objects**

	- We can destructure object parameters to directly access properties within the function.

		```ts
		type Person = {
		  name: string;
		  age: number;
		}

		function displayPerson({ name, age }: Person): void {
		  console.log(`Name: ${name}, Age: ${age}`);
		}

		const person = { name: "Alice", age: 25 };
		displayPerson(person); // Output: Name: Alice, Age: 25
		``` 

2. **Optional Destructured Object Parameters**

	- We can make destructured object parameters optional by providing a default value, typically an empty object `{}`, and marking the individual properties as optional.

		```ts
		type Person {
		  name?: string;
		  age?: number;
		}

		function displayPerson({ name, age }: Person = {}): void {
		  console.log(`Name: ${name ?? "Unknown"}, Age: ${age ?? "Unknown"}`);
		}

		displayPerson(); // Output: Name: Unknown, Age: Unknown
		displayPerson({ name: "Alice" }); // Output: Name: Alice, Age: Unknown
		displayPerson({ age: 30 }); // Output: Name: Unknown, Age: 30
		``` 

	-   **`{ name, age }: Person = {}`**: Destructures the object with a default empty object.
	-   **`name?: string` and `age?: number`**: Marks `name` and `age` as optional properties.

3. **Rest Parameters**
	- Rest parameters allows to handle an indefinite number of arguments as an array. This is useful for functions that can accept any number of arguments.

	- **Example with Rest Parameters**
		```ts
		function sum(...numbers: number[]): number {
		  return numbers.reduce((acc, curr) => acc + curr, 0);
		}

		console.log(sum(1, 2, 3)); // Output: 6
		console.log(sum(1, 2, 3, 4, 5)); // Output: 15
		``` 

	-   **`...numbers: number[]`**: The `...` syntax collects all remaining arguments into an array called `numbers`.
4. **Summary**
	-   **Destructured Parameters**: Extract properties directly within function parameters.
    `function displayPerson({ name, age }: Person): void { ... }`     
	-   **Optional Destructured Parameters**: Use default values and mark properties as optional.
	`function displayPerson({ name, age }: Person = {}): void { ... }` 
	-   **Rest Parameters**: Handle an indefinite number of arguments as an array.
    `function sum(...numbers: number[]): number { ... }` 
    
This provides a clear overview of how to use destructured and rest parameters in TypeScript, along with making destructured parameters optional.

### Typing Variables (Function paramters) as Functions
In TypeScript, we can type function parameters as functions, ensuring that the provided arguments match the expected function signature. This is particularly useful for higher-order functions, such as callbacks.

1. **Typing Function Parameters as Functions**
	- To type a function parameter as a function, we specify the parameter's type as a function signature. This signature includes the types of the parameters that the function expects and the return type.

	- **Example**
		```ts
		function sumWithCallback(a: number, b: number, cb: (sum: number) => void) {
		  cb(a + b);
		}

		sumWithCallback(1, 2, (sum) => {
		  console.log(sum);
		});
		``` 

	- **Explanation**
		1.  **Function Definition**:
			```ts
			function sumWithCallback(a: number, b: number, cb: (sum: number) => void) {
			  cb(a + b);
			}
			``` 
    
		    -   **`a: number` and `b: number`**: These are regular number parameters.
		    -   **`cb: (sum: number) => void`**: This specifies that `cb` is a function. The function `cb` takes a single parameter `sum` of type `number` and returns `void`.
		2.  **Function Call**:
		    ```ts
		    sumWithCallback(1, 2, (sum) => {
		      console.log(sum);
		    });
		    ``` 
    
		    -   The `sumWithCallback` function is called with two numbers `1` and `2`.
		    -   The third argument is an inline function (callback) that takes a `sum` parameter and logs it to the console.

		3. **Function Type Signature**
			- The type of the callback function `cb` is specified as `(sum: number) => void`. Here's what it means:
			-   **`(sum: number)`**: The callback function accepts a single parameter `sum` of type `number`.
			-   **`=> void`**: The callback function does not return any value (returns `void`).

2. **Benefits**
	-   **Type Safety**: Ensures that the callback function matches the expected signature, preventing runtime errors.
	-   **Code Clarity**: Makes it clear what type of function is expected as a parameter.


3. **Summary**
	-   **Typing Function Parameters as Functions**: Specify the expected function signature in the parameter type.
    `function sumWithCallback(a: number, b: number, cb: (sum: number) => void) { ... }` 
    
	-   **Type Safety and Clarity**: Ensures that the provided function matches the expected signature, improving code safety and readability.
    
By using typed function parameters, we ensure that higher-order functions like callbacks are used correctly, preventing errors and making your code easier to understand and maintain.
