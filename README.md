
# Built In Types

## Topics covered in this section of course
1. Pick and Omit
2. Partial and Required
3. ReturnType and Parameters
4. Record
5. Readonly
6. Awaited
## Learnings
### Pick and Omit
TypeScript provides utility types like `Omit` and `Pick` to manipulate object types by excluding or including specific properties from existing types.
1. **Omit Utility Type**
	- The `Omit` utility type creates a new type by excluding specific properties from an existing type.
		```ts
		type Todo = {
		  id: string;
		  name: string;
		  status: string;
		  completed: boolean;
		};
		type NewTodo = Omit<Todo, "id">;
		function saveTodo(todo: NewTodo): Todo {
		  return { ...todo, id: crypto.randomUUID() };
		}
		function renderTodo(todo: Todo) {
		  const div = document.createElement("div");
		  div.id = todo.id;
		}
		``` 
		-   **Omit Type**: `NewTodo` is a new type derived from `Todo` without the `id` property.
		-   **Function Example**: `saveTodo` accepts a `NewTodo` object (without `id`) and returns a complete `Todo` object by generating a new `id`.
2. **Pick Utility Type**
	- The `Pick` utility type creates a new type by selecting specific properties from an existing type.
		```ts
		type Person = {
		  id: string;
		  name: string;
		  age: number;
		  address: {
		    street: string;
		    city: string;
		    country: string;
		  };
		};
		type SimplePerson = Pick<Person, "name" | "age">;
		``` 
	-   **Pick Type**: `SimplePerson` is a new type derived from `Person` that only includes the `name` and `age` properties.

3. **Summary**
	-   **Omit**: Used to exclude specific properties from a type.
		`type NewTodo = Omit<Todo, "id">;` 
    -   **Pick**: Used to include only specific properties from a type.    
	    `type SimplePerson = Pick<Person, "name" | "age">;` 
    
Both `Omit` and `Pick` are powerful tools in TypeScript that enhance type safety and code readability by allowing you to create more precise and manageable types from existing ones.

### Partial and Required
TypeScript provides `Partial` and `Required` utility types to modify the properties of existing types, making all properties optional or required as needed.
1. **Partial Utility Type**
	- The `Partial` utility type makes all properties of a given type optional.
		```ts
		type Todo = {
		  title: string;
		  completed: boolean;
		  address?: {
		    street?: string;
		  };
		};
		type OptionalTodo = Partial<Todo>;
		type SpecificOptionalTodo = Partial<Pick<Todo, "title">> & Omit<Todo, "title">;
		const todo: SpecificOptionalTodo = {
		  completed: true,
		};
		``` 
	-   **Partial Type**: `OptionalTodo` is derived from `Todo`, with all properties optional.
	-   **Specific Optionality**: `SpecificOptionalTodo` makes only the `title` property optional while keeping other properties unchanged.
2. **Required Utility Type**
	- The `Required` utility type makes all properties of a given type required.
		```ts
		type Todo = {
		  title?: string;
		  completed: boolean;
		  address?: {
		    street?: string;
		  };
		};

		type RequiredTodo = Required<Todo>;

		type SpecificRequiredTodo = Required<Pick<Todo, "title">> & Todo;

		const todo: SpecificRequiredTodo = {
		  completed: true,
		};
		``` 
	-   **Required Type**: `RequiredTodo` makes all properties of `Todo` required, including `title`.
	-   **Specific Requirement**: `SpecificRequiredTodo` makes only the `title` property required while keeping other properties unchanged.

3. **Summary**
	-   **Partial**: Makes all properties of a type optional.
	    `type OptionalTodo = Partial<Todo>;` 
    
-   **Required**: Makes all properties of a type required.
    `type RequiredTodo = Required<Todo>;` 
    

These utility types help in scenarios where you need to modify the required status of properties, providing flexibility in type definitions and enhancing type safety.

### ReturnType and Parameters
TypeScript provides utility types like `ReturnType` and `Parameters` to extract information about function types. These are useful for working with functions and their types dynamically.
1. **ReturnType Utility Type**
	- The `ReturnType` utility type extracts the return type of a given function type.
		```ts
		function checkLength(a: string, b: number) {
		  return a.length < b;
		}

		type ReturnOfCheckLength = ReturnType<typeof checkLength>;
		``` 

	-   **`ReturnType`**: Extracts the return type of the `checkLength` function.
	-   **Result**: `ReturnOfCheckLength` will be `boolean`, as `checkLength` returns a boolean value.

2. **Parameters Utility Type**
	- The `Parameters` utility type extracts the types of the parameters of a given function type.
		```ts
		type Params = Parameters<typeof checkLength>;
		``` 

	-   **`Parameters`**: Extracts the types of the parameters of the `checkLength` function.
	-   **Result**: `Params` will be `[string, number]`, representing the types of the parameters.
3. **Accessing Specific Parameter Types**
	- You can also use `Parameters` to access specific parameter types by indexing into the resulting tuple type.
		```ts
		type SingleParam = Parameters<typeof checkLength>[0];
		``` 

	-   **`SingleParam`**: Represents the type of the first parameter of `checkLength`.
	-   **Result**: `SingleParam` will be `string`, as the first parameter of `checkLength` is of type `string`.

4. **Summary**
	-   **ReturnType**: Extracts the return type of a function.    
	    ```ts
	    type ReturnOfCheckLength = ReturnType<typeof checkLength>; // boolean
	    ``` 
	-   **Parameters**: Extracts the types of parameters from a function.   
	    ```ts
	    type Params = Parameters<typeof checkLength>; // [string, number]
	    type SingleParam = Parameters<typeof checkLength>[0]; // string
	    ``` 
These utility types make it easy to work with functions and their types, ensuring type safety and improving code maintainability by allowing dynamic extraction of function type information.

### Record
The `Record` utility type is used to create a type with specific properties and their associated values. It allows you to define an object type where the keys are of a specific type and the values are of another type.

1. **Syntax**
	```ts
	Record<Keys, Value>
	``` 
	-   **`Keys`**: The type of the keys in the resulting object type.
	-   **`Value`**: The type of the values in the resulting object type.

2. **Example with Code**
	```ts
	type Person = {
	  name: string;
	  age: number;
	};
	// Define a type where the keys are names of `Person` and values are arrays of `Person`
	type PeopleGroupedByName = Record<Person["name"], Person[]>;
	``` 
	-   **`Person["name"]`**: Extracts the type of the `name` property from `Person`, which is `string`. Thus, the keys of `PeopleGroupedByName` will be strings.
	-   **`Person[]`**: The values in `PeopleGroupedByName` will be arrays of `Person`.

3. **Result**
	- The `PeopleGroupedByName` type will represent an object where each key is a `name` of type `string`, and each value is an array of `Person`.
		```ts
		const peopleByName: PeopleGroupedByName = {
		  "Alice": [{ name: "Alice", age: 30 }],
		  "Bob": [{ name: "Bob", age: 25 }],
		};
		``` 

4.  **Comparison with Index Signature**
	- Instead of using an index signature:
	```ts
	type PeopleGroupedByName = {
	  [index: string]: Person[];
	};
	``` 
	- The `Record` type is more explicit and often preferred when you want to ensure that all keys are of a specific type and all values are of a specific type.

5. **Summary**
	-   **`Record<Keys, Value>`**: Creates a type with keys of type `Keys` and values of type `Value`.    
	    ```ts
	    type PeopleGroupedByName = Record<Person["name"], Person[]>;
	    ``` 
	  -   **Usage**: Ensures that the object’s keys and values follow specific types, improving type safety and code readability.
### Readonly
The `Readonly` utility type is used to make all properties of an object type immutable, meaning their values cannot be changed after the object is created. This is useful for ensuring that an object's properties remain constant throughout its lifetime.
1.  **Syntax**
	`Readonly<Type>` 
	-   **`Type`**: The object type whose properties you want to make read-only.
2. **Example with Code**
	```ts
	type Todo = {
	  name: string;
	  completed: boolean;
	};
	const todo = {
	  name: "sdf",
	  completed: false,
	} as const; // `as const` makes the object properties read-only as well
	type FinalTodo = Readonly<Todo>;
	``` 
	-   **`Readonly<Todo>`**: Creates a type `FinalTodo` where all properties of `Todo` are read-only.
	-   **`todo` Object**: Using `as const` in JavaScript makes the object properties read-only, similar to `Readonly`, but `as const` is a JavaScript feature, not TypeScript-specific.

3. **Key Points**
	-   **Immutable Properties**: In `FinalTodo`, the properties `name` and `completed` are read-only and cannot be modified after initialization.
    -   **Comparison with `as const`**:    
	    -   `as const` is used in JavaScript to make the object properties immutable and is often used directly in code.
	    -   `Readonly` is a TypeScript utility type that ensures immutability at the type level, which can be used in type definitions and function signatures.

4.  **Summary**
	-   **`Readonly<Type>`**: Makes all properties of the specified type immutable.
	-   **`as const`**: A JavaScript feature to make object properties immutable, similar in effect to `Readonly` but `as const` only works for Javascript objects.    

Using `Readonly` helps to enforce immutability in TypeScript types, enhancing code safety and reliability by preventing accidental modifications to object properties.

### Awaited
The `Awaited` utility type is used to infer the type that a `Promise` or `async` function will resolve to. It helps in situations where you need to work with the resolved value of a `Promise` without directly calling `await` in your code.

1. **When to Use `Awaited`**
	-   When we want to get the resolved type of a `Promise` without actually awaiting it.
	-   When we want to create types or utility functions that work with both synchronous and asynchronous code.

2. **Basic Example**
	- Let's consider an async function:
		```ts
		async function fetchData(): Promise<string> {
		  return "Data fetched";
		}
		``` 
	- Here, `fetchData` returns a `Promise` that resolves to a `string`. Using `Awaited`, we can extract the type `string` from the `Promise`.
		```ts
		type FetchDataResult = Awaited<ReturnType<typeof fetchData>>;
		// FetchDataResult is inferred as string
		``` 

	-   **`Awaited<ReturnType<typeof fetchData>>`**: Extracts the resolved type from the `Promise` returned by `fetchData`. In this case, `FetchDataResult` is `string`.

3. **Complex Example with Nested Promises**
	- `Awaited` can also handle nested promises, where a promise resolves to another promise.
		```ts
		type NestedPromise = Promise<Promise<string>>;

		type ResolvedType = Awaited<NestedPromise>;  // ResolvedType is inferred as string`
		``` 

	-   **`Awaited<NestedPromise>`**: Unwraps the nested `Promise` to get the final resolved type, which is `string`.
4.  **Key Points**
	-   **`Awaited<Type>`**: Unwraps a `Promise` or any other thenable type to get the underlying resolved value.
	-   **Handles Nested Promises**: If a promise resolves to another promise, `Awaited` unwraps it until it reaches the final resolved type.
5. **Summary**
	-   **Purpose**: `Awaited` is used to infer the type that a `Promise` will resolve to.
    `type FetchDataResult = Awaited<ReturnType<typeof fetchData>>; // string`     
	-   **Use Cases**: Useful in type definitions where you need to know the result of an async operation, especially in utility types and generics.
	-   **Handling Nested Promises**: `Awaited` can unwrap nested promises, ensuring you get the final resolved value.
