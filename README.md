[![JetBrains incubator project](https://jb.gg/badges/incubator-plastic.svg)](https://confluence.jetbrains.com/display/ALL/JetBrains+on+GitHub)

# Instructions

## 1. Build plugin

run at `/` (the project's root)

```
mvn package
```

## 2. Add the plugin to TeamCity

Add the `target/dashboard.zip` to TeamCity as a plugin

## 3. Serve frontend

```
cd frontend
yarn install
yarn start
```


## 4. Voila


Go to `<TeamCity Server Address>/dashboardPlugin.html`
