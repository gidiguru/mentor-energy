// src/routes/dashboard/modules/[moduleId]/+layout.ts
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ params }) => {
  console.log('LAYOUT LOAD - Module ID:', params.moduleId);
  return {
    moduleId: params.moduleId
  };
};