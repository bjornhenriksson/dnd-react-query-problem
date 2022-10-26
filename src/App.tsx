import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WithReactQuery from "./WithReactQuery";
import WithReactState from "./WithReactState";
import WithReactQueryAndRandomState from "./WithReactQueryAndRandomState";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>With React Query ❌:</h1>
      <WithReactQuery />
      <h1>With React useState ✅:</h1>
      <WithReactState />
      <h1>With React Query and random useState 🟡:</h1>
      <WithReactQueryAndRandomState />
    </QueryClientProvider>
  );
}

export default App;
