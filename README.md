# Showcase of state issues with drag and drop (`dnd-kit`) and `react-query`



https://user-images.githubusercontent.com/5759557/198101328-8c273ee3-1ee3-4c02-8895-42c0f19c7dd1.mov

We are using a simple `useQuery` and a direct mutation on the cache with `setQueryData` on re-order. As you can see in the video above the `react-query` version "jumps" when dropping, seemingly because the list re-renders(?) before the new set comes in. I'm still trying to figure out if this is a react-query related bug or if there's something internal within `dnd-kit` that requires a real state lifecycle change to "tap into" to do smooth dropping.

## To try it for yourself:

```
npm ci
npm start
```

## Update
I've made a strange hybrid solution work by setting a random state using `useState` on `dragEnd` together with the cache update. I don't recommend this solution to anyone but it gives insight into the fact that maybe `dnd-kit` relies on react state to flush it's drop animations etcs?
```
const { data: items } = useQuery(["items-2"], getItems, { initialData: [] });
const [randomState, setRandomState] = useState(0); // used to tap into state flows.
// ...
function handleDragEnd(event: DragEndEvent) {
  const { active, over } = event;

  if (active.id !== over?.id) {
    const oldIndex = items.indexOf(Number(active.id));
    const newIndex = items.indexOf(Number(over?.id));
    queryClient.setQueryData(
      ["items-2"],
      arrayMove(items, oldIndex, newIndex)
    );
    setRandomState(Math.random()); // setting a random number in the state.
  }
}
```

https://user-images.githubusercontent.com/5759557/198108025-73c9772c-1820-4814-a115-fb9c745c3511.mov

