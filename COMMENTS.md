Here I'll specify chronogically my workflow, what difficulties I faced and what I think should be next steps in this project.

## Workflow

- My first step was to figure out what is my desired data format (array of objects with certain properties).
- Once dummy data generated, I created Cards.tsx component together with Card.tsx to render my ideas
- After creating desired tiles, I created tile to input a new idea and came up with idea of creating a modal for it. I utilized react-modal package for this functionality
- In this phase I wrapped my application in data context as I wanted to have all state for ideas, controlling modals and for CRUD functionalities in one place and avoid passing too many props between components
- Created sorting swith by utilizing materialUI Switch button
- Created deleting modal and utilized deleting functionality
- After finishing it was time to do updating - My idea was to use the same modal for updating as I used for creating idea - I created isEdit state and local being edited variable to distinguish both functionalities within one component.
- Utilized react-toastify for notifications
- Metadata, icons, cleanup, changing script and vite config to start project on port 3000

NEXT STEPS FOR THIS PROJECT

I'm aware of the lack of use of typescript and testing in my solution. I'm curious about what it would look like in a project like this - I think it's a perfect example to practice both skills.

// Dan's review comments:

- Deployment - https://my-idea-board-challenge.netlify.app/
- List criteria that you've met
- obtainLatest function redundant - would be nice to fix with typescript
- getting from local storage in useEffect instead on state initialization
- move e.preventDefault() closer to the form
- refactor addIdea function into smaller, more clear funcs
- Keep things as close as they are declared
- sort --> toSorted
- move sorting function from render

// Dan's review2 corrections:

- you pass idx to Card then never use it
  yeh this makes me think deleting should be called deletingId
- https://github.com/Kornass/Idea-Board-Challenge/blob/main/src/components/DeleteModal/DeleteModal.tsx#L18 you can self close divs <div />
- https://github.com/Kornass/Idea-Board-Challenge/blob/main/src/components/InputCard/InputCard.tsx Why is this called InputCard when its neither an input nor a card? It looks like a single button
- https://github.com/Kornass/Idea-Board-Challenge/blob/main/src/components/NewIdeaModal/NewIdeaModal.tsx#L42 you dont need the retrun true else return false
  you can just return the if statement

// Questions to Dan:
