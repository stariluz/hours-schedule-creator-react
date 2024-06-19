Minification:
```
npx terser -c -m -o filename.min.js -- filename.js
```

Run JSX Prepocessor:
```
npx babel --watch src --out-dir ./dev --presets react-app/prod
```

# Learning:

### Convention for name components
(information from [React components naming convention ⚛️](ttps://medium.com/@wittydeveloper/react-components-naming-convention-%EF%B8%8F-b50303551505), [Charly Poly](https://medium.com/@wittydeveloper).)

    [Domain]|[Page/Context]|ComponentName|[Type]

- Domain: <i>Which product owns this component?</i>
- Page/context: The product page where is expected to be. If the component appears only inside another component, the context is the parent component's name.

    <i>What is the parent component?

    Which product subpart/page this component belongs ?</i>
- ComponentName: <i>What does this component do?</i>
- Type: 5 types identified of components.
    <i>
    
    - View: only render data (no API calls or internal actions).

    - Button: display an actionable.

    - Connect: legacy connect components.

    - Forms components: Input, Upload ...
    
    - HoC components: add component to the wrapped component and the HoC takes the original name.
    </i>

