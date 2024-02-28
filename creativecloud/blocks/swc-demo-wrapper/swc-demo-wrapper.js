import { getLibs } from '../../scripts/utils.js';

export default async function init(el) {
  const miloLibs = getLibs();
  const deps = Promise.all([
    import(`${miloLibs}/deps/lit-all.min.js`),
    import(`${miloLibs}/features/spectrum-web-components/dist/theme.js`),
    import(`${miloLibs}/features/spectrum-web-components/dist/button.js`),
  ]);
  const { createTag } = await import(`${miloLibs}/utils/utils.js`);
  const { default: swcDemoInit } = await import(`${miloLibs}/blocks/swc-demo/swc-demo.js`);

  const app = createTag('sp-theme', { color: 'light', scale: 'medium' });
  const addBtn = createTag('sp-button', { variant: 'primary' }, 'Add task manager', { parent: app });

  el.replaceWith(app);
  addBtn.addEventListener('click', async () => {
    const swcDemo = await swcDemoInit(createTag('div'));
    app.appendChild(swcDemo);
  });
  await deps;
  return app;
}
