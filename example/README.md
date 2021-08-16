# Example & Test app

## Usage

**Open a terminal in the root folder and build the library code**

```bash
# Install dependencies
yarn

# Build the js code
yarn build
```

**Open the example app in another terminal**

```bash
# Install dependencies
cd example
yarn

# Start packager
yarn start

# Run for ios
cd ios && npx pod install && cd ..
yarn ios

# Run for android
yarn android
```
