
# Type Narrowing

## Topics covered in this section of course
1. Basic Type Guards
2. Never Type
3. Unknown Type
4. As Casting
5. Satisfies
6. Discriminated Union
7. Function Overloads
8. Type Predicate Function

## Learnings
###  Basic Type Guards
Type guards in TypeScript are a way to narrow down the type of a variable within a conditional block. This allows us to make decisions based on the type of a variable, ensuring type safety and avoiding errors at runtime.

1. **Type Guards for Primitive Types**
	- TypeScript can infer types using simple checks like `typeof` for primitive types.
	```ts
	type Todo = {
	  title: string;
	  priority: "High" | "Normal" | "Low";
	  isComplete: boolean;
	  description?: string;
	  dueDate: Date | string;
	};
	function extendTodo(todo: Todo) {
	  if (typeof todo.dueDate === "string") {
	    console.log(todo.dueDate); // `todo.dueDate` is inferred as a string here
	  } else {
	    console.log(todo.dueDate); // `todo.dueDate` is inferred as a Date here
	  }
	}
	``` 
	-   **`typeof`**: This is used to check the type of primitive types like `string`, `number`, `boolean`, etc. The code inside the conditional block knows the exact type, ensuring type-safe operations.

2. **Type Guards for Non-Primitive Types (Objects and Classes)**
	- For objects and classes, TypeScript can use the `instanceof` operator to determine the type.
		```ts
		function extendTodoWithDateCheck(todo: Todo) {
		  if (todo.dueDate instanceof Date) {
		    // The type of `todo.dueDate` is inferred as `Date`
		    console.log("This is a Date object:", todo.dueDate);
		    return;
		  }

		  // If it's not a Date, TypeScript infers that it must be a string here
		  console.log("This is a string:", todo.dueDate);
		}
		``` 
	-   **`instanceof`**: This operator is used to check if an object is an instance of a specific class or constructor function. It works well with objects, arrays, and other non-primitive types.

3. **Optional Properties**
		- When dealing with optional properties, TypeScript allows you to check if a property exists before accessing it using optional chaining (`?.`).
	```ts
	todo.description?.length; // Checks if `description` exists before accessing `length` 
	```
	-   **Optional Chaining (`?.`)**: This operator is used to safely access properties of an object that might be `undefined` or `null`. If the property exists, its value is returned; otherwise, `undefined` is returned.

4. **Narrowing Down Types Using `switch`**
	- A `switch` statement can be used to narrow down specific values within a union type.
		```ts			
		switch (todo.priority) {
		  case "High":
		    console.log("Priority is High");
		    break;
		  case "Normal":
		    console.log("Priority is Normal");
		    break;
		  case "Low":
		    console.log("Priority is Low");
		    break;
		  default:
		    break;
		}
		``` 

	-   **`switch`**: This can be used to narrow down values within a union type, allowing you to handle each specific case separately.

5. **Type Guards with DOM Elements**
	- When working with DOM elements, we can use type guards to ensure that an element is of a specific type before performing operations on it.
		```ts
		const form = document.querySelector<HTMLFormElement>(".form");
		form?.addEventListener("submit", () => {
		  console.log("Form submitted");
		});
		``` 

	-   **Type Assertion with `querySelector`**: You can assert the type of a selected DOM element. The `?.` operator ensures that the code only runs if the element exists.

6. **Summary**
	-   **Type Guards**: Used to narrow down the type of a variable within a conditional block, enhancing type safety.
	-   **`typeof` and `instanceof`**: Commonly used for primitive and non-primitive types, respectively.
	-   **Optional Chaining (`?.`)**: Safely access properties that might be `undefined` or `null`.
	-   **`switch` Statements**: Useful for narrowing down union types based on specific values.
	-   **DOM Type Guards**: Ensure type safety when working with DOM elements by using type assertions and optional chaining.

### Never Type
The `never` type in TypeScript represents a value that never occurs. It is typically used in scenarios where a function doesn't return anything, or where a code path is not supposed to be reached.

1. **Key Points About `never`**
	-   **Functions that never return**: Functions that throw an error or have an infinite loop can have a return type of `never`.
	-   **Exhaustiveness checking**: In TypeScript, the `never` type is used to enforce that all possible cases in a union type have been handled.

2. **Example: Using `never` for Exhaustiveness Checking**
	- Consider the `Todo` type and the `extendTodo` function, which uses a `switch` statement to narrow down the `priority` property:
```ts
type Todo = {
  title: string;
  priority: "High" | "Normal" | "Low";
  isComplete: boolean;
  description?: string;
  dueDate: Date | string;
}
function extendTodo(todo: Todo) {
  switch (todo.priority) {
    case "High":
      console.log(todo.priority);
      break;
    case "Normal":
      console.log(todo.priority);
      break;
    case "Low":
      console.log(todo.priority);
      break;
    default:
      // TypeScript infers the type of `todo.priority` here as `never`
      const exhaustiveCheck: never = todo.priority;
      console.log(todo.priority);
  }
}
``` 
3. **Explanation**
	-   **Switch Statement and `default` Case**: In the `switch` statement, we have handled all possible values of `todo.priority` (`"High"`, `"Normal"`, `"Low"`). However, TypeScript allows us to add a `default` case.    

	-   **Exhaustive Check**: Inside the `default` case, we assign `todo.priority` to a variable of type `never`. If the code reaches the `default` block, TypeScript will throw an error because `todo.priority` should never have a value other than `"High"`, `"Normal"`, or `"Low"`. This ensures that all possible cases are handled, and it alerts the developer if any new value is added to the `priority` type but not handled in the `switch` statement.
    

4.  **Practical Use**
Using the `never` type for exhaustiveness checks is a best practice in TypeScript. It helps catch potential bugs early by ensuring that all possible values in a union type are considered. If new values are added to the `Todo` type's `priority` property in the future, the TypeScript compiler will generate an error, reminding you to update the `switch` statement accordingly.

### Unknown Type
The `unknown` type in TypeScript is used when we don't know the type of a value at the time of writing code. It's a safer alternative to `any` because it forces us to perform type checks or type assertions before we can use the value.
1. **Key Points About `unknown`**
	-   **Type Safety**: Unlike `any`, which allows us to perform any operation without type checks, `unknown` ensures that we must narrow down its type before you can use it.
	-   **Type Checking**: We can't directly access properties or call methods on a value of type `unknown` without performing a type check first.
	-   **Safer Alternative to `any`**: `unknown` helps prevent runtime errors by requiring explicit type checking, making your code more reliable.
2. **Example: Using `unknown` in a Function**
	- Consider the following example:
		```ts
		function func(data: unknown) {
		  if (
			  data != null && 
			  typeof data === "object" && 
			  "name" in data && 
			  typeof data.name === "string"
		  ) {
		    console.log((data as { name: string }).name);
		  }
		}
		``` 
	- **Explanation**
		1.    **Using `unknown`**: The `func` function takes a parameter `data` of type `unknown`. This means that `data` could be of any type, but before we perform any operations on it, we must first determine its actual type.    
		2. **Type Checks**:    
		    -   **Non-null Check**: `data != null` ensures that `data` is not `null` or `undefined`.
		    -   **Object Check**: `typeof data === "object"` ensures that `data` is an object.
		    -   **Property Check**: `"name" in data` ensures that the `data` object has a `name` property.
		    -   **Type Check**: `typeof data.name === "string"` ensures that the `name` property is a string.

3.  **Difference Between `unknown` and `any`**
	-   **`any`**: The `any` type disables TypeScript's type checking, allowing us to perform any operation on a value. This can lead to runtime errors because there's no guarantee the operations are safe.
		```ts
		let value: any = "hello";
		console.log(value.length); // No error, but could lead to issues if value is not a string
		```     
    -   **`unknown`**: The `unknown` type requires us to narrow down the type or use type assertions before performing operations. This makes the code safer by ensuring that you handle the value correctly.    
	    ```ts
	    let value: unknown = "hello";
	    if (typeof value === "string") {
	      console.log(value.length); // Safe because we've checked that value is a string
	    }
	    ``` 
4. **Why Use `unknown` Instead of `any`**	
	-   **Better Type Safety**: Using `unknown` enforces type safety by requiring explicit checks before accessing properties or calling methods. This reduces the likelihood of runtime errors.
	-   **Encourages Explicit Type Checks**: With `unknown`, you must be more intentional about how you handle values, leading to more robust and predictable code.
	-   **Prevents Accidental Mistakes**: Since `any` disables type checking, it can lead to accidental errors that are hard to track down. `unknown` prevents these by requiring you to verify the type first.

In summary, `unknown` is a safer and more type-safe alternative to `any`. It helps ensure that your code handles values correctly, reducing the risk of runtime errors and making your code more reliable.

### As Casting
In TypeScript, `as` casting allows you to tell the compiler that you know more about a variable's type than it does. This is useful when you're working with a value of a less specific type (like `unknown` or `any`) and want to treat it as a more specific type.

1.  **How `as` Casting Works**
	- In the provided example:
		```ts
		type Todo = {
		  title: string
		}

		function func(data: unknown) {
		  fetch("sdf")
		    .then((res) => res.json())
		    .then((data) => {
		      return data as Todo
		    })
		    .then(todo => {})
		}
		```		 
	-   **Scenario**: The `fetch` API call returns a response, which is then converted to JSON. Since the type of the returned data isn't known to TypeScript (it's `unknown`), you use `as` casting to tell the TypeScript compiler, "I expect this `data` to be of type `Todo`."
	    -   **Casting**: `data as Todo` casts the `data` to the `Todo` type, meaning you can now treat it as an object with a `title` property.
    

2. **Why Use `as` Casting Rarely**
	1.  **Bypasses Type Safety**:    
	    -   **Potential Risks**: TypeScript's type system is designed to catch errors before they happen. Using `as` can bypass these safety checks. If you're wrong about the type, you can introduce subtle bugs that won't be caught until runtime.
	    -   **Example**: If `data` doesn't actually conform to the `Todo` type (e.g., it's missing the `title` property or has a different structure), your code could fail or produce unexpected behavior.
	2.  **False Sense of Security**:
	    -   **Overconfidence**: `as` casting can give you a false sense of security by making your code appear type-safe when it's not. This undermines TypeScript's benefits.
	3.  **Better Alternatives**:    
	    -   **Type Guards**: Use type guards or conditional checks to ensure the data you're working with is indeed the type you expect.
	    -   **Validation**: Implement validation to check that the data conforms to the expected type before casting.

3.  **When to Use `as` Casting**
	-   **Specific Scenarios**: Use `as` casting in situations where you are certain about the type and have no other way to convey that information to TypeScript.
	-   **Rarely**: It should be used sparingly, as a last resort, after exhausting other safer options like type guards, assertions, or validation.

4.  **Conclusion**
While `as` casting can be powerful, it should be used with caution. The strength of TypeScript lies in its ability to catch errors at compile-time, and `as` casting can undermine this by allowing unsafe operations. Always ensure that the data truly matches the type you're casting it to, or consider using safer alternatives.

### Satisfies
The `satisfies` operator in TypeScript is a useful tool when you want to ensure that an object conforms to a specific type without necessarily narrowing down its type to that specific one. It provides a way to check that an object meets the requirements of a type, while still preserving as much type information as possible.

1. **How `satisfies` Works**
	- Using the `satisfies` operator ensures that the object meets all the requirements of a specified type, but it doesn't change the inferred type of the object itself.
	- Example:
		```ts
		type Todo = {
		  title: string,
		  dueDate: string | Date
		  isComplete: boolean
		}
		const todo = {
		  title: "sdf",
		  dueDate: new Date(),
		  isComplete: true,
		} satisfies Todo
		todo.dueDate.setDate(4)
		``` 
		-   **Scenario**: You define a `Todo` type with three properties: `title`, `dueDate`, and `isComplete`.    
		-   **Object Definition**: The `todo` object is created with a `title`, a `dueDate` (which is a `Date` object), and `isComplete` set to `true`.    
		-   **`satisfies`**: When you use the `satisfies` operator, TypeScript checks that the `todo` object satisfies all the properties and types defined in the `Todo` type. However, it doesn't change the type of `todo` itself.    
2.  **Why Use `satisfies`**
	-  **Type Conformance**:    
	    -   **Ensuring Correctness**: The `satisfies` operator ensures that the object conforms to the required type without forcing the object to be exactly that type.
	    -   **Example**: Even though the `Todo` type allows `dueDate` to be either a `string` or `Date`, the `todo` object is allowed to keep its more specific type (`Date` in this case), while still being checked against the broader `Todo` type.
	-  **Flexibility**:
	    -   **Preserving Type Information**: Unlike direct type annotation (e.g., `const todo: Todo = {...}`), using `satisfies` preserves the original type of properties within the object.
	    -   **Example**: With `satisfies`, `todo.dueDate` is still inferred as a `Date`, allowing you to call `setDate(4)` without any errors. If you had used a type annotation, `dueDate` might have been narrowed to `string | Date`, which could restrict some operations.
	-  **Error Prevention**:    
	    -   **Compile-Time Errors**: If the object does not satisfy the required type, TypeScript will throw a compile-time error, helping to prevent runtime issues.

3. **Conclusion**
The `satisfies` operator is a powerful tool in TypeScript for ensuring that an object meets the requirements of a specific type while preserving the original type information. It offers a way to validate conformance without losing the benefits of type inference, making it particularly useful in cases where you need flexibility and type safety simultaneously.

### Discriminated Union
Discriminated unions, also known as tagged unions or algebraic data types, are a powerful TypeScript feature that allows you to create a union of multiple types that each share a common, distinguishing property. This makes it easier to handle and differentiate between different possible types in a union.

1. **How Discriminated Unions Work**
	- In a discriminated union, each type in the union has a common property (often called a "discriminant" or "tag") with a unique literal value that distinguishes it from the other types. By checking the value of this property, TypeScript can automatically infer the specific type of the object, making it easier to work with.
	- **Example **
		```ts
		type SuccessResponse = {
		  status: "Success"
		  data: { id: string; name: string }
		}

		type ErrorResponse = {
		  status: "Error"
		  errorMessage: string
		}

		type UserApiResponse = SuccessResponse | ErrorResponse

		function handleResponse(res: UserApiResponse) {
		  if (res.status === "Success") {
		    console.log(res.data.name)
		  } else {
		    console.log(res.errorMessage.length)
		  }
		}
		``` 
	- **Defining the Types**
		-   **SuccessResponse**:
		    -   Contains a `status` property with the value `"Success"`.
		    -   Has a `data` property, which is an object containing user information (`id` and `name`).
		-   **ErrorResponse**:
		    -   Contains a `status` property with the value `"Error"`.
		    -   Has an `errorMessage` property, which is a string describing the error.
		- **Creating the Union - UserApiResponse**
		    -   This is a union type that can be either a `SuccessResponse` or an `ErrorResponse`.
		    -   The `status` property serves as the discriminant that distinguishes between the two possible types.
	- **Handling the Response**
		-   **Type Narrowing with Discriminants**:
		    -   Inside the `handleResponse` function, you can use the `status` property to determine whether the response is a `SuccessResponse` or an `ErrorResponse`.
		    -   If `res.status === "Success"`, TypeScript knows `res` must be of type `SuccessResponse`, so it allows access to `res.data.name`.
		    -   If `res.status === "Error"`, TypeScript infers that `res` is an `ErrorResponse`, allowing you to safely access `res.errorMessage`.
2. **Why Use Discriminated Unions?**
	-  **Type Safety**:  By using a discriminant property, you ensure that TypeScript can correctly narrow down the union type based on the value of that property, preventing type errors.
	-  **Ease of Use**:  Discriminated unions make it easy to handle different types in a single function or piece of code without needing complex type checks.
	-   **Improved Readability**:   The structure is clear and self-documenting, making your code easier to understand and maintain.
3. **Conclusion**
Discriminated unions are a key feature in TypeScript that enable safe and easy handling of multiple possible types within a union. By using a common property to differentiate between types, you can leverage TypeScript’s powerful type inference to write safer, more maintainable code.

### Function Overloads
Function overloading in TypeScript allows you to define multiple signatures for a single function. This means you can define different parameter types and return types for the same function name. It helps in creating flexible and type-safe functions that can handle various input types.

1. **Example **
	```ts
	function sum(nums: number[]): number
	function sum(a: number, b: number): number
	function sum(a: number | number[], b?: number) {
	  if (Array.isArray(a)) {
	    return a.reduce((acc, num) => acc + num, 0) // Summing up array elements
	  }

	  if (b != null) {
	    return a + b // Adding two numbers
	  }
	}

	const s1 = sum([1, 2]) // Works: calls the array version
	const s2 = sum(1, 2) // Works: calls the two-number version

	const s3 = sum([1, 2], 3) // Error: no matching signature
	``` 

2. **How It Works**
	- **Function Signatures**:   
	    -   The first two lines define two possible signatures for the `sum` function:
	        -   `sum(nums: number[]): number`: Takes an array of numbers and returns a number.
	        -   `sum(a: number, b: number): number`: Takes two numbers and returns their sum.
	- **Implementation**:  
	    -   The third `sum` function contains the implementation. It checks if the first argument is an array or a number and handles them accordingly.
	    -   If `a` is an array, it sums up all the elements.
	    -   If `a` is a number and `b` is provided, it returns their sum.
	-  **Usage**:
	    -   `s1 = sum([1, 2])` correctly matches the first signature and sums the array.
	    -   `s2 = sum(1, 2)` matches the second signature and returns the sum of the two numbers.
	    -   `s3 = sum([1, 2], 3)` results in an error because there’s no matching overload for an array and a number as arguments.

3. **Why Use Function Overloading?**

-   **Type Safety**: Ensures that functions are used with the correct types.
-   **Flexibility**: Allows a single function name to handle different types and scenarios.
-   **Clarity**: Provides clear, distinct signatures that define how a function can be used.
- 
### Type Predicate Function
Type predicates are a feature in TypeScript that allows you to narrow down the type of a variable based on a custom type-checking function. They are useful for refining types in conditional logic, enhancing type safety, and ensuring that your code handles various types correctly.

1. **Basic Example**
	```ts
	type Person = {
	  name: string
	}

	type Todo = {
	  title: string
	}

	function print(obj: Person | Todo) {
	  if (isPerson(obj)) {
	    console.log(obj.name) // Here, TypeScript knows obj is of type Person
	    return
	  }

	  console.log(obj.title) // Here, TypeScript knows obj is of type Todo
	}

	function isPerson(obj: Person | Todo): obj is Person {
	  return "name" in obj
	}
	``` 

	- **How It Works**
		- **Type Predicate Function**:
		    -   The function `isPerson` is a type predicate function. It takes an argument of type `Person | Todo` and returns a boolean.
		    -   The return type `obj is Person` is a type predicate. It tells TypeScript that if the function returns `true`, the argument `obj` should be treated as `Person`.
		-  **Usage in Conditional Logic**:   
		    -   Inside the `print` function, `isPerson` is used to check the type of `obj`.
		    -   If `isPerson(obj)` returns `true`, TypeScript infers that `obj` is a `Person`, allowing access to `obj.name`.
		    -   Otherwise, TypeScript infers that `obj` is a `Todo`, allowing access to `obj.title`.
2. **Real World Problem Example**
	```ts
	const PRIORITIES = ["High", "Medium", "Low"] as const
	type Priority = (typeof PRIORITIES)[number]
	type Todo2 = {
	  title: string
	  description: string
	}

	function func(todo: Todo2) {
	  if (isPriority(todo.description)) {
	    console.log(todo.description) // Here, TypeScript knows todo.description is of type Priority
	  } else {
	    console.log(todo.description) // Here, TypeScript knows todo.description is a string
	  }
	}

	function isPriority(description: string): description is Priority {
	  return PRIORITIES.includes(description as Priority)
	}
	``` 
- **How It Works**
	-  **Type Predicate Function for Enum-like Values**:
	    
	    -   The function `isPriority` checks if a string is one of the predefined priorities (`"High"`, `"Medium"`, `"Low"`).
	    -   It uses a type predicate `description is Priority` to inform TypeScript that if the function returns `true`, the `description` is a valid `Priority`.
	- **Usage in Conditional Logic**:
	    
	    -   Inside the `func` function, `isPriority(todo.description)` is used to narrow down the type of `todo.description`.
	    -   If `isPriority(todo.description)` returns `true`, TypeScript knows `todo.description` is of type `Priority`.
	    -   Otherwise, it is treated as a regular string.

3. **Why Use Type Predicates?**
	-   **Type Safety**: Ensures that variables are used correctly according to their refined types.
	-   **Code Clarity**: Makes type checks explicit and the code easier to understand.
	-   **Error Prevention**: Helps prevent errors by narrowing types based on custom logic, ensuring proper type handling.
