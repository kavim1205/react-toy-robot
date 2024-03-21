## Toy Robot

Stack:

- React (obvs)
- TypeScript
- Styled Components
- Jest
- React Testing Library
- Prettier
- immutability-helper

No state management for this one. I could have implemented Redux but the size of the project doesn't warrant inflicting that experience upon myself, so just local state.

## Available Scripts

In the project directory, you can run:

### `npm start`

1.

```
PLACE 0,0,NORTH
MOVE
REPORT
Output: 0,1,NORTH
```

2.

```
PLACE 0,0,NORTH
LEFT
REPORT
Output: 0,0,WEST

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.
```
