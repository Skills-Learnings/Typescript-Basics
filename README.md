
# Advanced Types

## Topics covered in this section of course
1. As const and enums
2. Tuples
3. Generics
4. Async Functions
## Learnings
### As const and enums
The `as const` assertion in TypeScript is used to convert an object or array into a readonly type. This makes the properties and elements immutable and provides more specific literal types instead of broader types like `string` or `number`.

1. **Readonly Arrays with `as const`**
	```ts
	const nums = ["1", "2", "3"] as const;

	const a = nums[0]; // The type of "a" is "1" | "2" | "3"
	nums[0] = 1; // Error: Cannot assign to '0' because it is a read-only property.
	nums.push(1); // Error: Property 'push' does not exist on type 'readonly ["1", "2", "3"]'.
	``` 
	-   **`as const`**: Converts the `nums` array to a readonly array with literal types `"1"`, `"2"`, and `"3"`.
	-   **Immutability**: We cannot modify the elements of the array or use methods that mutate the array, like `push`.

2. **Readonly Enums with `as const`**
	- Instead of using traditional enums, `as const` can be used to create a set of constants that have similar benefits with added type safety and flexibility.
		```ts
		const SKILL_LEVELS = ["Beginner", "Intermediate", "Expert"] as const;

		type Person = {
		  skillLevel: (typeof SKILL_LEVELS)[number];
		};

		const person: Person = { skillLevel: "Expert" };
		SKILL_LEVELS.forEach(skillLevel => {
		  console.log(skillLevel); // Outputs each skill level
		});
		``` 

		-   **`as const`**: Converts the `SKILL_LEVELS` array to a readonly array with literal types `"Beginner"`, `"Intermediate"`, and `"Expert"`.
		-   **Type Extraction**: The type `(typeof SKILL_LEVELS)[number]` extracts the union type `"Beginner" | "Intermediate" | "Expert"`.

3. **Readonly Objects with `as const`**
	```ts
	const person = {
	  name: "Sahil",
	  age: 24,
	  address: {
	    street: "Main st"
	  }
	} as const;

	person.age = "2"; // Error: Cannot assign to 'age' because it is a read-only property.
	``` 

	-   **`as const`**: Converts the `person` object to a readonly object, making all its properties and nested properties immutable.

4. **Advantages of `as const` over Enums**	
	-   **Type Safety**: Using `as const` provides exact literal types, reducing potential mismatches.
	-   **Immutability**: Ensures that the values cannot be modified, maintaining consistency throughout the code.
	-   **Readability and Flexibility**: Arrays and objects can be more readable and flexible compared to traditional enums, especially when dealing with complex sets of related constants.
	-   **No Overhead**: Unlike enums, which add additional generated code and runtime overhead, `as const` is a purely compile-time feature, resulting in no extra code in the output.

5.  **Summary**
	-   **`as const`**:  Converts arrays and objects to readonly types, making their elements and properties immutable.     
	-   **Replacing Enums with `as const`**: Provides a modern, type-safe, and flexible alternative to traditional enums.

Using `as const` ensures immutability and precise literal types, improving type safety and reducing runtime overhead compared to traditional enums.
### Tuples
A tuple in TypeScript is a typed array with a fixed number of elements where each element may have a different type. Tuples allow you to express an array with a fixed number of elements whose types are known, providing more precise type checking and better error reporting.
1. **Basic Example**
	- Here's a simple example of a tuple in TypeScript:
		```ts
		let tuple: [string, number, boolean] = ["hello", 42, true];

		// Accessing elements
		let str = tuple[0]; // "hello"
		let num = tuple[1]; // 42
		let bool = tuple[2]; // true

		// Trying to assign an incorrect type will result in an error
		tuple[0] = 10; // Error: Type 'number' is not assignable to type 'string'
		``` 
2.  **Summary**
	-  **Tuples**: Fixed-length arrays with specified types for each element.    
    `let tuple: [string, number, boolean] = ["hello", 42, true];`     
	-   **React Hooks**: Commonly use tuples for state management, e.g., `useState` and `useReducer`.    
	    ```js
	    const [count, setCount] = useState(0);
	    const [state, dispatch] = useReducer(reducer, initialState);
	    ```         
Tuples enhance type safety by ensuring that arrays have a fixed length and specific types, which is particularly useful in React hooks to manage state effectively.
### Generics
Generics provide a way to create reusable components in TypeScript that can work with any data type. They are especially useful for building flexible and type-safe functions, classes, and interfaces.

1. **Basic Example**
	- Generics allow functions to operate on any type while maintaining type safety.
		```ts
		function getSecond<ArrayType>(array: ArrayType[]): ArrayType {
		  return array[1];
		}

		const a = [1, 2, 3];
		const b = ["sdf", "sdf"];

		const retA = getSecond<number>(a); // Explicitly passing the generic type
		const retB = getSecond(b); // Automatically inferring the generic type
		``` 
	-   **Generic Function**: The function `getSecond` uses a generic type `ArrayType` to ensure that the type of the returned element matches the type of the array elements.
	-   **Explicit Type**: `retA` is explicitly typed as `number`.
	-   **Type Inference**: `retB` infers the type based on the array passed to the function.

2. **Use Cases of Built-in Generics in JavaScript**
	- TypeScript enhances built-in JavaScript types with generic capabilities.
	- **Set Use Case**
		```ts
		const val = new Set<number>();
		val.add("string"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.
		``` 
		-   **Set**: The generic type `number` ensures that only numbers can be added to the set.

	- **Map Use Case**
		```ts
		const maps = new Map([["sdf", 3]]); // Automatically infers <string, number>
		const mapsTyped = new Map<string, number>([["sdf", 3]]);
		mapsTyped.set("test", 3);
		``` 

		-   **Map**: Generics allow specifying the types for keys and values, ensuring type safety when setting or getting values.

3. **Example of Using Custom Types as Generics**
	- Custom types can be combined with generics to create flexible and reusable type-safe structures.
		```ts
		type APIResponse<T> = {
		  data: T;
		  isError: boolean;
		};

		type UserResponse = APIResponse<{ name: string; age: number }>;
		type BlogResponse = APIResponse<{ title: string }>;

		const user: UserResponse = {
		  data: {
		    name: "sdf",
		    age: 324,
		  },
		  isError: false,
		};

		const blog: BlogResponse = {
		  data: { title: "sdfer" },
		  isError: false,
		};
		``` 
	-   **Generic Type**: `APIResponse<T>` can accept any type `T`, making it versatile for different responses.
4. **Example of Default Values in Generics**
	- Default values can be provided for generics to make them optional.		
		```ts
		type APIResponse2<T = { status: number }> = {
		  data: T;
		  isError: boolean;
		};

		const resp: APIResponse2 = {
		  data: {
		    status: 200,
		  },
		  isError: false,
		};
		``` 
		-   **Default Value**: If no type is provided, `T` defaults to `{ status: number }`.

5. **Example of Extending Generic Types**
	- Generics can be constrained to specific types using `extends`.
		```ts
		type APIResponse3<T extends object = { status: number }> = {
		  data: T;
		  isError: boolean;
		};

		const resp3: APIResponse3 = {
		  data: {
		    status: 200,
		  },
		  isError: false,
		};
		``` 

		-   **Type Constraint**: `T` must extend `object`, ensuring that it is always an object.

6. **Example of Nested Generics**
	- Generics can be nested to handle more complex types.
		```ts
		type APIResponse4<T> = {
		  data: T;
		  isError: boolean;
		};

		const resp4: APIResponse4<Array<number>> = {
		  data: [1, 2, 3],
		  isError: false,
		};
		``` 

		-   **Nested Generics**: `APIResponse4<Array<number>>` demonstrates using a generic type within another generic type.

7. **Summary**
Generics provide a powerful way to create flexible, reusable, and type-safe components in TypeScript. They allow:

	-   **Type Safety**: Ensuring that functions, classes, and interfaces work with the correct types.
	-   **Flexibility**: Creating components that can operate on a variety of types without sacrificing type safety.
	-   **Reusability**: Building components that can be reused with different types, reducing code duplication and enhancing maintainability.

### Async functions
`async` functions in TypeScript provide a way to work with asynchronous operations using a syntax that is more readable and easier to understand compared to traditional promise-based code. An `async` function always returns a `Promise`.
1. **Basic Syntax**
	```ts
	async function fetchData(): Promise<string> {
	  return "Data fetched";
	}
	``` 
	-   **`async` Keyword**: Declares an asynchronous function.
	-   **Return Type**: An `async` function implicitly returns a `Promise`.

2. **`await` Keyword**
	- The `await` keyword is used inside `async` functions to pause execution until the awaited `Promise` resolves.
		```ts
		async function fetchData(): Promise<string> {
		  let data = await new Promise<string>((resolve) => {
		    setTimeout(() => resolve("Data fetched"), 1000);
		  });
		  return data;
		}
		``` 

	-   **`await`**: Pauses execution of `fetchData` until the `Promise` resolves, then resumes with the resolved value.


3. **Using `async` Functions with TypeScript**
	- **Type Inference**
		- TypeScript can infer the return type of `async` functions.
			```ts
			async function fetchData() {
			  return "Data fetched"; // Inferred return type is Promise<string>
			}
			``` 

	- **Explicit Return Type**
		- It's often a good practice to specify the return type for better type safety.
			```ts
			async function fetchData(): Promise<string> {
			  return "Data fetched";
			}
			``` 

4. **Summary**
	-   **`async` Keyword**: Declares an asynchronous function that returns a `Promise`.
	-   **`await` Keyword**: Pauses execution until the awaited `Promise` resolves.
	-   **Type Inference and Explicit Types**: TypeScript can infer return types, but explicitly specifying them enhances type safety.

`async` functions in TypeScript provide a powerful and expressive way to handle asynchronous operations, combining the readability of synchronous code with the non-blocking nature of promises.
