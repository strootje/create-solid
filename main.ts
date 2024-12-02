import { group, intro, outro, select, tasks, text } from "@clack/prompts";
import { copy } from "@std/fs";
import { dirname, fromFileUrl, join } from "@std/path";
import {
  command,
  multioption,
  optional,
  positional,
  run,
  string,
  type Type,
} from "cmd-ts";

const templates = ["app"] as const;
type Templates = (typeof templates)[number];
const templateParser: Type<string, Templates> = {
  from(value) {
    return Promise.resolve(value as Templates);
  },

  defaultValue() {
    return "app";
  },
};

const addons = ["pwa", "trpc"] as const;
type Addons = (typeof addons)[number];
const addonParser: Type<Array<string>, Array<Addons>> = {
  from(values) {
    return Promise.resolve(values as Array<Addons>);
  },

  defaultValue() {
    return [];
  },
};

run(
  command({
    name: "@strootje/create-solid",
    args: {
      name: positional({
        type: optional(string),
        displayName: "Project Name",
      }),

      template: positional({
        type: templateParser,
        displayName: "Base Template",
      }),
      addons: multioption({
        type: addonParser,
        long: "addon",
      }),
    },

    handler: async (args) => {
      intro("running @strootje/create-solid");

      const values = await group({
        name: () =>
          text({
            message: "Project name?",
            defaultValue: "solid-app",
            placeholder: "solid-app",
            initialValue: args.name,
          }),

        template: () =>
          select<Templates>({
            message: "Project base template?",
            initialValue: args.template,
            options: [
              { value: "app", label: "App" },
            ],
          }),
        // addons: () =>
        //   multiselect<Addons>({
        //     message: "Project addons?",
        //     initialValues: args.addons,
        //     required: false,
        //     options: [
        //       { value: "pwa", label: "PWA" },
        //       { value: "trpc", label: "TRPC" },
        //     ],
        //   }),
      });

      await tasks([
        {
          title:
            `Creating project ${values.name} with template ${values.template}`,
          task: () =>
            copy(
              join(
                dirname(fromFileUrl(import.meta.url)),
                "templates",
                values.template,
              ),
              join(dirname(fromFileUrl(import.meta.url)), values.name),
            ),
        },
        // ...values.addons.map((addon) => ({
        //   title: `Installing addon ${addon} to project`,
        //   task: () => setTimeout(1000),
        // })),
      ]);

      outro("please run deno i");
    },
  }),
  Deno.args.slice(2),
);
