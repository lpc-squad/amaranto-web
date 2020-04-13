import App from "./App.svelte";
import { formatDistanceToNow } from "date-fns";
const esLocale = require("date-fns/locale/es");

const app = new App({
  target: document.body,
  props: {
    release_date: formatDistanceToNow(new Date(2020, 3, 30), {
      locale: esLocale,
    }),
  },
});

export default app;
