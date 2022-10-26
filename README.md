# Showcase of state issues with drag and drop (`dnd-kit`) and `react-query`



https://user-images.githubusercontent.com/5759557/198101328-8c273ee3-1ee3-4c02-8895-42c0f19c7dd1.mov

We are using a simple `useQuery` and a direct mutation on the cache with `setQueryData` on re-order. As you can see in the video above the `react-query` version "jumps" when dropping, seemingly because the list re-renders(?) before the new set comes in. I'm still trying to figure out if this is a react-query related bug or if there's something internal within `dnd-kit` that requires a real state lifecycle change to "tap into" to do smooth dropping.

## To try it for yourself:

```
npm ci
npm start
```

