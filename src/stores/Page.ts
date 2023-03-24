import { NavItem } from '@/types/src/NavItem';
import { types, getEnv } from 'mobx-state-tree';
export const PageStore = types
  .model<NavItem>('Page')
  .views(self => ({}))
  .actions(self => {
    function updateSchema(schema: any) {
      self.schema = schema;
    }

    return {
      updateSchema
    };
  });

export type IPageStore = typeof PageStore.Type;
