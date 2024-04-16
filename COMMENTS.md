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

- Deployment
- List criteria that you've met
- Improve comments - what were your challenges not steps
- Not focus so much on design - focus on frontend functionalities
- What's the minimum we need right now ?
- obtainLatest function redundant - nice with typescript
- getting from local storage in useEffect to limit renders on any state change
- have e.preventDefault() closer to the form
- addIdea function refactor in smaller funcs - as clear as possible
- find instead of findIndex
- set local storage in use Effect
- reducer in a situation when having a lot of setStates
- Keep things as close as they are
- toSorted is not modfying and original aray
- move sorting function to keep the render clean
- pull things our of react is useful for testing
- cards have nothing to do with sorting
