// As const example
const nums = ["1", "2", "3"] as const

const a = nums[0] // Value of "a" would be 1 because "as const" has converted the array to readonly array
nums[0] = 1 // Can't update the value of array because array is not readonly
nums.push(1) // Can't push a value to  array because array is not readonly

// enums example
const SKILL_LEVELS = ["Beginner", "Intermediate", "Expert"] as const

type Person = {
  skillLevel: (typeof SKILL_LEVELS)[number]
}

SKILL_LEVELS.forEach(skillLevel => {
  console.log(skillLevel)
});