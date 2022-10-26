import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const getItems = async () => [1, 2, 3];

const WithReactQueryAndRandomState = () => {
  const queryClient = useQueryClient();
  const { data: items } = useQuery(["items-2"], getItems, { initialData: [] });
  const [randomState, setRandomState] = useState(0); // used to tap into state flows.
  console.log({ randomState });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <ul>
          {items.map((id) => (
            <SortableItem key={id} id={id} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );

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
};

export default WithReactQueryAndRandomState;
