import vikeReact from "vike-react/config";
import type { Config } from "vike/types";
import Layout from "../layouts/LayoutDefault.js";

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  // https://vike.dev/Layout
  Layout,
  prerender: true,
  clientRouting: true,

  // https://vike.dev/head-tags
  title: "Portfolio of Alicia Gilca",
  description: "Here you can find all about Alicia Gilca's work and experience.",

  extends: vikeReact,
} satisfies Config;
