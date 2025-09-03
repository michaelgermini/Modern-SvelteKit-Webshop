export const prerender = false;
export const ssr = true;

export const load = async () => {
  return {
    meta: {
      title: "SvelteKit Webshop - Modern Online Store",
      description: "Fast online store with SvelteKit, performant and accessible",
      image: "/og.png"
    }
  };
};
