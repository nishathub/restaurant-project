# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Update Menu Item : 
Default value on every field of form except image.
if we do not select a new image, the item will still be updated keeping original image
we can update from as less as one field of data to all data
both front and back are working together to decide which way to update data.
after updating action, redirect to manageItem page,
Errors are properly handled and necessary info are popped by a custom alert.
