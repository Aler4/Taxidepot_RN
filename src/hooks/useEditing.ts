import {useCallback} from 'react';

export const useEditing = (
  state: boolean,
  setState: (state: boolean) => void,
) => {
  return {
    startEdit: useCallback(() => setState(true), [setState]),
    endEdit: useCallback(() => setState(false), [setState]),
  };
};
