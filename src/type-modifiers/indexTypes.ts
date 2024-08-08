type Person = {
  name: string
  skillLevel: "Beginner" | "Intermediate" | "Expert" | "Master"
}

const person: Person = { name: "Kyle", skillLevel: "Expert" }
printSkillLevel(person.skillLevel)

function printSkillLevel(skillLevel: Person["skillLevel"]) {
  console.log(skillLevel)
}

type PeopleGroupedBySkill = {
  [index in Person["skillLevel"]]: Person[]
}

const a: PeopleGroupedBySkill = {
  "Beginner": [{ name: "Sahil", skillLevel: "Intermediate" }],
}
