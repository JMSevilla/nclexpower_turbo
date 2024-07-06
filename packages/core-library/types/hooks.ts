import { useCallback, useReducer } from "react";
import { DataTableColumn } from "./page";

type State = {
  pagination: {
    pageNumber: number;
    pageSize: number;
    totalItems?: number;
    totalPages?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
  };
  sortBy: string;
  ascending: boolean;
};

type Action =
  | { type: "goNext" }
  | { type: "goBack" }
  | { type: "updatePagination"; data: State["pagination"] }
  | { type: "sort"; column: string };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "goNext":
      if (state.pagination.hasNextPage && state.pagination.pageNumber) {
        return {
          ...state,
          pagination: {
            ...state.pagination,
            pageNumber: state.pagination.pageNumber + 1,
          },
        };
      }
      return state;
    case "goBack":
      if (state.pagination.hasPreviousPage && state.pagination.pageNumber) {
        return {
          ...state,
          pagination: {
            ...state.pagination,
            pageNumber: state.pagination.pageNumber - 1,
          },
        };
      }
      return state;
    case "updatePagination":
      return { ...state, pagination: action.data };
    case "sort":
      const sortBy = action.column;
      const ascending = state.sortBy === sortBy ? !state.ascending : true;
      const pagination = { ...state.pagination, pageNumber: 1 };
      return { ...state, ascending, sortBy, pagination };
    default:
      return state;
  }
};

export const usePaginatedSort = (
  columns: DataTableColumn[],
  pageSize: number = 5,
  defaultOrderingColumn?: string,
  defaultOrderingOrder?: string
) => {
  const [state, dispatch] = useReducer(reducer, {
    sortBy: defaultOrderingColumn || columns[0]?.dataField.value || "",
    ascending: defaultOrderingOrder === "DESC" ? false : true,
    pagination: { pageSize, pageNumber: 1 },
  });

  return {
    ...state,
    goNext: useCallback(() => dispatch({ type: "goNext" }), []),
    goBack: useCallback(() => dispatch({ type: "goBack" }), []),
    updatePagination: useCallback(
      (data: State["pagination"]) =>
        dispatch({ type: "updatePagination", data }),
      []
    ),
    sort: useCallback(
      (column: string) => dispatch({ type: "sort", column }),
      []
    ),
  };
};
