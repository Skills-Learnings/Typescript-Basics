
# Type Modifiers

## Topics covered in this section of course
1. Unions
2. Intersections
3. readonly
4. keyof
5. typeof
6. Index Types
## Learnings
### Unions
A union type allows a variable to hold one of several types. It’s useful when a value can be of multiple types.
1. **Basic Example**
	```ts
	let value: string | number;
	value = "Hello"; // valid
	value = 42; // valid
	// value = true; // Error: Type 'boolean' is not assignable to type 'string | number'
	``` 
	- **In this example:** **`string | number`**: `value` can be either a string or a number.

2. **Specifying Exact Values Using Unions**

	- We can use union types to specify exact values (literal types) that a variable can hold.
	- **Example**:
		```ts
		type Direction = "north" | "south" | "east" | "west";

		let direction: Direction;
		direction = "north"; // valid
		// direction = "up"; // Error: Type '"up"' is not assignable to type 'Direction'
		``` 
	- **In this example**: **`Direction`**: A custom type that can only be one of the specified string literals.

3. **Creating New Types Using Union Types**
	- We can create new types by combining other custom types using union types.

	- **Example with Custom Types**
		```ts
		type Cat = { name: string; meow: () => void };
		type Dog = { name: string; bark: () => void };

		type Pet = Cat | Dog;

		let pet: Pet;

		pet = { name: "Whiskers", meow: () => console.log("Meow") }; // valid
		pet = { name: "Rover", bark: () => console.log("Bark") }; // valid
		// pet = { name: "Lassie" }; // Error: Type '{ name: string; }' is not assignable to type 'Pet'
		``` 

	- In this example:
		-   **`Cat` and `Dog`**: Custom types.
		-   **`Pet`**: A new type that can be either a `Cat` or a `Dog`.

3. **Using Interfaces with Union Types**
	- We can use union types with interfaces, but cannot create a new interface by directly combining other interfaces using unions. Instead, we must use the `type` keyword for this purpose.
	- **Example**
		```ts
		interface Bird {
		  name: string;
		  fly: () => void;
		}

		interface Fish {
		  name: string;
		  swim: () => void;
		}

		type Animal = Bird | Fish;

		let animal: Animal;

		animal = { name: "Eagle", fly: () => console.log("Flying") }; // valid
		animal = { name: "Goldfish", swim: () => console.log("Swimming") }; // valid
		``` 

	- In this example:
		-   **`Bird` and `Fish`**: Interfaces.
		-   **`Animal`**: A new type created by the union of `Bird` and `Fish`.

5.  **Key Points**
	-   **Union Types**: Allow a variable to hold one of several types.
	-   **Literal Types with Unions**: Specify exact values a variable can hold.
	-   **Creating New Types with Unions**: Combine custom types into a new type.
	-   **Union with Interfaces**: Use `type` to combine interfaces into a new type since interfaces themselves cannot be directly combined using unions.

This provides a basic understanding of union types in TypeScript, how to use them for specifying exact values, and how to create new types by combining existing types.

### Intersections
Intersection types in TypeScript are used to combine multiple types into one. This means that a type can have all the properties of the intersected types.

1. **Usage of Intersection with Types**
	- When we use intersection with types, you combine multiple type definitions to create a new type that has all the properties of the intersected types.
	- **Example with Types**
		```ts
		type Person = {
		  name: string;
		  age: number;
		};

		type PersonWithId = Person & {
		  id: string;
		};

		const person: PersonWithId = { id: "random", name: "Sahil", age: 28 };
		``` 
	- **In this example:**
		-   **`Person`**: A type with `name` and `age` properties.
		-   **`PersonWithId`**: A new type that combines `Person` with an `id` property using the intersection operator `&`.

2. **Usage of Intersection with Interfaces**
	- We can also use intersections with interfaces. However, for interfaces, you typically use the `extends` keyword to achieve the same result.
	- **Example with Interfaces**
		```ts
		interface User {
		  name: string;
		  age: number;
		}

		interface Todo {
		  complete: boolean;
		}

		interface UserWithId extends User, Todo {
		  id: string;
		}

		const user: UserWithId = { id: "random", name: "Sahil", age: 28, complete: true };
		``` 
	- **In this example:**
		-   **`User`**: An interface with `name` and `age` properties.
		-   **`Todo`**: An interface with a `complete` property.
		-   **`UserWithId`**: An interface that extends both `User` and `Todo`, adding an `id` property.

3. **Key Points**
	-   **Intersection Types**: Allow combining multiple types into one type that has all the properties of the intersected types.
	    -   **Syntax**: Use the `&` operator to create an intersection type.
	    -   **Example**: `type PersonWithId = Person & { id: string };`
	-   **Intersection with Interfaces**: Typically use the `extends` keyword to combine multiple interfaces.
	    -   **Syntax**: Use the `extends` keyword to create an interface that includes properties from other interfaces.
	    -   **Example**: `interface UserWithId extends User, Todo { id: string; }`

4.  **Limitations**
	-   **Primitive Types**: Intersection types do not work well with primitive types when there are overlapping properties with different types.
	    -   **Example**: You cannot create a valid intersection of `{ a: string } & { a: number }` because the property `a` cannot be both `string` and `number`.

5.  **Summary**
	- Intersection types are a powerful feature in TypeScript that allows to create complex types by combining multiple types. 
	- This is particularly useful when we want to ensure that an object conforms to multiple type definitions. 
	- For interfaces, the `extends` keyword provides a similar mechanism to achieve this combination. 
	- However, intersections are not suitable for primitive types with overlapping properties that have different types.

### readonly
The `readonly` modifier in TypeScript is used to make properties of an object or elements of an array immutable, meaning they cannot be reassigned after being initialized. This helps prevent accidental changes and ensures certain parts of your data remain constant.
1.  **Using `readonly` with Object Properties**
	- When we declare an object property as `readonly`, we ensure that the property cannot be modified after the object is created.
	-  **Example**
		```ts
		interface Person {
		  readonly name: string;
		  readonly age: number;
		}

		const person: Person = { name: "Sahil", age: 28 };

		// person.name = "John"; // Error: Cannot assign to 'name' because it is a read-only property.
		``` 
	- **In this example:**
		-   **`readonly name: string` and `readonly age: number`**: The `name` and `age` properties of the `Person` interface are marked as `readonly`.
		-   **`person.name = "John"`**: Attempting to change the `name` property results in a compile-time error.
2.  **Using `readonly` with Arrays**
	- We can also use the `readonly` modifier with arrays to prevent changes to the array structure.
	- **Example**
		```ts
		const numbers: readonly number[] = [1, 2, 3];

		// numbers.push(4); // Error: Property 'push' does not exist on type 'readonly number[]'.
		``` 
	- **In this example:**
		-   **`readonly number[]`**: The `numbers` array is marked as `readonly`, meaning you cannot modify its structure (e.g., push, pop, shift, unshift).
3. **Benefits for Developers**
	-   **Prevents Accidental Changes**: Ensures that certain properties or array elements cannot be modified after being set, reducing bugs caused by unintended modifications.
	-   **Improves Code Readability**: Clearly communicates the intent that certain values should remain constant, making the code easier to understand.
	-   **Enhanced Code Editor Experience**: In code editors like Visual Studio Code, TypeScript provides real-time feedback and highlights errors if you try to modify `readonly` properties, improving development speed and accuracy.
4.  **Summary**
	-   **`readonly` Modifier**: Ensures properties of an object or elements of an array remain immutable after initialization.
	-   **Immutable Object Properties**: Prevent modification of properties after object creation.    
	-   **Immutable Arrays**: Prevent modification of array structure.
	-   **Developer Benefits**: Reduces bugs, improves code readability, and enhances development experience by providing real-time feedback in code editors.

Using `readonly` in TypeScript helps maintain the integrity of your data and ensures a more predictable and maintainable codebase.

### keyof
The `keyof` modifier in TypeScript is used to create a union type of the keys of a given object type. This is useful when we want to restrict the allowed property names to the keys of a specific object type.

1. **Basic Example**
	- Let's consider the following example:
		```ts
		type Person = {
		  name: string;
		  age: number;
		  isProgrammer?: boolean;
		};

		function getValue(key: keyof Person, person: Person) {
		  return person[key];
		}

		const age = getValue("age", { name: "Sahil", age: 24 });
		``` 

2. **Explanation**
	1.  **`keyof Person`**:
	    -   **`keyof Person`**: This creates a union type of the keys of the `Person` type, which in this case is `"name" | "age" | "isProgrammer"`.
	    -   **`keyof`**: This keyword extracts the keys of the type `Person`.
	2.  **`getValue` Function**:
	    -   **Parameters**:
	        -   **`key: keyof Person`**: The `key` parameter is restricted to be one of the keys of the `Person` type.
	        -   **`person: Person`**: The `person` parameter is of type `Person`.
	    -   **Function Body**:
	        -   **`return person[key]`**: The function returns the value of the specified key from the `person` object.
	3.  **Function Call**:    
	    -   **`getValue("age", { name: "Sahil", age: 24 })`**: This call retrieves the value of the `age` property from the provided `person` object.
	    -   **Result**: The value of `age` is `24`.

3. **Summary**
	-   **`keyof` Modifier**: Creates a union type of the keys of an object type.
	    `type Keys = keyof Person; // "name" | "age" | "isProgrammer"` 
	-   **Restricting Function Parameters**: Use `keyof` to ensure function parameters are valid keys of a given object type.    
	    `function getValue(key: keyof Person, person: Person) {
	      return person[key];
	    }` 
    

The `keyof` modifier helps improve type safety by ensuring that you can only use valid property names, reducing the risk of runtime errors due to invalid property access.

### typeof
The `typeof` operator in TypeScript is used to obtain the type of a variable or expression. This can be particularly useful for creating types based on the structure of existing variables or functions.
1. **Using `typeof` with Objects and Arrays**
	- We can use `typeof` to capture the type of an object and then apply it elsewhere in our code.
	- **Example**
		```ts
		const person = { name: "Sahil", age: 24, isProgrammer: true };
		const people: (typeof person)[] = [];

		people.push(person);
		people.push({ name: "Sahil", age: 25, isProgrammer: false });
		people.push(2); // Error: Argument of type 'number' is not assignable to parameter of type 'typeof person'.
		``` 
	- In this example:
		-   **`typeof person`**: This captures the type of the `person` object, which is `{ name: string; age: number; isProgrammer: boolean }`.
		-   **`const people: (typeof person)[] = [];`**: This defines `people` as an array of objects that have the same structure as `person`.
		-   **`people.push(person);`**: This correctly adds the `person` object to the `people` array.
		-   **`people.push({ name: "Sahil", age: 25, isProgrammer: false });`**: This also correctly adds a new object with the same structure.
		-   **`people.push(2);`**: This throws an error because a `number` does not match the type of `person`.
2.  **Using `typeof` with Functions**
	- We can use `typeof` to capture the type of a function.
	- **Example**
		```ts
		function sayHi(name: string) {
		  console.log(name);
		}

		type FuncType = typeof sayHi;
		``` 
	- In this example:
		-   **`typeof sayHi`**: This captures the type of the `sayHi` function, which is `(name: string) => void`.
		-   **`type FuncType = typeof sayHi;`**: This defines `FuncType` as the type of the `sayHi` function.
3.  **Summary**
	-   **`typeof` Operator**: Used to obtain the type of a variable, object, or function.
	    ```ts
	    const person = { name: "Sahil", age: 24, isProgrammer: true };
	    type PersonType = typeof person; // { name: string; age: number; isProgrammer: boolean }
	    ```     
	-   **Using `typeof` with Arrays**: Define arrays of objects with the same structure.   
	    ```ts
	    const people: (typeof person)[] = [];
	    people.push(person); // Valid
	    people.push({ name: "Sahil", age: 25, isProgrammer: false }); // Valid
	    people.push(2); // Error
	    ```     
	-   **Using `typeof` with Functions**: Capture the type of a function for reuse.    
	    ```ts
	    function sayHi(name: string) {
	      console.log(name);
	    }
	    type FuncType = typeof sayHi; // (name: string) => void
	    ```     

The `typeof` operator in TypeScript helps ensure type safety and consistency by allowing you to derive types from existing variables and functions. This can simplify the management of complex types and improve the robustness of your code.

### Index Types
Index types in TypeScript allows to dynamically reference the types of properties within an object. This is useful for creating types that depend on the properties of another type.

1.  **Basic Example**
	- Let's consider the following example:
		```ts
		type Person = {
		  name: string;
		  skillLevel: "Beginner" | "Intermediate" | "Expert" | "Master";
		};

		const person: Person = { name: "Kyle", skillLevel: "Expert" };
		printSkillLevel(person.skillLevel);

		function printSkillLevel(skillLevel: Person["skillLevel"]) {
		  console.log(skillLevel);
		}

		type PeopleGroupedBySkill = {
		  [index in Person["skillLevel"]]: Person[];
		};

		const a: PeopleGroupedBySkill = {
		  Beginner: [{ name: "Sahil", skillLevel: "Intermediate" }],
		};
		``` 

2. **Explanation**

	- **Type Definition: `Person`**  
	    ```ts
	    type Person = {
	      name: string;
	      skillLevel: "Beginner" | "Intermediate" | "Expert" | "Master";
	    };
	    ```     
	    -   **`name`**: A `string` representing the person's name.
	    -   **`skillLevel`**: A union type of specific string literals representing skill levels.
	- **Using Index Types with Object Properties**
	    ```ts
	    function printSkillLevel(skillLevel: Person["skillLevel"]) {
	      console.log(skillLevel);
	    }
	    ``` 
    
	    -   **`Person["skillLevel"]`**: This syntax dynamically references the type of the `skillLevel` property from the `Person` type, which is `"Beginner" | "Intermediate" | "Expert" | "Master"`.
	    -   **Function Call**: `printSkillLevel(person.skillLevel);` prints the skill level of the person.
	- **Creating Indexed Types**
	    ```ts
	    type PeopleGroupedBySkill = {
	      [index in Person["skillLevel"]]: Person[];
	    };
	    ``` 
    
	    -   **`[index in Person["skillLevel"]]`**: This creates an index signature where `index` can be any of the values in the `skillLevel` union type.
	    -   **`Person[]`**: The value associated with each key is an array of `Person` objects.
	    -   **Example**: `const a: PeopleGroupedBySkill = { Beginner: [{ name: "Sahil", skillLevel: "Intermediate" }] };` initializes the `PeopleGroupedBySkill` object with a list of people grouped by skill level.

3. **Key Points**
	-   **Index Types**: Allow dynamic referencing of property types within an object type.	    
	    ```ts
	    type SkillLevelType = Person["skillLevel"]; // "Beginner" | "Intermediate" | "Expert" | "Master"
	    ``` 
    
	-   **Indexed Signatures**: Create types with keys based on the properties of another type.
    
	    ```ts
	    type PeopleGroupedBySkill = {
	      [index in Person["skillLevel"]]: Person[];
	    };
	    ``` 
    

4.  **Summary**
	- Index types in TypeScript provide a powerful way to dynamically reference and use property types within other types. 
	- They enhance flexibility and type safety by allowing you to create types that depend on the properties of existing types. 
	- This feature is particularly useful for creating complex type structures that maintain consistency and ensure accurate type-checking throughout your code.
