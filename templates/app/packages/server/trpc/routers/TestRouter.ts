import { procedure, router } from "../procedures.ts";

export const test = router({
  Testing: procedure.query(() => ({
    data: [
      {
        title: "test1",
      },
      {
        title: "test2",
      },
    ],
  })),
});
